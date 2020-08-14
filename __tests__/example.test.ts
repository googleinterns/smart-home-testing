'use-strict';
import * as testlib from '../src/validate';
import * as testreq from '../src/requests';
const {smarthome} = require('actions-on-google');

const app = smarthome({
  debug: true,
});

app.onSync((body) => {
  return {
      "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
      "payload": {
        "agentUserId": "1836.15267389",
        "devices": [
          {
            "id": "123",
            "type": "action.devices.types.OUTLET",
            "traits": [
              "action.devices.traits.OnOff"
            ],
            "name": {
              "defaultNames": [
                "My Outlet 1234"
              ],
              "name": "Night light",
              "nicknames": [
                "wall plug"
              ]
            },
            "willReportState": false,
            "roomHint": "kitchen",
            "deviceInfo": {
              "manufacturer": "lights-out-inc",
              "model": "hs1234",
              "hwVersion": "3.2",
              "swVersion": "11.4"
            },
            "otherDeviceIds": [
              {
                "deviceId": "local-device-id"
              }
            ],
            "customData": {
              "fooValue": 74,
              "barValue": true,
              "bazValue": "foo"
            }
          },
          {
            "id": "456",
            "type": "action.devices.types.LIGHT",
            "traits": [
              "action.devices.traits.OnOff",
              "action.devices.traits.Brightness",
              "action.devices.traits.ColorSetting"
            ],
            "name": {
              "defaultNames": [
                "lights out inc. bulb A19 color hyperglow"
              ],
              "name": "lamp1",
              "nicknames": [
                "reading lamp"
              ]
            },
            "willReportState": false,
            "roomHint": "office",
            "attributes": {
              "colorModel": "rgb",
              "colorTemperatureRange": {
                "temperatureMinK": 2000,
                "temperatureMaxK": 9000
              },
              "commandOnlyColorSetting": false
            },
            "deviceInfo": {
              "manufacturer": "lights out inc.",
              "model": "hg11",
              "hwVersion": "1.2",
              "swVersion": "5.4"
            },
            "customData": {
              "fooValue": 12,
              "barValue": false,
              "bazValue": "bar"
            }
          }
        ]
      }
    }
});

// Test passes, using the defined schema 
test('Sync Response passes', async () => {
  const exampleSyncRes = require('./example.sync.response.json');
  const noErrors = testlib.validate(exampleSyncRes, 'sync');
  expect(noErrors).toBe(undefined);
});

//Test passes, using intent handler (this currently shows an error though)
test('Sync Response using actions an intent handler', async () =>{
  const reqSync = testreq.generateSyncRequest();
  const res = app.onSync(reqSync)
  const testlibValid = testlib.validate(res, 'sync');
  console.log(testlibValid)
  expect(testlibValid).toBe(undefined);
});

// Test fails and shows errors, using defined schema
test('Sync Response fails', async () => {
  const exampleSyncResFail = require('./example.sync.response.fail.json');
  const syncErrors = testlib.validate(exampleSyncResFail, 'sync');
  console.log(syncErrors);
  expect(syncErrors && syncErrors.join('\n')).toBeFalsy();
});
