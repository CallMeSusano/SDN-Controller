import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesBridgeComponent } from './interfaces-bridge.component';

describe('InterfacesBridgeComponent', () => {
  let component: InterfacesBridgeComponent;
  let fixture: ComponentFixture<InterfacesBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacesBridgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacesBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
