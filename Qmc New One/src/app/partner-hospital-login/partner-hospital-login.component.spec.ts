import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerHospitalLoginComponent } from './partner-hospital-login.component';

describe('PartnerHospitalLoginComponent', () => {
  let component: PartnerHospitalLoginComponent;
  let fixture: ComponentFixture<PartnerHospitalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerHospitalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerHospitalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
