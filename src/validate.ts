
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

export function generateQueryRequest(deviceIds, customDatas){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices: devicesIds.map((deviceId, index) =>
                ({id: deviceId, customData: customDatas[1]}))
            }
        }]
    }
}

let commands: Array<string>;
interface params = {
    [key: string]: string | number | boolean
}


export function generateExecuteRequest(deviceIds, customDatas, commands, params){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.EXECUTE",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, customData: customDatas[1]})),
            execution: commands.map((command, index) =>
                ({command: command, params: params[1]}))
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


