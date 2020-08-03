
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
    inputs: {
     intent: string; payload: { devices: { id: string; CustomData: CustomData; }[]; };
    }[];
}

export function generateQueryRequest(deviceIds: string[],CustomData: CustomData[]) : QueryRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, CustomData: CustomData[index]}))
            }
        }]
    }
}


type params = {[key: string]: any}

interface ExecuteRequest{
    requestId: string;
    inputs: { 
     intent: string; 
     payload: 
     { devices: 
        { id: string; 
        CustomData: CustomData;}[];
    execution: { command: string; params: params; }[];
    }; 
    }[];
}

export function generateExecuteRequest(deviceIds: string[], CustomData: CustomData[], commands: string[], params: params[]): ExecuteRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.EXECUTE",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, CustomData: CustomData[index]})),
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


