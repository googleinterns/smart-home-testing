'use-strict';
'use strict';
exports.__esModule = true;
exports.validate = void 0;
const Ajv = require('ajv');
const ajv = new Ajv({
  allErrors: true,
});
/**
 * Helper function that uses AJV library to validate the response against the schema
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false.
 */
function validateSyncResponse(apiResponse) {
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
function validate(apiResponse, responseType) {
  if (responseType === 'sync') {
    return validateSyncResponse(apiResponse);
  }
  throw new Error();
}
exports.validate = validate;
