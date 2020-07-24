'use strict';

const Ajv = require('ajv'); 
const ajv = new Ajv();
const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));

//calling the JSON schemas to throw assertion errors
const sync_response_schema = require('../intents/sync.response.schema.json');
const apiresponse = require('./apiresponse.json');


var testsPassed = 0
var testsFailed = 0
var totalTests = 0

/**
 * Generate requests to validate the responses later on  
*/

function generateRandom(min, max){
    //helper function for obtaining a random requestId
    return Math.floor(Math.random() * (max-min) + min).toString();
}

function generateSyncReq(){
    const requestRandId = generateRandom(100,999);
    const intent = "action.devices.SYNC"
    
    var syncReq = {};
    syncReq.requestId = requestRandId;
    syncReq.inputs = [];
    syncReq.inputs.unshift({});
    syncReq.inputs[0]["intent"] = intent;
    return syncReq

}

const sync_request = generateSyncReq();
const requestRandId = sync_request["requestId"];

function generateQueryReq(deviceID){
    
    const intent = "action.devices.QUERY";
    var queryReq = {};
    queryReq.requestId = requestRandId;
    queryReq.inputs = [];
    queryReq.inputs.unshift({});
    queryReq.inputs[0]["intent"] = intent;
    queryReq.payload = {};
    queryReq.payload.devices = [];
    queryReq.payload.devices.unshift({})
    queryReq.payload.devices[0]['id'] = deviceID
    
    //add custom data so that the user can input this instead
     
    return queryReq
    
    
//     return {
//     "requestId": requestId,
//     "inputs": [{
//       "intent": "action.devices.QUERY",
//       "payload": {
//         "devices": [{
//           "id": deviceID,
//           "customData": {
//             "fooValue": 74,
//             "barValue": true,
//             "bazValue": "foo"
//           }
//         }, {
//           "id": "456",
//           "customData": {
//             "fooValue": 12,
//             "barValue": false,
//             "bazValue": "bar"
//           }
//         }]
//       }
//     }]
//   }
}

const query_request = generateQueryReq("123");

console.log(query_request)
const deviceInfo = (query_request["inputs"][0]["payload"]);

function generateExecuteReq(traits, attributes){
    return {
        "requestId": requestId,
        "inputs": [{
          "intent": "action.devices.EXECUTE",
          "payload": {
            "commands": deviceInfo,
              "execution": [{
                "command": traits,
                "params": {
                  "on": true
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


function validate(schema, apiresponse){
    //this function will validate the responses from the requests 
    const validate = ajv.compile(schema);
    var valid = validate(apiresponse);
    if (!valid) {
        chai.assert.fail("😠 Test Failed because " +  ajv.errorsText(validate.errors));
        testsFailed++;
    } else {
        chai.assert.isOk(valid, "Test Successful!");
        testsPassed++;
    }
}


exports.displayTestResults = function displayTestResults(){
    totalTests = testsPassed + testsFailed;
    return totalTests;
    
}


