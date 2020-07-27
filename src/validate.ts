'use strict';

chai.use(require('chai-json-schema-ajv'));

function generateRandom(min, max){
    //helper function for obtaining a random requestId
    return Math.floor(Math.random() * (max-min) + min).toString();
}


function generateSyncReq(){
    const requestId = generateRandom(100,999);
    return {
    requestId,
    "inputs": [{
      "intent": "action.devices.SYNC"
        }]
    }
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
    queryReq.payload.devices[0]["id"] = deviceID;

    
    //  for (var i = 0; i <deviceID.length; i++){
    //         queryReq.payload.devices[i]["id"] = deviceID[i];
    //     }
    //add custom data
    
    return queryReq;
    
    
}

const deviceInfo = (query_request["inputs"][0]["payload"]);

function generateExecuteReq(traits, params){
    return {
        "requestId": requestId,
        "inputs": [{
          "intent": "action.devices.EXECUTE",
          "payload": {
            "commands": deviceInfo,
              "execution": [{
                "command": traits,
                params;
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





