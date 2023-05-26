import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlanComponent } from './wlan.component';

describe('WlanComponent', () => {
  let component: WlanComponent;
  let fixture: ComponentFixture<WlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
