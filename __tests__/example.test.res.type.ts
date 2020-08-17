'use-strict';
import * as testlib from '../src/validate';

test('Sync Response fails due to invalid response type', async () => {
  const exampleSyncRes = require('./example.sync.response.json');
  const syncErrors = testlib.validate(exampleSyncRes, 'fail');
  console.log(syncErrors);
  expect(syncErrors && syncErrors.join('\n')).toThrow(TypeError);
});
