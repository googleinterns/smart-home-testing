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

const TRAITS_COMMANDS_PAIR = {
  'action.devices.traits.OnOff': 'action.devices.commands.OnOff',
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
<<<<<<< HEAD
 * @param req Request from one of the generate request functions.
 * @param apiResponse User defined api response.
||||||| merged common ancestors
 * @param apiResponse User defined api response
 * @param responseType User defined intent response
=======
 * @param req Request from one of the generate request functions.
 * @param apiResponse User defined api response.
 * @param syncData? Optional parameter to help identify what schemas to use for trait validation 
>>>>>>> 8a16c7c7a73923dfa4a046e0b8b69fbc0da37d39
 * @return Errors from AJV validation, if any. Undefined otherwise.
 */
export function validate(intentRequest: object, apiResponse: object, syncData?: object){
  const responseType = intentRequest['inputs'][0]['intent'];

  if (responseType === 'action.devices.SYNC') {
    const validateSyncAPI = responseValidation(apiResponse, SYNC_RESPONSE_SCHEMA); 
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
        if (trait in TRAIT_ATTRIBUTES_EXPECT) {
          const validateTraitRes = responseValidation(attributes, TRAIT_ATTRIBUTES_EXPECT[trait]);
          if (validateTraitRes) {
            syncErrors.push(...validateTraitRes);
          }
        }
      }
   } 
    return syncErrors.length ? syncErrors : undefined;
  } else if (responseType === 'action.devices.QUERY') {
    // validate with states schema;
    const queryErrors : object[] = [];
    const devices = intentRequest['inputs'][0]['payload']['devices'];
    const devicesLength = devices.length;
    
    const validateQueryAPI = responseValidation(apiResponse, QUERY_RESPONSE_SCHEMA);
    if (validateQueryAPI) {
        queryErrors.push(...validateQueryAPI);
        return queryErrors;
    }   
   
    for (let i = 0; i < devicesLength; i++) {
      const deviceIds = devices[i]['id'];
      const states = apiResponse['payload']['devices'][deviceIds];
      if (syncData){
        const syncDevices = syncData['payload']['devices'];
        const syncDevicesLength = syncDevices.length;
        for (let j = 0; j < syncDevicesLength; j++) {
             const trait = syncDevices[j]['traits'];
             if (trait in TRAITS_COMMANDS_PAIR){
               const validateQueryTraitStates = responseValidation(states, COMMAND_STATES_EXPECT[TRAITS_COMMANDS_PAIR[trait]]);
                 if (validateQueryTraitStates) {
                   queryErrors.push(...validateQueryTraitStates);
                 }
             }
          }
        }
      }
    return queryErrors.length ? queryErrors : undefined;
  } else if (responseType === 'action.devices.EXECUTE') {
    // validate with states schema
    const executeErrors : object[] = [];
    // gets the execution array from the intent request
    const execution = intentRequest['inputs'][0]['payload']['execution'];
    const executionLength = execution.length;

    const validateExecuteAPI = responseValidation(apiResponse, EXECUTE_RESPONSE_SCHEMA);
   
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
      if (commandName in COMMAND_STATES_EXPECT) {
        for (let j = 0; j < commandsLength; j++) {
          const states = commands[j]['states'];
          const validateExecTraitStates = responseValidation(states, COMMAND_STATES_EXPECT[commandName]);
          if (validateExecTraitStates) {
            executeErrors.push(...validateExecTraitStates);
          } 
        }
      }
    }
   return executeErrors.length ? executeErrors : undefined;
  } else if (responseType === 'action.devices.DISCONNECT') {
    return responseValidation(apiResponse, DISCONNECT_RESPONSE_SCHEMA);
  } throw new Error('Response type not valid');
}
