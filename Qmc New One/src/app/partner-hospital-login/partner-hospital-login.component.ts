import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-partner-hospital-login',
  templateUrl: './partner-hospital-login.component.html',
  styleUrls: ['./partner-hospital-login.component.scss'],
  providers: [DatePipe],
})
export class PartnerHospitalLoginComponent implements OnInit {
  @ViewChild('availableslot')
  availableslot!: NgbModalConfig;
  @ViewChild('unavailableslot')
  unavailableslot!: NgbModalConfig;
  @ViewChild('OTPModel')
  OTPModel!: NgbModalConfig;
  @ViewChild('slotbooked')
  slotbooked!: NgbModalConfig;
  @ViewChild('slotsempty')
  slotsempty!: NgbModalConfig;
  applicantdetailpage: boolean = false;
  loginform!: FormGroup;
  dropdownform!: FormGroup;
  loginpage: boolean = true;
  dropdownpage: boolean = false;
  partnerLogin: boolean = false;
  tablepage: boolean = false;
  logindetails: any;
  visanumber: any;
  popupdetails: any;
  docName: any;
  testCodeS:any = "no";
  patientId: any;
  patientIdMandatoryStatus: any = false;
  comments: any;
  countrydetails: any = [];
  citydetails: any = [];
  hospitaldetails: any = [];
  hospitalId: any;
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  token: string | undefined;
  public dataSource: any;
  public labDataSource: any;

  loadReferralTable:any = false;
  referralTabActive:any = true;
  labTabActive:any = false;
  testCodeStatus:any = false;
  File: any = '';
  uploadFileForm!: FormGroup;
  fileUploadScreen: boolean = true;
  fileUploadAdditionalScreen: boolean = true;
  submitted: boolean = false;
  lang: any;
  bsConfig?: Partial<BsDatepickerConfig>;
  country: any;
  pdfFileFormatPdfFileSize: Boolean = false;
  pdfFileFormatPdfFileRefferalType: Boolean = false;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: any[] = [
    'Visa Application No',
    'Gender',
    'Applicant Name',
    'Expected Appointment Date',
    'Referral Creation Date',
    'Test Name',
    'Type',
    'Hospital Registration Date',
    'Action',
  ];

