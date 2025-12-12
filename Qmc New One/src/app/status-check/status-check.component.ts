import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.scss'],
})
export class StatusCheckComponent implements OnInit {
  passportNo: any = '';
  visaNo: any = '';
  loadingStatus: any = false;
  passportnumber: any;

  customerCareNo: any = {
    Dhaka: '+880 9666 777 101',
    Sylhet: '+880 9666 777 101',
    Colombo: '+94 117942999',
    Manila: '+632 85282554',
    Kathmandu: '+977 15970029',
    Delhi: '+91 44 61331333',
    Mumbai: '+91 44 61331333',
    Kolkata: '+91 44 61331333',
    Hyderbad: '+91 44 61331333',
    Chennai: '+91 44 61331333',
    Lucknow: '+91 44 61331333',
    Kerala: '+91 44 61331333',
    Kochi: '+91 44 61331333',
    Islamabad: '+92 51 8439384',
    Karachi: '+92 51 8439384',
  };
  statusData: any;
  //   statusData:any=
  //   {
  //     "applicantstatus": "Report Pending with Authorities",
  //     "patientnumber": "202022610",
  //     "visanumber": "15201112012",
  //     "gender": "Female",
  //     "patientid": 221415,
  //     "registrationdate": "2023-01-19 15:17",
  //     "location": "Delhi",
  //     "fullname": "UAT Appointment02R27-UATserver-Delhi",
  //     "passportnumber": "Y76422314",
  //     "lastactiontime": null,
  //     "certificationdate": null
  // };
  aFormGroup!: FormGroup;
  @ViewChild('captchaElem')
  captchaElem!: ReCaptcha2Component;
  @ViewChild('langInput')
  langInput!: ElementRef;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang: any;
  public type!: 'image' | 'audio';
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  constructor(
    private formBuilder: FormBuilder,
    private restApi: ApiServiceService
  ) {}
  handleSuccess(data: any) {
    console.log(data);
  }
  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      visa_number: ['', Validators.required],
      passport_number: ['', Validators.required],
    });
  }
  statusCheckClick() {
    this.loadingStatus = true;
    console.log(this.aFormGroup.value);
    if (this.aFormGroup.invalid) {
      return;
    }
    // var data = {
    //   visa_number: this.visaNo,
    //   passport_number: this.passportNo,
    //   recaptcha: this.aFormGroup.value.recaptcha,
    // };
    this.restApi.statusCheck(this.aFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
        this.passportnumber = this.aFormGroup.value.passport_number;
        // data={"applicantstatus":"Medical Report Pending","patientnumber":"202027037","visanumber":"20210604000002","gender":"Male","patientid":218057,"qsysCode":"REPORT_PENDING","registrationdate":"2021-06-04","location":"Colombo","fullname":"Lab Repeat","passportnumber":"202011260002","lastactiontime":"2021-06-04 19:16:51","certificationdate":"2021-06-04"};
        // data={"message":"Sorry, requested visa is expired / Cancelled, Please request the applicant to contact his/her sponsor for further assistance"};
        this.aFormGroup.reset();

        this.loadingStatus = false;
        if (data.message == 'success') {
          this.statusData = data;
          window.scrollTo(0, 665);
        } else {
          this.loadingStatus = false;
          swal.fire('Alert', data.message, 'warning');
        }

        // if(data['intCode']==200){

        //   if(data['response']['userFields'].length==0){
        //     var options: any = {
        //       title: "Ready to Setup Vault",
        //       text: " 1. Setup User Fields -  Select and add the PII Data Types maintained in your customer records.\n 2. Save Customer Records in Vault - Choose “Add new user” ->  Capture customer PII data  for the user fields configured  in Step 1- > Save to your Vault",
        //       icon: "success",
        //       buttons: true,
        //       dangerMode: true,
        //     }
        //     swal(options)
        //       .then((e:any) => {

        //       });
        //   }
        // }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', error.message, 'error');
        this.loadingStatus = false;
        delete this.visaNo;
        delete this.passportNo;
        // this.errorMsgPopup(error)
      }
    );
  }
  // errorMsgPopup(e){
  //   var errorText =  !e.error.strMessage&&e.status==0?'Your Network Connection Faild':e.error.strMessage;
  //  var options: any = {

  //    text: errorText,
  //    icon: "warning",
  //    button: true,
  //    dangerMode: true,
  //  }
  //  swal(options)
  //    .then((e) => {
  //      if (e) {
  //       this.loadingStatus=false;
  //       this.router.navigate(['/login'], { replaceUrl: true });

  //      } else {
  //        this.loadingStatus=false;
  //      }
  //    });
  // }
  fieldVaild: any = false;
  errorVisaMsg: any = '';
  errorPassMsg: any = '';
  numberOnly(event: any, e: any) {
    this.fieldVaild = false;
    if (e == 'passport') {
      this.passportNo = this.passportNo.replace(/[^a-zA-Z0-9 ]/g, '');

      if (event.target.value.length == 0) {
        this.errorPassMsg = 'Passport is required';
        return;
      }
      if (event.target.value.length < 8) {
        this.errorPassMsg = 'Minimum length 8';
        return;
      }
      if (event.target.value.length > 9) {
        this.errorPassMsg = 'Maximum length 9';
        return;
      }
      this.errorPassMsg = '';
    }
    if (e == 'visa') {
      this.visaNo = this.visaNo.replace(/[^a-zA-Z0-9 ]/g, '');

      if (event.target.value.length == 0) {
        this.errorVisaMsg = 'Visa is required';
        return;
      }
      if (event.target.value.length < 8) {
        this.errorVisaMsg = 'Minimum length 8';
        return;
      }
      // if(event.target.value.length>9){
      //   this.errorVisaMsg = 'Maximum length ';
      //   return;
      // }
      this.errorVisaMsg = '';
    }
    if (this.passportNo && this.visaNo) {
      if (this.errorVisaMsg == '' && this.errorPassMsg == '') {
        this.fieldVaild = true;
      } else {
        this.fieldVaild = false;
      }
    }
  }

  getCustomerCare(code: any) {
    return this.customerCareNo[code];
  }
}
