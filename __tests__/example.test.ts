'use-strict';
import * as testlib from '../src/validate';
//Test passes
test("Test 1: Sync Response passes", async() => {
  const example_sync_res = require('./example.sync.response.json');
  const noErrors = testlib.validate(example_sync_res, 'sync');
  expect(noErrors).toBe(undefined);
});

//Test fails and shows errors
test("Test 2: Sync Response fails", async() => {
  const example_sync_res_fail = require('./example.sync.response.fail.json');
  const syncErrors = testlib.validate(example_sync_res_fail, 'sync');
  console.log(syncErrors);
  expect(syncErrors && syncErrors.join('\n')).toBe(undefined);
});
