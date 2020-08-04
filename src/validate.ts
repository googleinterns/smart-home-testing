'use-strict';

/**
 * Generates random request ID 
 * @param min Minimum number
 * @param max Maximum number 
 * @returns Returns the random number between the range of the min to max number specified
 */
function generateRequestID(min, max){
     return Math.floor(Math.random() * (max-min) + min).toString()
}
    
/**
 * Generates SYNC request 
 * @returns returns specified format for SYNC intent request. 
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

/**
 * Generates QUERY request 
 * @param deviceIds array of strings specifying the device deviceIds
 * @param customData an array of data for the respective devices specified by the developer 
 * @returns returns specified format for QUERY intent request. 
 */
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


type Params = {[key: string]: any}

interface ExecuteRequest{
    requestId: string;
    inputs: { 
     intent: string; 
     payload: 
     { devices: 
        { id: string; 
        customData: CustomData;}[];
    execution: { command: string; params: Params; }[];
    }; 
    }[];
}

/**
 * Generates EXECUTE request 
 * @param deviceIds Array of strings specifying the device deviceIds
 * @param customData Array of data for the respective devices specified by the developer 
 * @param commands Array of strings specifying the commands 
 * @param params Array of parameters based on the respective specified commands 
 * @returns returns specified format for EXECUTE intent request. 
 */
export function generateExecuteRequest(deviceIds: string[], customData: CustomData[], commands: string[], params: Params[]): ExecuteRequest{
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


/**
 * Generates DISCONNECT request 
 * @returns returns specified format for DISCONNECT intent request. 
 */
export function generateDisconnectRequest(){
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.DISCONNECT"
        }]
    }
}

