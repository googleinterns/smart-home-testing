'use-strict';

export function onSync(body) {
  return {
    'requestId': 'ff36a3cc-ec34-11e6-b1a0-64510650abcf',
    'payload': {
      'agentUserId': '1836.15267389',
      'devices': [
        {
          'id': '123',
          'type': 'action.devices.types.OUTLET',
          'traits': [
            'action.devices.traits.OnOff',
          ],
          'name': {
            'defaultNames': [
              'My Outlet 1234',
            ],
            'name': 'Night light',
            'nicknames': [
              'wall plug',
            ],
          },
          'willReportState': false,
          'roomHint': 'kitchen',
          'deviceInfo': {
            'manufacturer': 'lights-out-inc',
            'model': 'hs1234',
            'hwVersion': '3.2',
            'swVersion': '11.4',
          },
          'otherDeviceIds': [
            {
              'deviceId': 'local-device-id',
            },
          ],
          'customData': {
            'fooValue': 74,
            'barValue': true,
            'bazValue': 'foo',
          },
        },
        {
          'id': '456',
          'type': 'action.devices.types.LIGHT',
          'traits': [
            'action.devices.traits.OnOff',
            'action.devices.traits.Brightness',
            'action.devices.traits.ColorSetting',
          ],
          'name': {
            'defaultNames': [
              'lights out inc. bulb A19 color hyperglow',
            ],
            'name': 'lamp1',
            'nicknames': [
              'reading lamp',
            ],
          },
          'willReportState': false,
          'roomHint': 'office',
          'attributes': {
            'colorModel': 'rgb',
            'colorTemperatureRange': {
              'temperatureMinK': 2000,
              'temperatureMaxK': 9000,
            },
            'commandOnlyColorSetting': false,
          },
          'deviceInfo': {
            'manufacturer': 'lights out inc.',
            'model': 'hg11',
            'hwVersion': '1.2',
            'swVersion': '5.4',
          },
          'customData': {
            'fooValue': 12,
            'barValue': false,
            'bazValue': 'bar',
          },
        },
      ],
    },
  };
}

export function onQuery(body) {
  return {
    'requestId': 'ff36a3cc-ec34-11e6-b1a0-64510650abcf',
    'payload': {
      'devices': {
        '123': {
          'on': true,
          'online': true,
          'status': 'SUCCESS',
        },
        '456': {
          'on': true,
          'online': true,
          'status': 'SUCCESS',
          'brightness': 80,
          'color': {
            'spectrumRgb': 31655,
          },
        },
      },
    },
  };
}

export function onExecute(body) {
  return {
    'requestId': 'ff36a3cc-ec34-11e6-b1a0-64510650abcf',
    'payload': {
      'commands': [
        {
          'ids': [
            '123',
          ],
          'status': 'SUCCESS',
          'states': {
            'on': true,
            'online': true,
          },
        },
        {
          'ids': [
            '456',
          ],
          'status': 'ERROR',
          'errorCode': 'deviceTurnedOff',
        },
      ],
    },
  };
}

export function onDisconnect(body) {
  // User unlinked their account, stop reporting state for the user
  return {};
}
