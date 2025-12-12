import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
// import { ReCaptchaService } from 'angular-recaptcha3';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Timepipe } from './TimeFormatPipe';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { error } from 'console';
@Component({
  selector: 'app-appointment-login',
  templateUrl: './appointment-login.component.html',
  styleUrls: ['./appointment-login.component.scss'],
  providers: [DatePipe],
})
export class AppointmentLoginComponent implements OnInit {
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
  windowWidth: any = window.innerWidth < 600 ? window.innerWidth : '1100';
  lang: any;
  stricky: any = false;
  isShow = true;
  model2: any;
  visavalidation: boolean = true;
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  loginform!: FormGroup;
  booking: boolean = true;
  history: boolean = false;
  applicantdata: any = {};
  userdetail: any = {};
  applicantdetailpage: boolean = false;
  appointmenthistorydata: any = [];
  slotgroup: any = [];
  showslotgroup: any[] = [];
  startslotindex: any;
  endslotindex: any;
  selectedslot: any;
  Slottime: any[] = [];
  selectedslottimeitem: any;
  Bookedslots: any;
  referralDetails: any;
  bsConfig?: Partial<BsDatepickerConfig>;
  fromhistory: boolean = false;
  historyitem: any;
  OTPvalue: any;
  checkotp: boolean = true;
  selecteddayindex: any;
  country: any;
  tempVar: any;


