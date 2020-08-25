'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

const reqSync = testreq.generateSyncRequest();
const resSync = fakeapp.onSync(reqSync);

describe.only('Sync response testing suite', () => {
  // Test passes
  test('Sync Response using actions an intent handler', async () =>{
    
    const testlibValid = testlib.validate(reqSync, resSync);
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

const reqQuery = testreq.generateQueryRequest(devices);

describe.only('Query response testing suite', () => {
  // Test passes
  test('Query Response passes using actions an intent handler', async () =>{
    const resQuery = fakeapp.onQuery(reqQuery);
    const testlibValid = testlib.validate(reqQuery, resQuery, resSync);
    expect(testlibValid).toBe(undefined);
  });

  test('Query Response fails using actions a given query response', async () =>{
    const resQuery = require('./example.query.response.fail.json');
    const testlibValid = testlib.validate(reqQuery, resQuery, resSync);
    expect(testlibValid).not.toBe(undefined);
  });
});

const execution = [{
  'command': 'action.devices.commands.OnOff',
  'params': {
    'on': true,
  },
}];
const reqExecute = testreq.generateExecuteRequest(devices, execution);

describe.only('Execute response testing suite', () => {
  // Test should pass but there is an error here right now.
  test('Execute Response using actions an intent handler', async () =>{
    const resExecute = fakeapp.onExecute(reqExecute);
    const testlibValid = testlib.validate(reqExecute, resExecute);
    expect(testlibValid).toBe(undefined);
  });

  test('Execute Response fails using actions a given query response', async () =>{
    const resExecute = require('./example.execute.response.fail.json');
    const testlibValid = testlib.validate(reqExecute, resExecute);
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
