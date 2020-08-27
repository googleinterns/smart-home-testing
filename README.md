# Integration Testing for Smart Home Actions  

## Testing Library for Smart Home

The objective is to design a scalable integration testing library for Smart Home Actions. With the enhanced logging, developers will be able to find more details about failures.
The big impact of this will be removing friction and latency from the dev cycle, which will allow the developer to successfully verify their action more efficiently.

**This repository consists of:**
- `src/` holds the library functionalities to generate intent requests and functions to validate intent API responses against the current JSON Schemas in TypeScript.
- `__tests__/` shows examples on how the library would interact with a developer's tests for each intent  
- `intents/` holds the current JSON schemas for each intent response 
- `traits/` holds the current JSON trait schemas for the on off trait, used to verify its states and attributes 

## Installation 
Use the package manager [npm](https://www.npmjs.com/) to install the packages used for the testing library 

```bash
npm install
```

## Usage 
As previously stated, the tests folder contains examples on how the library would interact with a developer's tests for each intent. This section will break down a simple validation test 
further. In this example, we will be focusing on a SYNC test using the Jest framework.

Import the testing library modules in your tests
```typescript
import * as testlib from '../src/validate.ts'
import * as testreqs from '../src/requests.ts'
```
If using your own fulfillment, make sure to import your app as well
```typescript
import * as your-app-here from '../your-app-here'
```

Use the library functions to generate a SYNC request to pass in as a parameter to your SYNC intent handler
```typescript
describe.only('Sync response testing suite', () => { 
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync);
  ...
  });
});
```

Call the validation function in the test. This takes in two parameters: requestSync and the responseSync. This will indicate to the validation function that SYNC is being called and will validate further
SYNC intent against the current SYNC JSON Schema. 
```typescript
describe.only('Sync response testing suite', () => {
  \\ Generating SYNC Requests and Responses 
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync);
  
  \\ Validating the SYNC response 
  test('Sync Response using actions an intent handler', async () =>{
    const testlibValid = testlib.validate(requestSync, responseSync);
    expect(testlibValid).toBe(undefined);
    });
  });
});
```

If the response shows no errors, `testlibValid` will return undefined. If there are errors, the function will return an array of errors. 

## Contributing

Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).

## Disclaimer

**This is not an officially supported Google product.**