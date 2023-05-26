import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallDetailComponent } from './firewall-detail.component';

describe('FirewallDetailComponent', () => {
  let component: FirewallDetailComponent;
  let fixture: ComponentFixture<FirewallDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirewallDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirewallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
