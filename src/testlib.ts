'use-strict';
import * as Ajv from 'ajv';
import * as path from 'path';
import * as fs from 'fs';

const ajv = new Ajv({
  allErrors: true,
});

enum SchemaType {
  INTENTS = 'intents',
  TRAITS = 'traits',
}

enum PayloadType {
  REQUEST = 'request',
  RESPONSE = 'response',
  ATTRIBUTES = 'attributes',
  STATES = 'states',
  PARAMS = 'params',
  RESULTS = 'results',
}

/**
 * Retrieve the JSON schema for the given intent.
 * @param intentName FQN of the intent
 * @param payloadType One of 'request' or 'response'
 */
function getIntentSchema(intentName: string, payloadType: PayloadType): object | undefined {
  try {
    const shortIntent = intentName.split('.').pop()?.toLowerCase() || 'unknown';
    const filename = `${shortIntent}.${payloadType}.schema.json`;
    return requireSchema(SchemaType.INTENTS, shortIntent, filename);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Retrieve the JSON schema for the given device trait.
 * @param traitName FQN of the device trait
 * @param payloadType One of 'attributes' or 'states'
 */
function getTraitSchema(traitName: string, payloadType: PayloadType): object | undefined {
  try {
    const shortTrait = traitName.split('.').pop()?.toLowerCase() || 'unknown';
    const filename = `${shortTrait}.${payloadType}.schema.json`;
    return requireSchema(SchemaType.TRAITS, shortTrait, filename);
  } catch (error) {
    console.error(traitName, error);
    return undefined;
  }
}

/**
 * Retrieve JSON schema for the given device command
 * @param commandName FQN of the device command
 * @param payloadType One of 'params' or 'results'
 */
function getCommandSchema(commandName: string, payloadType: PayloadType): object| undefined {
  try {
    const shortTrait = findEnclosingTrait(commandName, payloadType) || 'unknown';
    const shortCommand = commandName.split('.').pop()?.toLowerCase() || 'unknown';
    const filename = `${shortCommand}.${payloadType}.schema.json`;
    return requireSchema(SchemaType.TRAITS, shortTrait, filename);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Helper function to load the target schema file from schema set
 * @param schemaType Schema directory path ('intents' or 'traits')
 * @param targetName Intent or trait name enclosing the schema
 * @param filename Schema file to load
 */
function requireSchema(schemaType: SchemaType, targetName: string, filename: string) {
  try {
    const basePath = path.join(__dirname, '../schema', schemaType);
    return require(path.join(basePath, targetName, filename));
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Helper function to search for matching trait directory
 * @param commandName FQN of the device command
 * @param schemaType One of 'params' or 'results'
 */
function findEnclosingTrait(commandName: string, schemaType: string) {
  try {
    const shortCommand = commandName.split('.').pop()?.toLowerCase() || 'unknown';
    const filename = `${shortCommand}.${schemaType}.schema.json`;
    const basePath = path.join(__dirname, '../schema/traits');
    return fs.readdirSync(basePath).find((entry) =>
      fs.existsSync(path.join(basePath, entry, filename))
    );
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Helper function that uses AJV library to validate the response against the schema
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false.
 */
function responseValidation(apiResponse: object, schema: object) {
  const isValid = ajv.validate(schema, apiResponse);
  if (isValid) {
    return undefined;
  } else {
    return ajv.errors;
  }
}

/**
 * Identifies the response type and validates the function based on the schemas.
 * @param req Request from one of the generate request functions.
 * @param apiResponse User defined api response.
 * @param syncData? Optional parameter to help identify what schemas to use for trait validation
 * @return Errors from AJV validation, if any. Undefined otherwise.
 */
export function validate(intentRequest: object, apiResponse: object, syncData?: object) {
  const responseType = intentRequest['inputs'][0]['intent'];

  const responseSchema = getIntentSchema(responseType, PayloadType.RESPONSE);
  if (responseType === 'action.devices.SYNC' && responseSchema) {
    const validateSyncAPI = responseValidation(apiResponse, responseSchema);
    const syncErrors : object[] = [];

    if (validateSyncAPI) {
      syncErrors.push(...validateSyncAPI);
      return syncErrors;
    }

    const syncDevices = apiResponse['payload']['devices'];
    const syncDevicesLength = syncDevices.length;
    for (let i = 0; i < syncDevicesLength; i++) {
      const traits = syncDevices[i]['traits'];
      const attributes = syncDevices[i]['attributes'] || {};
      for (let j = 0; j < traits.length; j++) {
        const trait = traits[j];
        const schema = getTraitSchema(trait, PayloadType.ATTRIBUTES);
        if (schema) {
          const validateTraitRes = responseValidation(attributes, schema);
          if (validateTraitRes) {
            syncErrors.push(...validateTraitRes);
          }
        }
      }
    }
    return syncErrors.length ? syncErrors : undefined;
  } else if (responseType === 'action.devices.QUERY' && responseSchema) {
    // validate with states schema;
    const queryErrors : object[] = [];
    const devices = intentRequest['inputs'][0]['payload']['devices'];
    const devicesLength = devices.length;

    const validateQueryAPI = responseValidation(apiResponse, responseSchema);
    if (validateQueryAPI) {
      queryErrors.push(...validateQueryAPI);
      return queryErrors;
    }

    for (let i = 0; i < devicesLength; i++) {
      const deviceIds = devices[i]['id'];
      const states = apiResponse['payload']['devices'][deviceIds];
      if (syncData) {
        const syncDevices = syncData['payload']['devices'];
        const device = syncDevices.find((entry) => entry['id'] === deviceIds);
        const traits = device['traits'];
          for (let j = 0; j < traits.length; j++) {
            const trait = traits[j];
            const schema = getTraitSchema(trait, PayloadType.STATES);
            if (schema) {
              const validateQueryTraitStates = responseValidation(states, schema);
              if (validateQueryTraitStates) {
                queryErrors.push(...validateQueryTraitStates);
              }
            }
          }
      }
    }
    return queryErrors.length ? queryErrors : undefined;
  } else if (responseType === 'action.devices.EXECUTE' && responseSchema) {
    // validate with states schema
    const executeErrors : object[] = [];
    // gets the execution array from the intent request
    const command = intentRequest['inputs'][0]['payload']['commands'][0];
    const execution = command['execution'];
    const executionLength = execution.length;

    const validateExecuteAPI = responseValidation(apiResponse, responseSchema);

    if (validateExecuteAPI) {
      executeErrors.push(...validateExecuteAPI);
      return executeErrors;
    }

    // identifies the part of the api response to validate against a schema
    const commands = apiResponse['payload']['commands'];
    const commandsLength = commands.length;
    for (let i = 0; i < executionLength; i++) {
      // gets the specific command
      const commandName = execution[i]['command'];
      const traitName = findEnclosingTrait(commandName, 'params') || 'unknown';
      const schema = getTraitSchema(traitName, PayloadType.STATES);
      if (schema) {
        for (let j = 0; j < commandsLength; j++) {
          const states = commands[j]['states'] || {};
          const validateExecTraitStates = responseValidation(states, schema);
          if (validateExecTraitStates) {
            executeErrors.push(...validateExecTraitStates);
          }
        }
      }
    }
    return executeErrors.length ? executeErrors : undefined;
  } else if (responseType === 'action.devices.DISCONNECT' && responseSchema) {
    return responseValidation(apiResponse, responseSchema);
  } throw new Error('Response type not valid');
}
