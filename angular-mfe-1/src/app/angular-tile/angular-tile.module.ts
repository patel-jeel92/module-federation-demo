import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularTileComponent } from './angular-tile.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AngularTileComponent
    ]
})
export class AngularTileModule { }
