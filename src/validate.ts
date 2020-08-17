'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});

const SYNC_RESPONSE_SCHEMA = require('../intents/sync.response.schema.json');
const QUERY_RESPONSE_SCHEMA = require('../intents/query.response.schema.json');
const EXECUTE_RESPONSE_SCHEMA = require('../intents/execute.response.schema.json');
const DISCONNECT_RESPONSE_SCHEMA = require('../intents/disconnect.response.schema.json');

/**
 * Helper function that uses AJV library to validate the response against the schema
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false.
 */
function responseValidation(apiResponse: object, schema: object) {
  const isValid = ajv.validate(schema, apiResponse);
  if (isValid) {
    return undefined;
  }
  return ajv.errors;
}

/**
 * Identifies the response type and validates the function based on the schemas.
 * @param apiResponse User defined api response
 * @param responseType User defined intent response
 * @return Errors from AJV validation, if any. Undefined otherwise.
 */
export function validate(apiResponse: object, responseType: 'sync' | 'query'|'execute'| 'disconnect') {
  if (responseType === 'sync') {
    return responseValidation(apiResponse, SYNC_RESPONSE_SCHEMA);
  } else if (responseType == 'query') {
    return responseValidation(apiResponse, QUERY_RESPONSE_SCHEMA);
  } else if (responseType == 'execute') {
    return responseValidation(apiResponse, EXECUTE_RESPONSE_SCHEMA);
  } else if (responseType == 'disconnect') {
    return responseValidation(apiResponse, DISCONNECT_RESPONSE_SCHEMA);
  }
  throw new Error('Response type not specified');
}
