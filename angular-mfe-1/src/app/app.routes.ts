import { Routes } from '@angular/router';
import { AngularTileComponent } from './angular-tile/angular-tile.component';
import StaticAngularComponent from './static-angular/static-angular.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'parent', pathMatch: 'full' },
  {
    path: 'parent',
    loadChildren: () =>
      import('./parent/parent.module').then((m) => m.ParentModule),
  },
  { path: 'angular-tile', component: AngularTileComponent, pathMatch: 'full' },
  {
    path: 'static-angular',
    component: StaticAngularComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/parent', pathMatch: 'full' },
];
