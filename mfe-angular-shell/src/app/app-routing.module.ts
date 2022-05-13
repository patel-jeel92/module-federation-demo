import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Your route here:

  // Local usage
  // {
  //   path: 'flights',
  //   loadChildren: () => {
  //     return loadRemoteModule({
  //       remoteEntry: URL,
  //       remoteName: 'mfe1',
  //       exposedModule: './Module'
  //     })
  //     .then(m => m.FlightsModule) }
  // },

  // {
  //   path: 'flights',
  //   loadChildren: () => {
  //     return loadRemoteModule({
  //       remoteEntry:
  //         'https://brave-glacier-0ffc18c10.azurestaticapps.net/remoteEntry.js',
  //       remoteName: 'mfe1',
  //       exposedModule: './Module',
  //     }).then((m) => m.FlightsModule);
  //   },
  // },

  {
    path: 'user',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:3005/remoteEntry.js',
      remoteName: 'user',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },

  {
    path: 'cart',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:8080/remoteEntry.js',
      remoteName: 'cart',
      exposedModule: './web-components',
      elementName: 'cart-element',
    } as WebComponentWrapperOptions,
  },

  {
    path: 'angular',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      remoteName: 'angular1',
      exposedModule: './web-components',
      elementName: 'angular1-element',
    } as WebComponentWrapperOptions,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
