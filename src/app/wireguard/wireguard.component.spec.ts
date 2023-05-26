import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireguardComponent } from './wireguard.component';

describe('WireguardComponent', () => {
  let component: WireguardComponent;
  let fixture: ComponentFixture<WireguardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireguardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
