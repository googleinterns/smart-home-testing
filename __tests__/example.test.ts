'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

describe.only('Sync response testing suite', () => {
  // Test passes
  const reqSync = testreq.generateSyncRequest();
  test('Sync Response using actions an intent handler', async () =>{
    const res = fakeapp.onSync(reqSync);
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).toBe(undefined);
  });
  // Test fails defined user sync response
  test('Sync Response using a given sync response fails', async () =>{
    const res = require('./example.sync.response.fail.json');
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).not.toBe(undefined);
  });

  // Test passes defined user sync response
  test('Sync Response using a given sync response passes', async () =>{
    const res = require('./example.sync.response.json');
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).toBe(undefined);
  });
});

const devices = [{
  'id': '123',
  'customData': {
    'fooValue': 74,
    'barValue': true,
    'bazValue': 'foo',
  },
}, {
  'id': '456',
  'customData': {
    'fooValue': 12,
    'barValue': false,
    'bazValue': 'bar',
  },
}];

const execution = [{
  'command': 'action.devices.commands.OnOff',
  'params': {
    'on': true,
  },
}];

describe.only('Query response testing suite', () => {
  const reqQuery = testreq.generateQueryRequest(devices);
  const executeLength = execution.length;
  // Test passes
  test('Query Response passes using actions an intent handler', async () =>{
    const res = fakeapp.onQuery(reqQuery);
    for (let i = 0; i <= executeLength; i++) {
      const testlibValid = testlib.validate(reqQuery, res, execution[0]['command']);
      expect(testlibValid).toBe(undefined);
    }
  });

  test('Query Response fails using actions a given query response', async () =>{
    const res = require('./example.query.response.fail.json');
    for (let i = 0; i <= executeLength; i++) {
      const testlibValid = testlib.validate(reqQuery, res, execution[0]['command']);
      expect(testlibValid).not.toBe(undefined);
    }
  });
});

describe.only('Execute response testing suite', () => {
  const reqExecute = testreq.generateExecuteRequest(devices, execution);
  // Test should pass but there is an error here right now.
  test('Execute Response using actions an intent handler', async () =>{
    const res = fakeapp.onExecute(reqExecute);
    const testlibValid = testlib.validate(reqExecute, res);
    expect(testlibValid).toBe(undefined);
  });

  test('Execute Response fails using actions a given query response', async () =>{
    const res = require('./example.execute.response.fail.json');
    const testlibValid = testlib.validate(reqExecute, res);
    expect(testlibValid).not.toBe(undefined);
  });
});

describe.only('Disconnect response testing suite', () => {
  // Test should pass but there is an error here right now.
  test('Disconnect Response using actions an intent handler', async () =>{
    const reqDisconnect = testreq.generateDisconnectRequest();
    const res = fakeapp.onDisconnect(reqDisconnect);
    const testlibValid = testlib.validate(reqDisconnect, res);
    expect(testlibValid).toBe(undefined);
  });
});
