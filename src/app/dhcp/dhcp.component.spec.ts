import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhcpComponent } from './dhcp.component';

describe('DhcpComponent', () => {
  let component: DhcpComponent;
  let fixture: ComponentFixture<DhcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
