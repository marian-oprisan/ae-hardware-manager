// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDIq77_qlV8s2L-Bgne906GbvVTbcsgOpE',
    authDomain: 'ae-hardware.firebaseapp.com',
    databaseURL: 'https://ae-hardware.firebaseio.com',
    projectId: 'ae-hardware',
    storageBucket: 'ae-hardware.appspot.com',
    messagingSenderId: '71089251306'
  }
};
