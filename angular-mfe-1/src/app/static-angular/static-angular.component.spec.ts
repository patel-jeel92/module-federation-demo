import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticAngularComponent } from './static-angular.component';

describe('StaticAngularComponent', () => {
  let component: StaticAngularComponent;
  let fixture: ComponentFixture<StaticAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaticAngularComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
