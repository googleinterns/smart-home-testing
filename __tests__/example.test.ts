'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
const {smarthome} = require('actions-on-google');

const app = smarthome({
  debug: true,
});

// Test passes
test(Sync Response passes', async () => {
  const exampleSyncRes = require('./example.sync.response.json');
  const noErrors = testlib.validate(exampleSyncRes, 'sync');
  expect(noErrors).toBe(undefined);
});

test('Sync Response using actions an intent handler', async () =>{
  const reqSync = testreq.generateSyncRequest();
  const res = app.onSync(reqSync)
  const testlibValid = testlib.validate(res, 'sync');
  console.log(testlibValid)
  expect(testlibValid).toBe(undefined);
});

// Test fails and shows errors
test('Sync Response fails', async () => {
  const exampleSyncResFail = require('./example.sync.response.fail.json');
  const syncErrors = testlib.validate(exampleSyncResFail, 'sync');
  console.log(syncErrors);
  expect(syncErrors && syncErrors.join('\n')).toBeFalsy();
});
