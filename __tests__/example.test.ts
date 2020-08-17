'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

// Test passes, using the defined schema 
test('Sync Response passes', async () => {
  const exampleSyncRes = require('./example.sync.response.json');
  const noErrors = testlib.validate(exampleSyncRes, 'sync');
  expect(noErrors).toBe(undefined);
});

//Test passes
test('Sync Response using actions an intent handler', async () =>{
  const reqSync = testreq.generateSyncRequest();
  const res = fakeapp.onSync(reqSync)
  const testlibValid = testlib.validate(res, 'sync');
  expect(testlibValid).toBe(undefined);
});

// Test fails and shows errors, using defined schema
test('Sync Response fails', async () => {
  const exampleSyncResFail = require('./example.sync.response.fail.json');
  const syncErrors = testlib.validate(exampleSyncResFail, 'sync');
  expect(syncErrors).toBeFalsy();
});

test('execute Response using actions an intent handler', async () =>{
  const reqExec = testreq.generateExecuteRequest();
  const res = fakeapp.onExecute(reqExec)
  const testlibValid = testlib.validate(res, 'sync');
  expect(testlibValid).toBe(undefined);
});