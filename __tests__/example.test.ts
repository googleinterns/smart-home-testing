'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';

const {smarthome} = require('actions-on-google');
const app = smarthome();
// Test passes
test('Test 1: Sync Response passes', async () => {
  const exampleSyncRes = require('./example.sync.response.json');
  const noErrors = testlib.validate(exampleSyncRes, 'sync');
  expect(noErrors).toBe(undefined);
});

// Test fails and shows errors
test('Test 2: Sync Response fails', async () => {
  const exampleSyncResFail = require('./example.sync.response.fail.json');
  const syncErrors = testlib.validate(exampleSyncResFail, 'sync');
  console.log(syncErrors);
  expect(syncErrors && syncErrors.join('\n')).toBe(undefined);
});

test('Test 3: Sync Response using actions an intent handler', async () =>{
  const reqSync = testreq.generateSyncRequest();
  const res = app.handler(reqSync);
  const testlibValid = testlib.validate(res, 'sync');
  expect(testlibValid).toBe(undefined);
});

