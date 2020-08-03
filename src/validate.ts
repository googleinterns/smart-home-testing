
'use-strict';

 /**
 * Generates random request ID
 */

function generateRequestID(min, max){
    
        return Math.floor(Math.random() * (max-min) + min).toString()
}
    
 /**
 * Generating JSON request payloads for SYNC, QUERY, EXECUTE, and DISCONNECT intents
 */
export function generateSyncRequest(){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.SYNC"
        }]
    }
}

type CustomData = {[key: string]: any}

interface QueryRequest{
    requestId: string;
    inputs: {
     intent: string; payload: { devices: { id: string; customData: CustomData; }[]; };
    }[];
}

export function generateQueryRequest(deviceIds: string[],customData: CustomData[]) : QueryRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, customData: customData[index]}))
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
        customData: CustomData;}[];
    execution: { command: string; params: params; }[];
    }; 
    }[];
}

export function generateExecuteRequest(deviceIds: string[], customData: CustomData[], commands: string[], params: params[]): ExecuteRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.EXECUTE",
          payload: {
            devices: deviceIds.map((deviceId, index) =>
                ({id: deviceId, customData: customData[index]})),
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
