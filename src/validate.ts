'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});

/**
 * Helper function that uses AJV library to validate the response against the schema 
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false. 
 */
function validateSyncResponse(apiResponse: object) {
  const syncResponseSchema = require('../intents/sync.response.schema.json');
  const isValid = ajv.validate(syncResponseSchema, apiResponse);
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
  if (responseType == 'sync') {
    return validateSyncResponse(apiResponse);
  }
  return undefined;
}
