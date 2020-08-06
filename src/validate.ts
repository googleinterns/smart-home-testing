'use-strict';

/**
 * Generates random request ID 
 * @param min Minimum number
 * @param max Maximum number 
 * @returns Random number between the range of the min to max number specified
 */
function generateRequestID(min: number, max: number){
     return Math.floor(Math.random() * (max-min) + min).toString()
}

/**
 * Generates SYNC request 
 * @returns Specified format for SYNC intent request. 
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

interface Device {
  id: string;
  customData?: {[key: string]: any};
}

interface QueryInput {
  intent: string; 
  payload: {
    devices: Device[]; 
  };
}

interface QueryRequest {
  requestId: string;
  inputs: QueryInput[];
}

/**
 * Generates QUERY request 
 * @param deviceIds array of strings specifying the device deviceIds
 * @param customData an array of data for the respective devices specified by the developer 
 * @returns Specified format for QUERY intent request. 
 */
export function generateQueryRequest(devices: Device[]) : QueryRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.QUERY",
          payload: {
            devices
            }
        }]
    }
}


interface Command{
    name: string,
    params?: {[key: string]: any}
}

interface ExecuteInput{
    intent: string;
    payload: {
        devices: Device[];
        execution: Command[];
    };
}

interface ExecuteRequest{
    requestId: string;
    inputs: ExecuteInput[];
}

/**
 * Generates EXECUTE request 
 * @param deviceIds Array of strings specifying the device deviceIds
 * @param customData Array of data for the respective devices specified by the developer 
 * @param commands Array of strings specifying the commands 
 * @param params Array of parameters based on the respective specified commands 
 * @returns Specified format for EXECUTE intent request. 
 */
export function generateExecuteRequest(devices: Device[], execution: Command[]): ExecuteRequest{
    const requestId = generateRequestID(100,999);
    return {
        requestId,
        inputs: [{
          intent: "action.devices.EXECUTE",
          payload: {
            devices,
            execution
          }
        }]
    }
}

/**
 * Generates DISCONNECT request 
 * @returns Specified format for DISCONNECT intent request. 
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
