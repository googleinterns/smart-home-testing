
'use-strict';


function generateRequestID(min, max){
        return Math.floor(Math.random() * (max-min) + min).toString()
}
    

export function generateSyncRequest(){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.SYNC"
        }]
    }
}


type customDatas = {[key: string]: any}

interface QueryRequest{
    requestId: string;
    inputs: Array<QueryRequest>;
}

export function generateQueryRequest(deviceIds: string[], customDatas[]) : QueryRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices: devicesIds.map((deviceId, index) =>
                ({id: deviceId, customData: customDatas[index]}))
            }
        }]
    }
}


type params = {[key: string]: any}

interface ExecuteRequest{
    requestId: string;
    inputs: Array<ExecuteRequest>;  
}

export function generateExecuteRequest(deviceIds: string[], customDatas[], commands: string[], params[]): ExecuteRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.EXECUTE",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, customData: customDatas[index]})),
            execution: commands.map((command, index) =>
                ({command: command, params: params[index]}))
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


