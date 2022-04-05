import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'angular',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:3001/remoteEntry.js',
        remoteName: 'remote1',
        exposedModule: './ParentModule',
      }).then((m) => m.ParentModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        remoteName: 'product',
        exposedModule: './App',
      }).then((m) => m.App),
  },
  {
    path: 'users',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:3003/remoteEntry.js',
        remoteName: 'user',
        exposedModule: './App',
      }).then((m) => m.App),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
