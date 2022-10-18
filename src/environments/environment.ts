// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://localhost:3000/',
  apiKey: "b6ygeKqVRAPS15HLfBkaNvpDZ7Z2",
  apiUrl: "https://crud-with-test-default-rtdb.firebaseio.com",
  firebaseConfig : {
    apiKey: "AIzaSyB0d1yZHcNlPgHknF4qbNpBqkLaYucTO1I",
    authDomain: "crud-with-test.firebaseapp.com",
    projectId: "crud-with-test",
    storageBucket: "crud-with-test.appspot.com",
    messagingSenderId: "425846567822",
    appId: "1:425846567822:web:32af0911e2c4119b40aadf",
    measurementId: "G-9EE8SS52PK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// npm install -g firebase-tools