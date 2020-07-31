
'use-strict';


function generateRequestID(min, max){
        return Math.floor(Math.random() * (max-min) + min).toString()
}
    

export function generatSyncRequest(){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.SYNC"
        }]
    }
}


let deviceIDs: Array<string>;

interface customDatas = {
    [key: string]: string | number | boolean
}

export function generateQueryRequest(deviceIds, customData){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices: devicesIds.map((deviceId, index) =>
                ({id: deviceId, customData: customData[1]}))
            }
        }]
    }
}
      


export function generateDisconnectRequest(){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.DISCONNECT"
        }]
    }
}