  constructor(
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public router: Router,
    config: NgbPopoverConfig,
    private translate: TranslateService,
    private language: LanguageService,
    public datepipe: DatePipe,
    private apiservice: ApiServiceService,
    private spinner: NgxSpinnerService,
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

  // ngOnInit(): void {
  //   this.loginform = this.formBuilder.group({
  //     visa_number: ['', Validators.required],
  //     passport_number: ['', Validators.required],
  //     // dob: ['', Validators.required],
  //     recaptcha: ['', Validators.required],


      

  //   });


  ngOnInit(): void {

   this.loginform = this.formBuilder.group({
      visa_number: ['', Validators.required],
      passport_number: ['', Validators.required],
      // dob: ['', Validators.required],
      recaptcha: ['', Validators.required],})


   


    this.route.queryParams.subscribe((params) => {
      console.log(params, this.language.language);
    });
  }

getuserdetailss() {
  if (this.loginform.invalid) {
    alert('Please fill in the form correctly.');
    return;
  }
// this.spinner.show()
  const data = {
    visa_number: this.loginform.value.visa_number,
    passport_number: this.loginform.value.passport_number,
  };

  this.apiservice.appointmentlog(data).subscribe(
    (res) => {
      if (res.status === 1) {
        this.applicantdata = res.result;
        sessionStorage.setItem('visa_number', this.loginform.value.visa_number); 
        sessionStorage.setItem('data', JSON.stringify(res.data));
        this.apiservice.token = res.token;
        this.router.navigate(['/appointmentdetails']);
        localStorage.removeItem('cancelData')
        this.toastr.success('Login Successfully...');
      } else {
        // this.spinner.hide()
        alert(res.message);
      }
    },
    (error) => {
      console.error('API error: ', error);
      
      alert('An error occurred while processing your request.');
    }
  );
}

  logout() {
    this.applicantdetailpage = false;
    this.loginform.reset();
  }
  openOTPmodel() {
    this.modalService.open(this.OTPModel, { backdrop: 'static' });
  }

  submitOTP() {
    if (this.OTPvalue) {
      var obj = {
        mobile: this.applicantdata.contactMobile,
        otp: this.OTPvalue,
      };
      this.apiservice.checkOTP(obj).subscribe((res: any) => {
        if (res && res.message && res.message.status == 'Verified') {
          this.closeModel();
          this.checkotp = true;
          this.applicantdetailpage = true;
        } else {
          this.checkotp = false;
          this.applicantdetailpage = false;
        }
      });
    } else {
      this.checkotp = false;
      this.applicantdetailpage = false;
    }
  }

  resubmitOTP() {
    this.checkotp = true;
  }

  getuserDetail() {
    var reason: any = [];
    var referralAction: any = [];
    this.applicantdata.referralDetails.forEach((element: any) => {
      reason.push(element.referral);
      referralAction.push(element.referralAction);
    });
    var userDetaildata = {
      qvcCode: this.applicantdata.qvcCode,
      reason: reason,
      actions: referralAction,
      contact: this.applicantdata.contactMobile,
    };
    // var res = {"message":"Userdetail","userDetails":{"isMultiple":true,"reason":{"_id":"5f60b47236e6656b2eb822ca","reasonName":"Multiple"},"action":[{"_id":"5f60b5db36e6656b2eb822cc","actionName":"Collect Referral Letter"},{"_id":"5f60b5b936e6656b2eb822cb","actionName":"Additional Xray Required"}],"medicalCenter":{"_id":"5fbb67a8d4fc5b2b2efc9748","customercare":[],"name":"kochi","description":"kochi","addressDetails":{"countryId":{"_id":"5fbb5b9e248d1265edad4739","name":"india","createdAt":"2020-11-23T06:50:06.796Z","updatedAt":"2020-11-23T06:50:06.796Z","__v":0},"cityId":{"_id":"5fbb5fa4248d1265edad4742","cityName":"kochi","countryId":"5fbb5b9e248d1265edad4739","timeZoneName":"Asia/Kolkata","createdAt":"2020-11-23T07:07:16.990Z","updatedAt":"2020-11-23T07:07:16.990Z","__v":0},"address":"National Building  Pearl Star, Ground Floor  Edappally Raghavan Pillai Rd, Devankulangara, Mamangalam,  Ernakulam, Kerala","zipCode":"682024"},"businessId":"5fbb6331d4fc5b2b2efc973e","qvcCode":"KO","createdAt":"2020-11-23T07:41:28.835Z","updatedAt":"2021-10-19T12:22:18.434Z","__v":0},"actualReasons":[{"_id":"5f60b33536e6656b2eb822c8","reasonName":"Additional X-Ray"},{"_id":"5f60b2eb36e6656b2eb822c6","reasonName":"Additional Lab Test"},{"_id":"5f60b2d836e6656b2eb822c5","reasonName":"Lab Confirmatory"},{"_id":"5f60b22736e6656b2eb822c4","reasonName":"External Speciality"}]}}
    // this.userdetail = res.userDetails;
    // this.getslotgroup();
    // this.openOTPmodel();
    this.apiservice.userDetail(userDetaildata).subscribe((res: any) => {
      this.userdetail = res.userDetails;
      this.getslotgroup();
      this.openOTPmodel();
    });
  }

  getslotgroup(historyitem?: any) {
    if (historyitem) {
      var date: any = new Date(historyitem.referralDetails[0].Nextactiondate);
    } else {
      var nextActionDate: any =
        this.applicantdata.referralDetails[0].nextActionDate.split('-');
      nextActionDate =
        nextActionDate[2] + '-' + nextActionDate[1] + '-' + nextActionDate[0];
      var date: any = new Date(nextActionDate);
    }

    date = this.datepipe.transform(date, 'yyyy-MM-dd');
    var data = {
      fromDate: date,
      medicalCenterId: this.userdetail.medicalCenter._id,
    };
    this.apiservice.getslotdetails(data).subscribe((res: any) => {
      this.slotgroup = res.slotGroup;
      this.showslotgroup = [];
      for (let group = 0; group < 7; group++) {
        this.showslotgroup.push(this.slotgroup[group]);
      }
      this.startslotindex = 0;
      this.endslotindex = 6;
    });
  }

  openModal(index: any) {
    if (this.slotgroup.length == 0) {
      this.modalService.open(this.slotsempty, {
        centered: true,
        backdrop: 'static',
      });
    } else {
      if (this.fromhistory == true) {
        this.referralDetails =
          this.appointmenthistorydata[index].referralDetails[0];
      } else {
        this.referralDetails = this.applicantdata.referralDetails[index];
      }
      this.selectedslot = this.slotgroup[0];
      if (this.fromhistory == true) {
        this.modalService.open(this.availableslot, {
          centered: true,
          size: 'xl',
          backdrop: 'static',
        });
      } else {
        if (this.applicantdata.referralDetails[index].disablereferral == true) {
          this.modalService.open(this.unavailableslot, {
            centered: true,
            backdrop: 'static',
          });
        } else {
          this.modalService.open(this.availableslot, {
            centered: true,
            size: 'xl',
            backdrop: 'static',
          });
        }
      }
      this.getslotgroupdetails(this.slotgroup[0]);
    }
  }

  slotbydates(position: any) {
    if (position == 'right') {
      this.startslotindex = this.startslotindex + 1;
      this.endslotindex = this.endslotindex + 1;
      if (this.slotgroup[this.endslotindex]) {
        this.showslotgroup.shift();
        this.showslotgroup.push(this.slotgroup[this.endslotindex]);
      }

      if (this.slotgroup.length > this.selecteddayindex + 1) {
        this.getslotgroupdetails(this.slotgroup[this.selecteddayindex + 1]);
      } else {
        this.getslotgroupdetails(this.slotgroup[0]);
      }
    } else if (position == 'left') {
      this.startslotindex = this.startslotindex - 1;
      this.endslotindex = this.endslotindex - 1;
      if (this.slotgroup[this.startslotindex]) {
        this.showslotgroup.pop();
        this.showslotgroup.splice(0, 0, this.slotgroup[this.startslotindex]);
      }

      if (this.slotgroup.length > this.selecteddayindex - 1) {
        if (this.slotgroup[this.selecteddayindex - 1]) {
          this.getslotgroupdetails(this.slotgroup[this.selecteddayindex - 1]);
        } else {
          this.getslotgroupdetails(this.slotgroup[this.slotgroup.length - 1]);
        }
      } else {
        this.getslotgroupdetails(this.slotgroup[0]);
      }
    }
  }

  selectedslotitem(item: any) {
    return this.selectedslot && this.selectedslot._id === item._id;
  }

  getslotgroupdetails(slotgroup: any) {
    this.selectedslot = slotgroup;
    this.referralDetails;
    if (this.fromhistory == true) {
      var reason = this.userdetail.actualReasons.find(
        (a: any) => a.reasonName == this.referralDetails.Referral
      );
      var action = this.userdetail.action.find(
        (a: any) => a.actionName == this.referralDetails.ReferralAction
      );
    } else {
      var reason = this.userdetail.actualReasons.find(
        (a: any) => a.reasonName == this.referralDetails.referral
      );
      var action = this.userdetail.action.find(
        (a: any) => a.actionName == this.referralDetails.referralAction
      );
    }
    var data = {
      isMultiple: false,
      reasonForAppointment: reason._id,
      actionRequired: [action._id],
      slotGroup: slotgroup._id,
    };
    this.apiservice.getSlotByUserDetail(data).subscribe((res: any) => {
      this.Slottime = res.slots;
    });
  }

  selectedlottimeitem(item: any) {
    return (
      this.selectedslottimeitem && this.selectedslottimeitem._id === item._id
    );
  }

  selectslottime(slot: any) {
    this.selectedslottimeitem = slot;
  }

  Bookappointment() {
    // var dob=new Date(this.applicantdata.dob);
    var dob: any = this.applicantdata.dob.split('-');
    this.applicantdata.dob = dob[2] + '-' + dob[1] + '-' + dob[0];

    if (this.referralDetails.nextActionDate) {
      var nextActionDate: any = this.referralDetails.nextActionDate.split('-');
      this.referralDetails.nextActionDate =
        nextActionDate[2] + '-' + nextActionDate[1] + '-' + nextActionDate[0];
    }

    var data = {
      visa_ref_no: this.applicantdata.visaApplicationNumber,
      passport_no: this.applicantdata.passportNumber,
      fullName: this.applicantdata.fullName,
      gender: this.applicantdata.gender,
      date_of_birth: new Date(this.applicantdata.dob),
      appointmentDate: this.selectedslottimeitem.date,
      country: this.slotgroup[0].country,
      city: this.slotgroup[0].city,
      medicalCenter: {
        medicalCenterId: this.userdetail.medicalCenter._id,
        medicalCenterName: this.userdetail.medicalCenter.name,
        medicalCenterAddress:
          this.userdetail.medicalCenter.addressDetails.address,
        zipCode: this.userdetail.medicalCenter.addressDetails.zipCode,
        customerCare: this.userdetail.medicalCenter.customercare,
      },
      appt_reason: this.userdetail.reason._id,
      actionRequired: [this.userdetail.action[0]._id],
      slotId: this.selectedslottimeitem._id,
      referralDetails: [
        {
          Nextactiondate: this.referralDetails.nextActionDate
            ? new Date(this.referralDetails.nextActionDate)
            : null,
          Referral: this.referralDetails.referral,
          ReferralAction: [this.referralDetails.referralAction],
          Referralid: +this.referralDetails.referralId,
        },
      ],
      email: this.applicantdata.emailId,
      phone: this.applicantdata.contactMobile,
      visaType: 'Work Visa',
    };
    this.apiservice.Bookappointtment(data).subscribe(
      (res: any) => {
        if (res.message == 'Appointment Created') {
          this.Bookedslots = res.result;
          this.getappointmenthistory();
          this.appointmentbookedpopup();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  appointmentbookedpopup() {
    this.modalService.open(this.slotbooked, { centered: true });
  }

  closeModel() {
    // this.selectedslot = null;
    this.startslotindex = null;
    this.endslotindex = null;
    this.modalService.dismissAll();
  }

  cancelAppointment(history: any) {
    var appointmentDate = this.datepipe.transform(
      history.appointmentDate,
      'MMM dd yyyy'
    );
    var message =
      'You have chosen to cancel your appointment selected for ' +
      appointmentDate +
      ' from ' +
      history.slotId.starttime +
      ' - ' +
      history.slotId.endtime +
      ' .Once cancelled, The appointment cannot be restored. Please confirm to proceed with the cancellation';
    Swal.fire({
      html:
        "<h2 class='swal2-title'>" +
        'Are you sure?' +
        '</h2> ' +
        '<br>' +
        "<div class='swal2-content'>" +
        message +
        '</div>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Do Not Cancel',
      confirmButtonText: 'Confirm',
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        var appointmentID = history._id;
        this.apiservice
          .cancelAppointment(appointmentID)
          .subscribe((res: any) => {
            if (res.status == true) {
              this.getappointmenthistory();
            }
          });
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  rescheduleAppointment(history: any, index: any) {
    var appointmentDate = this.datepipe.transform(
      history.appointmentDate,
      'MMM dd yyyy'
    );
    var message =
      'You have chosen to reshedule your appointment selected for ' +
      appointmentDate +
      ' from ' +
      history.slotId.starttime +
      ' - ' +
      history.slotId.endtime +
      ' .Once resheduled, the appointment cannot be restored. Please confirm to proceed with rescheduling.';
    Swal.fire({
      html:
        "<h2 class='swal2-title'>" +
        'Are you sure?' +
        '</h2> ' +
        '<br>' +
        "<div class='swal2-content'>" +
        message +
        '</div>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Do Not Reschedule',
      confirmButtonText: 'Confirm',
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        this.fromhistory = true;
        this.historyitem = history;
        this.getslotgroup(history);
        this.openModal(index);
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  reschedule() {
    var appointmentID = this.historyitem._id;
    var data = {
      appointmentDate: this.selectedslottimeitem.date,
      slotId: this.selectedslottimeitem._id,
      visaType: 'Work Visa',
      callCenter: true,
    };
    this.apiservice
      .rescheduleAppointment(appointmentID, data)
      .subscribe((res) => {
        this.fromhistory = false;
        this.historyitem = {};
        this.closeModel();
        this.getappointmenthistory();
      });
  }

  downloadappointmentfromhistory(history: any) {
    var appointmentDate = this.datepipe.transform(
      history.appointmentDate,
      'MMM dd yyyy'
    );
    var appointmentDay = this.datepipe.transform(
      history.appointmentDate,
      'EEEE'
    );
    var data = {
      actionRequired: history.actionRequired[0].actionName,
      address: history.medicalCenter.medicalCenterAddress,
      applicantName: history.fullName,
      callCenterNumber: history.medicalCenter.customerCare[0]
        ? history.medicalCenter.customerCare[0]
        : '',
      contact: history.phone,
      date: appointmentDate,
      day: appointmentDay,
      passportNumber: history.passport_no,
      reasonForAppointment: history.appt_reason.reasonName,
      time: history.slotId.starttime + ' to ' + history.slotId.endtime,
      visaRefrenceNumber: history.visa_ref_no,
      // "visaType": "Work Visa"
    };
    this.apiservice.downloadAppointment(data).subscribe(
      (res) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(res);
        // let data = new Blob([res], { type: 'application/pdf,' });
        downloadLink.setAttribute('download', 'Appointment.pdf');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getappointmenthistory() {
    var dob = this.datepipe.transform(this.loginform.value.dob, 'yyyy-MM-dd');
    var data = {
      visa_ref_no: this.loginform.value.visanumber,
      passport_no: this.loginform.value.passport,
      date_of_birth: dob,
    };
    // var res = {"status":true,"appointmentHistory":[{"_id":"61fb63492202b8039a3e2708","actionRequired":[{"_id":"5f60b5db36e6656b2eb822cc","actionName":"Collect Referral Letter"}],"callCenter":false,"status":"booked","visa_ref_no":"92022020101","passport_no":"Y76422314","fullName":"Test Appointment01","email":"test@test.com","phone":"8526905346","gender":"Male","date_of_birth":"1990-07-14T00:00:00.000Z","appointmentDate":"2022-02-05T00:00:00.000Z","country":{"countryId":"5fbb5b9e248d1265edad4739","countryName":"india"},"city":{"cityId":"5fbb5f2f248d1265edad4740","cityName":"chennai"},"medicalCenter":{"medicalCenterId":"5fbb670cd4fc5b2b2efc9745","medicalCenterName":"Chennai","medicalCenterAddress":"No. 136, Shyalama Towers, 1st Floor, Arcot Road, Vadapalani, Chennai.","zipCode":"600093","customerCare":["+91-4461331333"]},"appt_reason":{"_id":"5f60b2eb36e6656b2eb822c6","reasonName":"Additional Lab Test"},"referralDetails":[{"ReferralAction":["Collect Referral Letter"],"_id":"61fb63492202b8039a3e2709","Nextactiondate":"2022-02-03T00:00:00.000Z","Referral":"Additional Lab Test","Referralid":47327}],"slotId":{"_id":"61d936974c2059038f6702c2","serviceCategory":{"actionRequired":["5f60b5db36e6656b2eb822cc","5f60b60d36e6656b2eb822ce"],"reasonForAppointment":"5f60b2eb36e6656b2eb822c6"},"consumedCount":1,"isAvailable":true,"starttime":"14:00","endtime":"14:30","availableLimit":7,"templateId":"61d7e269de4bb703d6679baf","date":"2022-02-05T00:00:00.000Z","slotGroup":"61d936964c2059038f66f70f","__v":0,"createdAt":"2022-01-08T07:00:40.077Z","updatedAt":"2022-02-03T05:08:25.865Z"},"createdAt":"2022-02-03T05:08:25.857Z","updatedAt":"2022-02-03T05:08:25.857Z","__v":0},{"_id":"61fb68ed2202b8039a3e2710","actionRequired":[{"_id":"5f60b5b936e6656b2eb822cb","actionName":"Additional Xray Required"}],"callCenter":false,"visa_ref_no":"92022020101","passport_no":"Y76422314","fullName":"Test Appointment01","email":"test@test.com","phone":"8526905346","gender":"Male","date_of_birth":"1990-07-14T00:00:00.000Z","appointmentDate":"2022-02-05T00:00:00.000Z","country":{"countryId":"5fbb5b9e248d1265edad4739","countryName":"india"},"city":{"cityId":"5fbb5f2f248d1265edad4740","cityName":"chennai"},"medicalCenter":{"medicalCenterId":"5fbb670cd4fc5b2b2efc9745","medicalCenterName":"Chennai","medicalCenterAddress":"No. 136, Shyalama Towers, 1st Floor, Arcot Road, Vadapalani, Chennai.","zipCode":"600093","customerCare":["+91-4461331333"]},"appt_reason":{"_id":"5f60b33536e6656b2eb822c8","reasonName":"Additional X-Ray"},"referralDetails":[{"ReferralAction":["Additional Xray Required"],"_id":"61fa7a50273a662bf5d0b51e","Nextactiondate":"2022-02-03T00:00:00.000Z","Referral":"Additional X-Ray","Referralid":47324}],"appointmentId":"61fa7a50273a662bf5d0b51d","slotId":{"_id":"61d936974c2059038f67029c","serviceCategory":{"actionRequired":["5f60b5b936e6656b2eb822cb"],"reasonForAppointment":"5f60b33536e6656b2eb822c8"},"consumedCount":0,"isAvailable":true,"starttime":"14:00","endtime":"14:30","availableLimit":7,"templateId":"61d7e269de4bb703d6679baf","date":"2022-02-05T00:00:00.000Z","slotGroup":"61d936964c2059038f66f70f","__v":0,"createdAt":"2022-01-08T07:00:40.076Z","updatedAt":"2022-02-03T05:32:29.569Z"},"status":"cancelled","appointmentCreated":"2022-02-02T12:34:24.386Z","appointmentUpdated":"2022-02-03T05:32:29.350Z","createdAt":"2022-02-03T05:32:29.555Z","updatedAt":"2022-02-03T05:32:29.555Z","__v":0},{"_id":"61fb68a32202b8039a3e270e","actionRequired":[{"_id":"5f60b5db36e6656b2eb822cc","actionName":"Collect Referral Letter"}],"callCenter":false,"visa_ref_no":"92022020101","passport_no":"Y76422314","fullName":"Test Appointment01","email":"test@test.com","phone":"8526905346","gender":"Male","date_of_birth":"1990-07-14T00:00:00.000Z","appointmentDate":"2022-02-05T00:00:00.000Z","country":{"countryId":"5fbb5b9e248d1265edad4739","countryName":"india"},"city":{"cityId":"5fbb5f2f248d1265edad4740","cityName":"chennai"},"medicalCenter":{"medicalCenterId":"5fbb670cd4fc5b2b2efc9745","medicalCenterName":"Chennai","medicalCenterAddress":"No. 136, Shyalama Towers, 1st Floor, Arcot Road, Vadapalani, Chennai.","zipCode":"600093","customerCare":["+91-4461331333"]},"appt_reason":{"_id":"5f60b22736e6656b2eb822c4","reasonName":"External Speciality"},"referralDetails":[{"ReferralAction":["Collect Referral Letter"],"_id":"61fa7f15273a662bf5d0b524","Nextactiondate":"2022-02-03T00:00:00.000Z","Referral":"External Speciality","Referralid":47326}],"appointmentId":"61fa7f15273a662bf5d0b523","slotId":{"_id":"61d936974c2059038f6702e1","serviceCategory":{"actionRequired":["5f60b5db36e6656b2eb822cc","5f60b60d36e6656b2eb822ce"],"reasonForAppointment":"5f60b22736e6656b2eb822c4"},"consumedCount":0,"isAvailable":true,"starttime":"10:00","endtime":"10:30","availableLimit":7,"templateId":"61d7e269de4bb703d6679baf","date":"2022-02-05T00:00:00.000Z","slotGroup":"61d936964c2059038f66f70f","__v":0,"createdAt":"2022-01-08T07:00:40.078Z","updatedAt":"2022-02-03T05:31:15.626Z"},"status":"cancelled","appointmentCreated":"2022-02-02T12:54:45.660Z","appointmentUpdated":"2022-02-03T05:31:15.404Z","createdAt":"2022-02-03T05:31:15.609Z","updatedAt":"2022-02-03T05:31:15.609Z","__v":0},{"_id":"61fa8779273a662bf5d0b526","actionRequired":[{"_id":"5f60b5db36e6656b2eb822cc","actionName":"Collect Referral Letter"}],"callCenter":false,"visa_ref_no":"92022020101","passport_no":"Y76422314","fullName":"Test Appointment01","email":"test@test.com","phone":"8526905346","gender":"Male","date_of_birth":"1990-07-14T00:00:00.000Z","appointmentDate":"2022-02-05T00:00:00.000Z","country":{"countryId":"5fbb5b9e248d1265edad4739","countryName":"india"},"city":{"cityId":"5fbb5f2f248d1265edad4740","cityName":"chennai"},"medicalCenter":{"medicalCenterId":"5fbb670cd4fc5b2b2efc9745","medicalCenterName":"Chennai","medicalCenterAddress":"No. 136, Shyalama Towers, 1st Floor, Arcot Road, Vadapalani, Chennai.","zipCode":"600093","customerCare":["+91-4461331333"]},"appt_reason":{"_id":"5f60b2d836e6656b2eb822c5","reasonName":"Lab Confirmatory"},"referralDetails":[{"ReferralAction":["Collect Referral Letter"],"_id":"61fa7cc0273a662bf5d0b521","Nextactiondate":"2022-02-03T00:00:00.000Z","Referral":"Lab Confirmatory","Referralid":47325}],"appointmentId":"61fa7cc0273a662bf5d0b520","slotId":{"_id":"61d936974c2059038f6702d4","serviceCategory":{"actionRequired":["5f60b5db36e6656b2eb822cc","5f60b5ec36e6656b2eb822cd"],"reasonForAppointment":"5f60b2d836e6656b2eb822c5"},"consumedCount":0,"isAvailable":true,"starttime":"13:30","endtime":"14:00","availableLimit":7,"templateId":"61d7e269de4bb703d6679baf","date":"2022-02-05T00:00:00.000Z","slotGroup":"61d936964c2059038f66f70f","__v":0,"createdAt":"2022-01-08T07:00:40.078Z","updatedAt":"2022-02-02T13:30:33.477Z"},"status":"cancelled","appointmentCreated":"2022-02-02T12:44:48.003Z","appointmentUpdated":"2022-02-02T13:30:33.261Z","createdAt":"2022-02-02T13:30:33.468Z","updatedAt":"2022-02-02T13:30:33.468Z","__v":0}]}
    // if (res.status == true) {
    //   this.appointmenthistorydata = res.appointmentHistory;
    //   this.appointmenthistorydata.forEach((elementhistory:any,index:any) => {
    //     if(this.appointmenthistorydata[index].referralDetails && this.appointmenthistorydata[index].referralDetails[0]){
    //       this.applicantdata.referralDetails.forEach((element:any) => {
    //         if(element.referralId == this.appointmenthistorydata[index].referralDetails[0].Referralid && elementhistory.status == 'booked'){
    //           element['disablereferral'] = true
    //         }else if(element.referralId == this.appointmenthistorydata[index].referralDetails[0].Referralid && elementhistory.status == "cancelled"){
    //           element['disablereferral'] = false
    //         }
    //       });
    //     }
    //   });
    // }
    this.apiservice.getappointmenthistory(data).subscribe((res) => {
      if (res.status == true) {
        this.appointmenthistorydata = res.appointmentHistory;
        this.appointmenthistorydata.forEach(
          (elementhistory: any, index: any) => {
            if (
              this.appointmenthistorydata[index].referralDetails &&
              this.appointmenthistorydata[index].referralDetails[0]
            ) {
              this.applicantdata.referralDetails.forEach((element: any) => {
                if (
                  element.referralId ==
                    this.appointmenthistorydata[index].referralDetails[0]
                      .Referralid &&
                  elementhistory.status == 'booked'
                ) {
                  element['disablereferral'] = true;
                } else if (
                  element.referralId ==
                    this.appointmenthistorydata[index].referralDetails[0]
                      .Referralid &&
                  elementhistory.status == 'cancelled'
                ) {
                  element['disablereferral'] = false;
                }
              });
            }
          }
        );
      }
    });
  }

  downloadappointment() {
    var appointmentDate = this.datepipe.transform(
      this.Bookedslots.appointmentDate,
      'MMM dd yyyy'
    );
    var appointmentDay = this.datepipe.transform(
      this.Bookedslots.appointmentDate,
      'EEEE'
    );
    var data = {
      actionRequired: this.Bookedslots.actionRequired[0].actionName,
      address: this.Bookedslots.medicalCenter.medicalCenterAddress,
      applicantName: this.Bookedslots.fullName,
      callCenterNumber: this.userdetail.medicalCenter.customercare[0]
        ? this.userdetail.medicalCenter.customercare[0]
        : '',
      contact: this.Bookedslots.phone,
      date: appointmentDate,
      day: appointmentDay,
      passportNumber: this.Bookedslots.passport_no,
      reasonForAppointment: this.Bookedslots.appt_reason.reasonName,
      time:
        this.Bookedslots.slotId.starttime +
        ' to ' +
        this.Bookedslots.slotId.endtime,
      visaRefrenceNumber: this.Bookedslots.visa_ref_no,
      visaType: 'Work Visa',
    };
    this.apiservice.downloadAppointment(data).subscribe(
      (res) => {
        var blob = new Blob([res], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Appointment.pdf';
        link.click();
        this.closeModel();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.documentElement.scrollTop > 500) {
      this.stricky = true;
    } else {
      this.stricky = false;
    }
  }

  onCaptchaResponse(event: any) {
    console.log(event);
  }

  isNumberKey(evt: any) {
    let initalValue = evt.target.value;
    const newValue = initalValue.replace(/[^0-9]*/g, '');
    if (newValue !== initalValue) {
      this.visavalidation = false;
    } else {
      this.visavalidation = true;
    }
  }

  passportvalidation(evt: any) {
    let initalValue = evt.keyCode;
    if (
      (initalValue > 64 && initalValue < 91) ||
      (initalValue > 96 && initalValue < 123) ||
      initalValue == 8 ||
      (initalValue >= 48 && initalValue <= 57)
    ) {
      return true;
    } else {
      return false;
    }
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  tabchange(type: string) {
    if (type == 'booking') {
      this.booking = true;
      this.history = false;
      this.fromhistory = false;
    } else if (type == 'history') {
      this.booking = false;
      this.history = true;
      this.fromhistory = true;
      this.getappointmenthistory();
      this.getslotgroup();
    }
  }
}
