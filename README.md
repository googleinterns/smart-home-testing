# Integration Testing for Smart Home Actions  

## Testing Library for Smart Home

### The problem 
Smart home developers currently use a manual tool for testing. To solve friction in the development process, the goal is to create a way for developer's to receive more detailed information on why their errors occur.

### This solution 
The [Smart Home Integration Testing Library](https://github.com/googleinterns/smart-home-testing) introduces this solution for developers. With the enhanced logging, developers will be able to find more details about failures.
The big impact of this will be removing friction and latency from the dev cycle, which will allow the developer to successfully verify their action more efficiently.

**This repository consists of:**
- `src/` holds the library functionalities to generate intent requests and functions to validate intent API responses against the current JSON Schemas in TypeScript.
- `__tests__/` shows examples on how the library would interact with a developer's tests for each intent  
- `intents/` holds the current JSON schemas for each intent response 
- `traits/` holds the current JSON trait schemas for the on off trait, used to verify its states and attributes 

## Installation 
Use the package manager [npm](https://www.npmjs.com/) to install the packages used for the testing library 

```bash
git clone https://github.com/googleinterns/smart-home-testing.git
cd smart-home-testing
npm install
```

## Examples 
As previously stated, the tests folder contains examples on how the library would interact with a developer's tests for each intent. This section will break down a simple validation test 
further. In this example, we will be focusing on a SYNC test using the Jest framework.

Import the testing library modules in your tests
```typescript
//__tests__/example.test.ts 
import { testlib, testreqs } from './src'
```
If using your own fulfillment, make sure to import your app as well
```typescript
//__tests__/example.test.ts 
import * as your-app-here from '../your-app-here'
```

Use the library functions to generate a SYNC request to pass in as a parameter to your SYNC intent handler
```typescript
//__tests__/example.test.ts 
describe.only('Sync response testing suite', () => { 
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync);
  ...
  });
});
```

Call the validation function in the test.  
```typescript
//__tests__/example.test.ts 
describe.only('Sync response testing suite', () => {
  // Generating SYNC Requests and Responses 
  const requestSync = testreq.generateSyncRequest();
  const responseSync = fakeapp.onSync(requestSync);
  
  // Validating the SYNC response 
  test('Sync Response using actions an intent handler', async () =>{
    // This will indicate to the validation function that SYNC is being called and 
    // will validate the SYNC intent against the current SYNC JSON Schema.
    const testlibValid = testlib.validate(requestSync, responseSync);
    
    //If the response shows no errors, `testlibValid` will return undefined. 
    //If there are errors, the function will return an array of errors. 
    expect(testlibValid).toBe(undefined);
    //In this case, testlibValid returns undefined, so the test passes.
    });
  });
});
```

## Issues

### 🕷 Bugs
Please file an issue for bugs, missing documentation, or unexpected behavior on GitHub.

### ❓ Questions 
Please visit [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google), [Assistant Developer Community on Reddit](https://www.reddit.com/r/GoogleAssistantDev/) or [Support](https://developers.google.com/assistant/support)

### 🤔 Other references 
- Actions on Google [Documentation](https://developers.google.com/assistant)
- Actions on Google [Codelabs](https://codelabs.developers.google.com/?cat=Assistant).

## Contributing

Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).

## Disclaimer

**This is not an officially supported Google product.**