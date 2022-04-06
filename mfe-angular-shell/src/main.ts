import { loadRemoteEntry } from '@angular-architects/module-federation';

Promise.all([
  // loadRemoteEntry({
  //   type: 'module',
  //   remoteEntry: 'http://localhost:3005/remoteEntry.js',
  // }),
  // loadRemoteEntry({
  //   type: 'module',
  //   remoteEntry: 'http://localhost:3006/remoteEntry.js',
  // }),
  loadRemoteEntry({
    type: 'module',
    remoteEntry: 'http://localhost:3007/remoteEntry.js',
  }),
])
  .catch((err) => console.error('Error loading remote entries', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
