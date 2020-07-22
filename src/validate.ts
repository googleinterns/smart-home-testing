// import {v4 as uuidv4} from 'uuid';

'use strict';

const Ajv = require('ajv'); 
const ajv = new Ajv();
const chai = require('chai');

chai.use(require('chai-json-schema-ajv'));

//calling the JSON schemas to throw assertion errors
const sync_response_schema = require('../intents/sync.response.schema.json');
const apiresponse = require('./apiresponse.json');

    
function validate(schema,apiresponse) {
    const validate = ajv.compile(schema);
    var valid = validate(apiresponse);
    console.log("Testing: " + schema["title"]);
    if (!valid) {
        chai.assert.fail("😠 Test Failed because " +  ajv.errorsText(validate.errors));
        //add actual vs. expected 
    }
    console.log("Test Successful!")
}


validate(sync_response_schema, apiresponse)



