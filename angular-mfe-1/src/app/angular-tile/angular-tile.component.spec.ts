import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTileComponent } from './angular-tile.component';

describe('AngularTileComponent', () => {
    let component: AngularTileComponent;
    let fixture: ComponentFixture<AngularTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AngularTileComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AngularTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
