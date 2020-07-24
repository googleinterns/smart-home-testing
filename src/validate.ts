'use strict';

const Ajv = require('ajv'); 
const ajv = new Ajv();
const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));

//calling the JSON schemas to throw assertion errors
const sync_response_schema = require('../intents/sync.response.schema.json');
const apiresponse = require('./apiresponse.json');


const testsPassed = 0
const testsFailed = 0
const totalTests = 0

function generateRandom(min, max){
    //helper function for obtaining a random requestId
    return Math.floor(Math.random() * (max-min) + min).toString();
}

function generateSyncReq(){
    const requestId = generateRandom(100,999);
    const intent = "action.devices.SYNC"
    return {
    "requestId": requestId,
    "inputs": [{
      "intent": intent,
       }]
    }
}

const sync_request = generateSyncReq();
const requestId = sync_request["requestId"];

function generateQueryReq(deviceID){
    return {
    "requestId": requestId,
    "inputs": [{
      "intent": "actions.devices.QUERY",
      "payload": {
        "devices": [{
          "id": deviceID,
          "customData": {
            "fooValue": 74,
            "barValue": true,
            "bazValue": "foo"
          }
        }]
      }
    }]
  }
}


function generateDisconnectReq(){
    return {
        "requestId": sync_request["requestId"],
        "inputs": [{
          "intent": "action.devices.DISCONNECT",
        }]
    }
}

console.log(generateDisconnectReq());


function validate(schema, apiresponse){
    const validate = ajv.compile(schema);
    var valid = validate(apiresponse);
    console.log("Testing: " + schema["title"]);
    if (!valid) {
        chai.assert.fail("😠 Test Failed because " +  ajv.errorsText(validate.errors));
        //add actual vs. expected 
        testsFailed++;
    } else {
        return "Test Successful!";
        testsPassed++;
    }
}


exports.displayTestResults = function displayTestResults(){
    console.log('Total tests run: ${totalTests}')
    
}

var data = [{one:1}, {two:2}, {three:3}];

var values = data.map(o=>Object.values(o)[0]);

console.log(values);


