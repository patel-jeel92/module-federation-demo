import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { ParentComponent } from './parent.component';
import { TILE_ROUTES } from './parent.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TILE_ROUTES)],
  declarations: [ParentComponent, ChildOneComponent, ChildTwoComponent],
})
export default class ParentModule {}
