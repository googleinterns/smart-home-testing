/**
 * Generates random request ID
 * @param min Minimum number
 * @param max Maximum number
 * @return Random number between the range of the min to max number specified
 */
function generateRequestID(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min).toString();
}

/**
 * Generates SYNC request
 * @return Specified format for SYNC intent request.
 */
export function generateSyncRequest() {
  const requestId = generateRequestID(100, 999);
  return {
    requestId,
    inputs: [
      {
        intent: 'action.devices.SYNC',
      },
    ],
  };
}

interface Device {
  id: string;
  customData?: { [key: string]: any };
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
 * @param devices Array of type Device containing device IDs and respective custom data
 * @return Specified format for QUERY intent request.
 */
export function generateQueryRequest(devices: Device[]): QueryRequest {
  const requestId = generateRequestID(100, 999);
  return {
    requestId,
    inputs: [
      {
        intent: 'action.devices.QUERY',
        payload: {
          devices,
        },
      },
    ],
  };
}

interface Command {
  command: string;
  params?: { [key: string]: any };
}

interface ExecuteInput {
  intent: string;
  payload: {
    commands: [{
      devices: Device[];
      execution: Command[];
    }]
  };
}

interface ExecuteRequest {
  requestId: string;
  inputs: ExecuteInput[];
}

/**
 * Generates EXECUTE request
 * @param devices Array of type Device containing device IDs and respective custom data
 * @param execution Array of type Command specifying the commands of the devices and their respective parameters
 * @return Specified format for EXECUTE intent request.
 */
export function generateExecuteRequest(
    devices: Device[],
    execution: Command[],
): ExecuteRequest {
  const requestId = generateRequestID(100, 999);
  return {
    requestId,
    inputs: [
      {
        intent: 'action.devices.EXECUTE',
        payload: {
          commands: [{
            devices,
            execution,
          }]
        },
      },
    ],
  };
}

/**
 * Generates DISCONNECT request
 * @return Specified format for DISCONNECT intent request.
 */
export function generateDisconnectRequest() {
  const requestId = generateRequestID(100, 999);
  return {
    requestId,
    inputs: [
      {
        intent: 'action.devices.DISCONNECT',
      },
    ],
  };
}
