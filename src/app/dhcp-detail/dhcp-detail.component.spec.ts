import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhcpDetailComponent } from './dhcp-detail.component';

describe('DhcpDetailComponent', () => {
  let component: DhcpDetailComponent;
  let fixture: ComponentFixture<DhcpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhcpDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhcpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
