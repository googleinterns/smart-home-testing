'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
import * as fakeapp from './fake-app';

describe.only('Sync response testing suite', () => {
  // Test passes, using the defined schema
  test('Sync Response passes', async () => {
    const exampleSyncRes = require('./example.sync.response.json');
    const noErrors = testlib.validate(exampleSyncRes, 'sync');
    expect(noErrors).toBe(undefined);
  });

  // Test fails and shows errors, using defined schema
  test('Sync Response fails', async () => {
    const exampleSyncResFail = require('./example.sync.response.fail.json');
    expect(() => {
      testlib.validate(exampleSyncResFail, 'fail');
    }).toThrow();
  });

  // Test passes
  test('Sync Response using actions an intent handler', async () =>{
    const reqSync = testreq.generateSyncRequest();
    const res = fakeapp.onSync(reqSync);
    const testlibValid = testlib.validate(res, 'sync');
    expect(testlibValid).toBe(undefined);
  });

  test('Sync Response fails due to invalid response type', async () => {
    const reqSync = testreq.generateSyncRequest();
    const res = fakeapp.onSync(reqSync);
    expect(() => {
      testlib.validate(res, 'fail');
    }).toThrow();
  });
});
