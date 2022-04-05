import { Routes } from '@angular/router';
import { ParentComponent } from './parent.component';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';

export const TILE_ROUTES: Routes = [
    { path: '', component: ParentComponent, pathMatch: 'full' },
    { path: 'child-one', component: ChildOneComponent, pathMatch: 'full' },
    { path: 'child-two', component: ChildTwoComponent, pathMatch: 'full' },
    // { path: '**', redirectTo: './', pathMatch: 'full' },
];