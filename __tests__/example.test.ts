'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

describe.only('Sync response testing suite', () => {
  // Test passes
  test('Sync Response using actions an intent handler', async () =>{
    const reqSync = testreq.generateSyncRequest();
    const res = fakeapp.onSync(reqSync);
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).toBe(undefined);
  });

  // Test fails defined user sync response 
  test('Sync Response using a given sync response fails', async () =>{
    const reqSync = testreq.generateSyncRequest();
    const res = require('./example.sync.response.fail.json');
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).not.toBe(undefined);
  });

  // Test passes defined user sync response 
  test('Sync Response using a given sync response passes', async () =>{
    const reqSync = testreq.generateSyncRequest();
    const res = require('./example.sync.response.json');
    const testlibValid = testlib.validate(reqSync, res);
    expect(testlibValid).toBe(undefined);
  });
  
});
