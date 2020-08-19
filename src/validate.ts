'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});

const SYNC_RESPONSE_SCHEMA = require('../intents/sync.response.schema.json');
const QUERY_RESPONSE_SCHEMA = require('../intents/query.response.schema.json');
const EXECUTE_RESPONSE_SCHEMA = require('../intents/execute.response.schema.json');
const DISCONNECT_RESPONSE_SCHEMA = require('../intents/disconnect.response.schema.json');
const ON_OFF_ATTRI_SCHEMA = require('../traits/onoff.attributes.schema.json');
const ON_OFF_PARAMS_SCHEMA = require('../traits/onoff.params.schema.json');
const ON_OFF_STATES_SCHEMA = require('../traits/onoff.states.schema.json');

/**
 * Helper function that uses AJV library to validate the response against the schema
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false.
 */
function responseValidation(apiResponse: object, schema: object) {
  const isValid = ajv.validate(schema, apiResponse);
  try {
    if (isValid) {
      return undefined;
    } else {
      throw new Error();
    }
  } catch (e) {
    return ajv.errors;
  }
}
/**
 * Identifies the response type and validates the function based on the schemas.
 * @param apiResponse User defined api response
 * @param responseType User defined intent response
 * @return Errors from AJV validation, if any. Undefined otherwise.
 */
export function validate(apiResponse: object, responseType: string) {
  if (responseType === 'sync') {
    // Sync response validations
    const DEVICES = apiResponse['payload']['devices'];
    const DEVICES_LENGTH = apiResponse['payload']['devices'].length;
    for (let i = 0; i <= DEVICES_LENGTH; i++){
        const DEVICE_TRAITS = DEVICES[i]['traits'];
        const TRAITS_LENGTH = DEVICE_TRAITS.length;
        const DEVICE_ATTRIBUTES = DEVICES[i]['attributes'];
        for (let j = 0; j <= TRAITS_LENGTH; j++){
            //validate this against the attributes
            const DEVICE_TRAITS[j]
        }
    } 
    return responseValidation(apiResponse, SYNC_RESPONSE_SCHEMA);
  } else if (responseType == 'query') {
    // Query response validations
        // loop using the device data given from generate requests 
    // validate against the onoff params schema here
    return responseValidation(apiResponse, QUERY_RESPONSE_SCHEMA);
  } else if (responseType == 'execute') {
    // Execute response validations
    const COMMANDS = apiResponse['payload']['commands'];
    const COMMANDS_LENGTH = COMMANDS.length;
    for (let i = 0; i <= COMMANDS_LENGTH; i++) {
      const STATES = COMMANDS[i]['states'];
      return responseValidation(STATES, ON_OFF_STATES_SCHEMA);
    }
    return responseValidation(apiResponse, EXECUTE_RESPONSE_SCHEMA);
  } else if (responseType == 'disconnect') {
    // Disconnect response validations
    return responseValidation(apiResponse, DISCONNECT_RESPONSE_SCHEMA);
  }
  throw new Error('Response type not specified');
}
