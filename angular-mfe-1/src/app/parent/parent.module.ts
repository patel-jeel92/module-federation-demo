import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent.component';
import { RouterModule } from '@angular/router';
import { TILE_ROUTES } from './parent.routes';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TILE_ROUTES)
    ],
    declarations: [
        ParentComponent,
        ChildOneComponent,
        ChildTwoComponent
    ]
})
export class ParentModule { }
