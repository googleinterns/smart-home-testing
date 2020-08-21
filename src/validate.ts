'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});

const SYNC_RESPONSE_SCHEMA = require('../intents/sync.response.schema.json');
const QUERY_RESPONSE_SCHEMA = require('../intents/query.response.schema.json');
const EXECUTE_RESPONSE_SCHEMA = require('../intents/execute.response.schema.json');
const DISCONNECT_RESPONSE_SCHEMA = require('../intents/disconnect.response.schema.json');
const ON_OFF_STATES_SCHEMA = require('../traits/onoff.states.schema.json');
const ON_OFF_ATTRIBUTES_SCHEMA = require('../traits/onoff.attributes.schema.json');

const COMMAND_STATES_EXPECT = {
  'action.devices.commands.OnOff': ON_OFF_STATES_SCHEMA,
};

const TRAIT_ATTRIBUTES_EXPECT = {
  'action.devices.traits.OnOff': ON_OFF_ATTRIBUTES_SCHEMA,
};
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
 * @return Errors from AJV validation, if any. Undefined otherwise.
 */
export function validate(intentRequest: object, apiResponse: object) {
  const responseType = intentRequest['inputs'][0]['intent'];
  if (responseType === 'action.devices.SYNC') {
    // validate traits with attributes schema
    const syncErrors : object[] = [];
    const syncDevices = apiResponse['payload']['devices'];
    const syncDevicesLength = syncDevices.length;
    for (let i = 0; i < syncDevicesLength; i++) {
      const traits = syncDevices[i]['traits'];
      const traitsLength = syncDevices[i]['traits'].length;
      const attributes = syncDevices[i]['attributes'];
      if (attributes === undefined){
          return responseValidation(apiResponse, SYNC_RESPONSE_SCHEMA);
      }
      for (let j = 0; j < traitsLength; j++) {
        const trait = traits[j];
        if (trait in TRAIT_ATTRIBUTES_EXPECT) {
          const validateTraitRes = responseValidation(attributes, TRAIT_ATTRIBUTES_EXPECT[trait]);
          if (validateTraitRes) {
            return syncErrors.push(...validateTraitRes);
          } 
        }
      }
    }
    return syncErrors.length ? syncErrors : undefined; 
  } else if (responseType === 'action.devices.QUERY') {
    // validate with states schema
    const queryErrors : object[] = [];
    const devices = intentRequest['inputs'][0]['payload']['devices'];
    const devicesLength = devices.length;
    for (let i = 0; i < devicesLength; i++) {
      const deviceIds = devices[i]['id'];
      const states = apiResponse['payload']['devices'][deviceIds];
      // still working on this function figuring out a way to not hardcode the action in here
      const validateQueryTraitStates = responseValidation(states, COMMAND_STATES_EXPECT['action.devices.commands.OnOff']);
      if (validateQueryTraitStates) {
        return queryErrors.push(...validateQueryTraitStates);
      } 
    }
    return queryErrors.length ? queryErrors : undefined; 
  } else if (responseType === 'action.devices.EXECUTE') {
    // validate with states schema
    const executeErrors : object[] = [];
    // gets the specific command
    const execution = intentRequest['inputs'][0]['payload']['execution'];
    const executionLength = intentRequest['inputs'][0]['payload']['execution'].length;

    // identifies the part of the api response to validate against a schema
    const commands = apiResponse['payload']['commands'];
    const commandsLength = commands.length;

    for (let i = 0; i < executionLength; i++) {
      const commandName = execution[i]['command'];
      if (commandName in COMMAND_STATES_EXPECT) {
        for (let j = 0; j < commandsLength; j++) {
          const states = commands[j]['states'];
          const validateExecTraitStates = responseValidation(states, COMMAND_STATES_EXPECT[commandName]);
          if (validateExecTraitStates) {
            return executeErrors.push(...validateExecTraitStates);
          } else {
            return responseValidation(apiResponse, EXECUTE_RESPONSE_SCHEMA);
          }
        }
      }
    }
  } else if (responseType === 'action.devices.DISCONNECT') {
    return responseValidation(apiResponse, DISCONNECT_RESPONSE_SCHEMA);
  } throw new Error('Response type not valid');
}