  @ViewChild('content')
  content!: NgbModalConfig;
  @ViewChild('content1')
  content1!: NgbModalConfig;
  @ViewChild('scheduledOrdersPaginator')
  paginator!: MatPaginator;
  @ViewChild('scheduledOrdersPaginator1')
  paginator1!: MatPaginator;
  applicantData: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    public router: Router,
    private apiservice: ApiServiceService,
    private _snackBar: MatSnackBar,
    config: NgbPopoverConfig,
    private translate: TranslateService,
    private language: LanguageService
  ) {
    config.placement = 'right';
    config.triggers = 'hover';
    this.translate.use('en');
    this.language.languageChange.subscribe((props) => {
      this.lang = props;
    });
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
    this.country = localStorage.getItem('country');
  }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });

    this.dropdownform = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      hospitalname: ['', Validators.required],
    });
    this.uploadFileForm = this.formBuilder.group(
      {
        file: ['', Validators.required],
        docName: ['', Validators.required],
        comments: ['', Validators.required],
        testCodeS: [''],
        patientId: [''],
      }
    );
    this.gethospitalreferrals();
  }

  partnerhospitallogin() {
    this.loginpage = true;
  }

  async login() {
    // console.log(this.loginform.value.username, this.loginform.value.password);

    if (this.loginform.valid) {
      const formData = new FormData();
      formData.append('loginname', this.loginform.value.username);
      formData.append('password', this.loginform.value.password);
      // formData.append('loginname', "vijaya_chennai");
      // formData.append('password', "Glosys@123");
      await this.apiservice.gethospitalitytoken(formData).subscribe(
        (res) => {
          this.logindetails = res;
          if (res.access) {
            this.loginpage = false;
            this.dropdownpage = true;
            this.partnerLogin = true;
            this.getcountrydetails();
            // this.router.navigateByUrl("/upload-file");
            this.apiservice.setLoggedInPartner(true);
            localStorage.setItem('hospital-token', res.access);
            // this.apiservice.setPartnerLogoutShow(true);
          }
        },
        (error) => {
          this.spinner.hide();
          swal.fire('Error!', error.error.detail, 'error');
          this.apiservice.setLoggedInPartner(false);
          this.partnerLogin = false;
        }
      );
    } else {
      swal.fire('Error!', 'Invalid Username and Password', 'error');
      this.apiservice.setLoggedInPartner(false);
      this.partnerLogin = false;
    }
  }

  getcountrydetails() {
    this.dropdownform.controls['city'].reset();
    this.dropdownform.controls['hospitalname'].reset();
    this.citydetails = [];
    this.apiservice.getcountrydetails(this.logindetails.access).subscribe(
      (res) => {
        this.countrydetails = res.countries;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getcitydetails(event: any) {
    this.dropdownform.controls['hospitalname'].reset();
    this.hospitaldetails = [];
    var data = {
      country_id: event,
    };
    this.apiservice.getcitydetails(this.logindetails.access, data).subscribe(
      (res) => {
        this.citydetails = res.cities;
        if (this.citydetails.length == 1) {
          this.gethospitaldetails(this.citydetails[0].id);
          this.dropdownform.controls['city'].setValue(this.citydetails[0].id);
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  gethospitaldetails(event: any) {
    var data = {
      country_id: this.dropdownform.value.country,
      city_id: event,
    };
    this.apiservice
      .gethospitaldetails(this.logindetails.access, data)
      .subscribe(
        (res) => {
          this.hospitaldetails = res.hospitals;
          if (this.hospitaldetails.length == 1) {
            this.dropdownform.controls['hospitalname'].setValue(
              this.hospitaldetails[0].id
            );
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  gethospitalreferrals() {
      var data = {
        hospital_id: this.dropdownform.value.hospitalname,
      };
      this.hospitalId = this.dropdownform.value.hospitalname;
      this.apiservice
        .gethospitalreferrals(this.logindetails.access, data)
        .subscribe(
          (res) => {
            res.detail.forEach((element: any) => {
              if (element.hospital_registeration_date) {
                element.hospital_registeration_date = this.datePipe.transform(
                  element.hospital_registeration_date,
                  'YYYY-MM-dd'
                );
              }
            });
            this.hospitaldetails = res.detail;
            this.tablepage = true;
            this.dropdownpage = false;
            this.dataSource = new MatTableDataSource<any>(this.hospitaldetails);
            this.modalService.dismissAll();
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              if (this.visanumber) this.searchvisanumber();
            });
            this.loadReferralTable = true;
            this.referralTabActive = true;
            this.labTabActive = false;
          },
          (error) => {
            this.spinner.hide();
          }
        );
  }

  gethospitalLabreferrals() {
      var data = {
        hospital_id: this.dropdownform.value.hospitalname,
      };
      this.hospitalId = this.dropdownform.value.hospitalname;
      this.apiservice
        .gethospitalLabreferrals(this.logindetails.access, data)
        .subscribe(
          (res) => {
            res.detail.forEach((element: any) => {
              if (element.hospital_registeration_date) {
                element.hospital_registeration_date = this.datePipe.transform(
                  element.hospital_registeration_date,
                  'YYYY-MM-dd'
                );
              }
            });
            this.hospitaldetails = res.detail;
            this.tablepage = true;
            this.dropdownpage = false;
            this.labDataSource = new MatTableDataSource<any>(this.hospitaldetails);
            this.modalService.dismissAll();
            setTimeout(() => {
              this.labDataSource.paginator = this.paginator1;
              if (this.visanumber) this.searchvisanumber();
            });
            this.referralTabActive = false;
            this.labTabActive = true;
          },
          (error) => {
            this.spinner.hide();
          }
        );
  }



  onMatSortChange() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }
  onMatSortChanges() {
    setTimeout(() => {
      this.labDataSource.sort = this.sort;
    });
  }

  onlyNumberKey(evt: any) {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  }

  searchvisanumber() {
    var filtereddata = this.hospitaldetails.filter(
      (data: any) => data.visa_number == this.visanumber
    );
    if (filtereddata.length != 0) {
      this.dataSource = new MatTableDataSource<any>(filtereddata);
      this.labDataSource = new MatTableDataSource<any>(filtereddata);
      this.dataSource.paginator = this.paginator;
      this.labDataSource.paginator = this.paginator1;
    } else {
      this._snackBar.open('Visa Number Not Found ', '', { duration: 2000 });
      this.dataSource = new MatTableDataSource<any>(this.hospitaldetails);
      this.labDataSource = new MatTableDataSource<any>(this.hospitaldetails);
      this.dataSource.paginator = this.paginator;
      this.labDataSource.paginator = this.paginator1;
    }
  }

  clearvisanumber() {
    this.visanumber = null;
    this.dataSource = new MatTableDataSource<any>(this.hospitaldetails);
    this.labDataSource = new MatTableDataSource<any>(this.hospitaldetails);
    this.dataSource.paginator = this.paginator;
    this.labDataSource.paginator = this.paginator1;
  }

  Uploaddocument(data: any) {
    this.fileUploadScreen = true;
    this.popupdetails = data;
    // console.log("Upload popup Data init: ", data);
    if(data.test_code === "USGABDOMEN" || data.test_code === "PLAINCTCHEST" || data.test_code === "CTCHESTCECT" || data.test_code === "PLAINCT" || data.test_code === "CTCHESTHRCT" || data.test_code === "CECT"){
      this.testCodeStatus = true;
    } else {
      this.testCodeStatus = false;
    }
    this.modalService.open(this.content, { centered: true });
  }
  //tab2
  Uploadadditionaldocument(data: any) {
    this.fileUploadAdditionalScreen = true;
    this.popupdetails = data;
    if(data.test_code === "USGABDOMEN" || data.test_code === "PLAINCTCHEST" || data.test_code === "CTCHESTCECT" || data.test_code === "PLAINCT" || data.test_code === "CTCHESTHRCT" || data.test_code === "CECT"){
      this.testCodeStatus = true;
    } else {
      this.testCodeStatus = false;
    }
    this.modalService.open(this.content1, { centered: true });
  }
  setPatientIDMandatoy(ev:any){
    if(this.uploadFileForm.value.testCodeS === "yes" && (!this.uploadFileForm.value.patientId ||this.uploadFileForm.value.patientId === "")){
      this.patientIdMandatoryStatus = true;
    } else {
      this.patientIdMandatoryStatus = false;
    }
  }

  downloaddocument(data: any) {
    this.letterprintcount(data);
    window.open(data.referral_letter, '_blank');
  }
  //tab2
  downloadadditionaldocument(data: any) {
    this.letterprintcountadditional(data);
    window.open(data.referral_letter, '_blank');
  }
  onFileSelected(event: any) {
    const fileInput = event.target;
    console.log(fileInput.files[0].name);
    let fileFormat = fileInput.files[0].name;
    let fileType = fileFormat.split('.');
    console.log(fileType[fileType.length - 1]);

    if (fileType[fileType.length - 1] == 'pdf') {
      this.pdfFileFormatPdfFileSize = false;
      if (fileInput.files.length > 0) {
        if (fileInput.files[0].size > 10485760) {
          if(this.popupdetails.referral_speciality === "USG Abdomen" || this.popupdetails.referral_speciality === "Plain CT Chest" || this.popupdetails.referral_speciality === "CT Chest HRCT" || this.popupdetails.referral_speciality === "CT Chest CECT" || this.popupdetails.referral_speciality === "Plain CT abdomen" || this.popupdetails.referral_speciality === "CECT Abdomen"){
            if (fileInput.files[0].size > 512000) {
              this.pdfFileFormatPdfFileSize = true;
              this.pdfFileFormatPdfFileRefferalType = true;
              // this.uploadFileForm.reset();
              this.File = '';
            } else {
              this.pdfFileFormatPdfFileSize = false;
              this.pdfFileFormatPdfFileRefferalType = false;
              const file = fileInput.files[0];
              this.File = file;
            }
          } else {
            this.pdfFileFormatPdfFileSize = false;
            this.pdfFileFormatPdfFileRefferalType = false;
            const file = fileInput.files[0];
            this.File = file;
          }
        } else {
          this.pdfFileFormatPdfFileSize = false;
          this.pdfFileFormatPdfFileRefferalType = false;
          const file = fileInput.files[0];
          this.File = file;
        }
      }
    } else {
      this.pdfFileFormatPdfFileSize = true;
      this.pdfFileFormatPdfFileRefferalType = false;
      this.File = '';
    }
  }

  uploadFile() {
    console.log(this.File);
    this.submitted = true;
    if(this.uploadFileForm.value.testCodeS === "yes" && (!this.uploadFileForm.value.patientId || this.uploadFileForm.value.patientId === "")){
      this.patientIdMandatoryStatus = true;
    } else {
      this.patientIdMandatoryStatus = false;
    }
    if (this.File != '') {
      if (this.uploadFileForm.valid == true) {
        if(this.testCodeStatus){ this.confirmReferralSpeciality(); }
        const formData = new FormData();
        formData.append('document_name', this.uploadFileForm.value.docName);
        formData.append('comments', this.uploadFileForm.value.comments);
        formData.append('filename', this.File);
        formData.append('referral_speciality',this.popupdetails.referral_speciality);
        formData.append('hospital_id', this.hospitalId);
        this.apiservice.savedocument(formData).subscribe(
          (res) => {
            if (res.status == 1) {
              this.fileUploadScreen = false;
              this.gethospitalreferrals();
              this.docName = null;
              this.comments = null;
              this.visanumber = null;
              // swal.fire("Suceess!", res.message, "success");

              this.File == '';
              this.patientId = null;
              this.submitted = false;
              this.uploadFileForm.reset();
              // this.modalService.dismissAll();
            } else if (res.status == 2) {
              swal.fire('Info!', res.message, 'info');
            }
          },
          (error) => {
            swal.fire('Error!', error.error.detail, 'error');
            this.spinner.hide();
          }
        );
      } else {
        this._snackBar.open('Please enter the Document Name and Comments', '', {
          duration: 2000,
        });
      }
    } else {
      // this.submitted=false;
    }
  }
  //tab2

  uploadadditionalFile() {
    console.log(this.File);
    this.submitted = true;
    if(this.uploadFileForm.value.testCodeS === "yes" && (!this.uploadFileForm.value.patientId || this.uploadFileForm.value.patientId === "")){
      this.patientIdMandatoryStatus = true;
    } else {
      this.patientIdMandatoryStatus = false;
    }
    if (this.File != '') {
      if (this.uploadFileForm.valid == true) {
        if(this.testCodeStatus){ this.confirmReferralSpeciality(); }
        const formData = new FormData();
        formData.append('document_name', this.uploadFileForm.value.docName);
        formData.append('comments', this.uploadFileForm.value.comments);
        formData.append('filename', this.File);
        formData.append('referral_additional',this.popupdetails.referral_additional);
        formData.append('hospital_id', this.hospitalId);
        this.apiservice.saveadditionaldocument(formData).subscribe(
          (res) => {
            if (res.status == 1) {
              this.fileUploadAdditionalScreen = false;
              this.gethospitalLabreferrals();
              this.docName = null;
              this.comments = null;
              this.visanumber = null;
              // swal.fire("Suceess!", res.message, "success");

              this.File == '';
              this.submitted = false;
              this.uploadFileForm.reset();
              // this.modalService.dismissAll();
            } else if (res.status == 2) {
              swal.fire('Info!', res.message, 'info');
            }
          },
          (error) => {
            swal.fire('Error!', error.error.detail, 'error');
            this.spinner.hide();
          }
        );
      } else {
        this._snackBar.open('Please enter the Document Name and Comments', '', {
          duration: 2000,
        });
      }
    } else {
      // this.submitted=false;
    }
  }

  confirmReferralSpeciality(){
    let CTScanReferral:any = 0;
    if(this.uploadFileForm.value.testCodeS === "yes"){
      CTScanReferral = 1;
    }
    const confirmReferralSpecialityRequestData = {
      id: this.popupdetails.referral_speciality,
      confirm_msg: CTScanReferral,
      patient_id: this.uploadFileForm.value.patientId
    }
    this.apiservice.saveReferalSpecialityConfimation(confirmReferralSpecialityRequestData).subscribe(
      (res) => {
        this.testCodeStatus = false;
      });
  }


  modalclose() {
    this.docName = null;
    this.comments = null;
    this.visanumber = null;
    this.patientId = null;
    this.modalService.dismissAll();
  }
  //tab1
  savehospitalregistrationdate(element: any) {
    var obj = {
      referral_speciality: element.referral_speciality,
      registration_date: element.hospital_registeration_date,
    };
    this.apiservice
      .savehospitalregistrationdate(this.logindetails.access, obj)
      .subscribe(
        (res) => {
          if (res.message == 'Registration detail saved successfully') {
            this.modalService.dismissAll();
            swal.fire('Suceess!', res.message, 'success');
            this.gethospitalreferrals();
          }
        },
        (error) => {
          swal.fire('Error!', error.error.detail, 'error');
          this.spinner.hide();
        }
      );
  }

//tab2

savehospitaladditionalregistrationdate(element: any) {
  var obj = {
    referral_additional: element.referral_additional,
    registration_date: element.hospital_registeration_date,
  };
  this.apiservice
    .savehospitaladditionalregistrationdate(this.logindetails.access, obj)
    .subscribe(
      (res) => {
        if (res.message == 'Registration detail saved successfully') {
          this.modalService.dismissAll();
          swal.fire('Suceess!', res.message, 'success');
          this.gethospitalLabreferrals();
        }
      },
      (error) => {
        swal.fire('Error!', error.error.detail, 'error');
        this.spinner.hide();
      }
    );
}

  letterprintcount(element: any) {
    var obj = {
      referral_speciality: element.referral_speciality,
    };
    this.apiservice.saveprintcount(this.logindetails.access, obj).subscribe(
      (res: any) => {
        if (res.message == 'Print detail saved successfully') {
          this.gethospitalreferrals();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  letterprintcountadditional(element: any) {
    var obj = {
      referral_additional: element.referral_additional,
    };
    this.apiservice.saveprintadditionalcount(this.logindetails.access, obj).subscribe(
      (res: any) => {
        if (res.message == 'Print detail saved successfully') {
          this.gethospitalLabreferrals();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}

