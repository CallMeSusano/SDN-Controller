import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesWlanComponent } from './interfaces-wlan.component';

describe('InterfacesWlanComponent', () => {
  let component: InterfacesWlanComponent;
  let fixture: ComponentFixture<InterfacesWlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacesWlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacesWlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
