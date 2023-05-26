import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticRoutesComponent } from './static-routes.component';

describe('StaticRoutesComponent', () => {
  let component: StaticRoutesComponent;
  let fixture: ComponentFixture<StaticRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
