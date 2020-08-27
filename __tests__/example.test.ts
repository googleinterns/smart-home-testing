'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

describe.only('Sync response testing suite', () => {
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync);    
  // Test passes
  test('Sync Response using actions an intent handler', async () =>{
    const testlibValid = testlib.validate(requestSync, responseSync);
    expect(testlibValid).toBe(undefined);
  });
  // Test fails defined user sync response
  test('Sync Response using a given sync response fails', async () =>{
    const responseSync = require('./example.sync.response.fail.json');
    const testlibValid = testlib.validate(requestSync, responseSync);
    expect(testlibValid).not.toBe(undefined);
  });

  // Test passes defined user sync response
  test('Sync Response using a given sync response passes', async () =>{
    const responseSync = require('./example.sync.response.json');
    const testlibValid = testlib.validate(requestSync, responseSync);
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

describe.only('Query response testing suite', () => {
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync); 
  const requestQuery = testreq.generateQueryRequest(devices);    
  // Test passes
  test('Query Response passes using actions an intent handler', async () =>{
    const responseQuery = fakeapp.onQuery(requestQuery);
    const testlibValid = testlib.validate(requestQuery, responseQuery, responseSync);
    expect(testlibValid).toBe(undefined);
  });

  test('Query Response fails using actions a given query response', async () =>{
    const responseQuery = require('./example.query.response.fail.json');
    const testlibValid = testlib.validate(requestQuery, responseQuery, responseSync);
    expect(testlibValid).not.toBe(undefined);
  });
});

const execution = [{
  'command': 'action.devices.commands.OnOff',
  'params': {
    'on': true,
  },
}];

describe.only('Execute response testing suite', () => {
  //Test doesn't pass     
  const requestExecute = testreq.generateExecuteRequest(devices, execution);  
  test('Execute Response using actions an intent handler', async () =>{
    const responseExecute = require('./example.execute.response.json');
    const testlibValid = testlib.validate(requestExecute, responseExecute);
    expect(testlibValid).toBe(undefined);
  });

  test('Execute Response fails using actions a given execute response', async () =>{
    const responseExecute = require('./example.execute.response.fail.json');
    const testlibValid = testlib.validate(requestExecute, responseExecute);
    expect(testlibValid).not.toBe(undefined);
  });
});

describe.only('Disconnect response testing suite', () => {
  // Test should pass but there is an error here right now.
  test('Disconnect Response using actions an intent handler', async () =>{
    const requestDisconnect = testreq.generateDisconnectRequest();
    const responseDisconnect = fakeapp.onDisconnect(requestDisconnect);
    const testlibValid = testlib.validate(requestDisconnect, responseDisconnect);
    expect(testlibValid).toBe(undefined);
  });
});
