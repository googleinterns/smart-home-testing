'use-strict';
import * as Ajv from 'ajv';

const ajv = new Ajv({
    allErrors:true
});

export function validateSyncResponse(apiResponse: object) {
    const sync_response_schema = require('../intents/sync.response.schema.json')
    const isValid = ajv.validate(sync_response_schema, apiResponse)
    if (isValid) {
        return undefined
    }
    return ajv.errors
}

export function validate(apiResponse: object, responseType:  'sync' | 'query'|'execute'| 'disconnect'){
    if (responseType == 'sync'){
        return validateSyncResponse(apiResponse);
    }
    return undefined;
}
