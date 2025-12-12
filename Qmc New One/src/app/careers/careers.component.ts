import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CareersComponent implements OnInit, AfterViewInit {
  closeResult!: string;
  @ViewChild('content')
  content!: NgbModalConfig;
  @ViewChild('success')
  success!: NgbModalConfig;
  registerForm!: FormGroup;
  submitted = false;
  lang: any;
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  constructor(
    private restApi: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.lang = localStorage.getItem('language');
  }
  ngAfterViewInit() {
    this.openModal();
  }
  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
  openSuccessModel() {
    this.modalService.open(this.success, { centered: true });
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      city: [''],
      country: [''],
      plocation: ['', Validators.required],
      position: [''],
      totExperience: [''],
      relExperience: [''],
      currCTC: [''],
      ExpectCTC: [''],
      hQualification: [''],
      noticePeriod: [''],
      langProfic: [''],
      resume: ['', Validators.required],
      applicantStatement: [false, Validators.requiredTrue],
      acknowledgement: [''],
      currEmpStatus: [''],
      qatarRefer: [''],
      relativeName: [''],
      relationship: [''],
      acceptTerms: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  loadingStatus: any = false;
  onSubmit() {
    this.submitted = true;
    // this.openSuccessModel()

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loadingStatus = true;
    var formData = new FormData();
    formData.append('firstName', this.registerForm.value['fname']);
    formData.append('lastName', this.registerForm.value['lname']);
    formData.append('emailId', this.registerForm.value['email']);
    formData.append('mobileNo', this.registerForm.value['mobile']);
    formData.append('candCity', this.registerForm.value['city']);
    formData.append('country', this.registerForm.value['country']);
    formData.append('preferredLoc', this.registerForm.value['plocation']);
    formData.append('posAppFor', this.registerForm.value['position']);
    formData.append(
      'higQualfication',
      this.registerForm.value['hQualification']
    );
    formData.append('totYoe', this.registerForm.value['totExperience']);
    formData.append('relYoe', this.registerForm.value['relExperience']);
    formData.append('qatarRefer', this.registerForm.value['qatarRefer']);
    formData.append('curCTC', this.registerForm.value['currCTC']);
    formData.append('exCTC', this.registerForm.value['ExpectCTC']);
    formData.append('currEmpStatus', this.registerForm.value['currEmpStatus']);
    formData.append('noticePeriod', this.registerForm.value['noticePeriod']);
    formData.append('langProf', this.registerForm.value['']);
    formData.append('appStat1', this.registerForm.value['applicantStatement']);
    formData.append('appStat2', this.registerForm.value['acceptTerms']);
    formData.append(
      'ackAppQatMedCenter',
      this.registerForm.value['acknowledgement']
    );
    formData.append('empQatMedCenter', this.registerForm.value['']);
    formData.append('relInQatMedCenter', this.registerForm.value['']);
    formData.append('relDetName', this.registerForm.value['relativeName']);
    formData.append('relationship', this.registerForm.value['relationship']);
    formData.append('file', this.resumeFile['file']);
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    console.log(formData);
    // return;
    this.restApi.carrerSend(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.loadingStatus = false;
        this.router.navigateByUrl('/success');

        setTimeout(() => {
          this.registerForm.reset();
        }, 2000);
      },
      (error) => {
        this.loadingStatus = false;
        console.log(error);
        if (error.status == 200) {
          this.router.navigateByUrl('/success');
          setTimeout(() => {
            this.registerForm.reset();
          }, 2000);
        } else {
          swal.fire('Error!', error.message, 'error');
        }
        // this.errorMsgPopup(error)
      }
    );
  }
  fileError: any;
  resumeFile: any;
  onFileChanged(event: any) {
    let evet = event.target;
    const file: File = event.target.files[0];
    delete this.fileError;
    var state = this.fileTypeValidate(event.target);
    if (state) {
      this.resumeFile = { file: file };
    } else {
      this.fileError = 'File format not support';
    }
  }
  fileTypeValidate(control: any) {
    var forbidden = false;
    if (control.value) {
      const fileExt = control.value.split('.').pop();
      var acceptedExtensions = ['doc', 'docx', 'pdf'];
      acceptedExtensions.forEach((ext) => {
        if (ext.trim().toLowerCase() == fileExt) {
          forbidden = true;
        }
      });
      console.log(fileExt, forbidden);
      return forbidden;
    } else {
      return forbidden;
    }
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
