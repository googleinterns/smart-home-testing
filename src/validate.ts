'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});


/**
 * Helper function that throws an error with a custom message
 * @param message Error message defined 
 * @return Throws an error with a message 
 */
function throwError(message: string): never {
    throw new Error(message);
}

/**
 * Helper function that uses AJV library to validate the response against the schema
 * @param apiResponse User defined api response
 * @return Returns undefined if valid is true, returns an array of error(s) if valid is false.
 */
function responseValidation(apiResponse: object, schema: object){
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
    
  const syncResponseSchema = require('../intents/sync.response.schema.json');
  const queryResponseSchema = require('../intents/query.response.schema.json');
  const executeResponseSchema = require('../intents/execute.response.schema.json');
  const disconnectResponseSchema = require('../intents/disconnect.response.schema.json');    
  
  if (responseType === 'sync') {
    return responseValidation(apiResponse,syncResponseSchema);
  } else if (responseType == 'query'){
    return responseValidation(apiResponse,queryResponseSchema);
  } else if (responseType == 'execute'){
    return responseValidation(apiResponse,executeResponseSchema);      
  } else if (responseType == 'disconnect'){
    return responseValidation(apiResponse,disconnectResponseSchema);      
  }
  return throwError('Response type not specified');
}
