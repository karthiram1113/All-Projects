import {
  Component, OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
// import { ReCaptchaService } from 'angular-recaptcha3';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
// import { Timepipe } from './TimeFormatPipe';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { error } from 'console';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.scss',
  providers: [DatePipe],

})
export class AppointmentViewComponent {
  responseData: any;
  showSpinner: boolean = false;
  cdr: any;
  gethospitalreferrals: any;

  resheduleAppointments() {
    throw new Error('Method not implemented.');
  }
  cancelApt: any;


  selectedItem: any;
  selectedApt: any;
  viewDetails(_t97: any) {
    throw new Error('Method not implemented.');
  }
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
  data: any;
  item: any;
  activeTab: string = 'center';

  constructor(

    public route: ActivatedRoute,
    private toastr: ToastrService,
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

  triggerChangeDetection() {
    this.cdr.detectChanges();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  ngOnInit() {
    this.loadDataFromLocalStorage();
    this.onButtonClick();
    this.gethospitalreferrals();

  }




  loadDataFromLocalStorage(): void {
    const storedData = localStorage.getItem('viewData');
    if (storedData) {
      this.data = JSON.parse(storedData);
    }
    console.log(storedData, 'storedDatastoredData');

  }
  selectedAppointmentDetails(selectedApt: any) {
    this.selectedApt = selectedApt;
    console.log(selectedApt);
  }


  onButtonClick(): void {
    const visa_number = sessionStorage.getItem('visa_number');
    if (!visa_number) {
      alert('No visa number found in session storage.');
      return;
    }
    const params = { visa_number: visa_number };
    // const params = { visa_number: '987856745654' };

    this.apiservice.appointmentHistory(params).subscribe({
      next: (response) => {
        this.responseData = response;

        this.responseData = response.hospital;
        console.log('API response:', response);
        console.log('Hospital data:', response.hospital);

        console.log('API response API response API response:', response.hospital);
        localStorage.setItem('viewData', JSON.stringify(response.data));
        this.loadDataFromLocalStorage();
        localStorage.removeItem('cancelData')
      },
      error: (err) => {
        this.spinner.hide()
        console.error('API call error:', err);
      }
    });
  }
  cancelAppointments(cancelApt: any) {
    this.cancelApt = cancelApt;
    console.log();

    localStorage.setItem('cancelData', JSON.stringify(cancelApt));
    console.log('cancelAppointments called with data:', this.cancelApt);
  }



  cancelApp() {
    console.log('cancelApp called');

    const visa_number = sessionStorage.getItem('visa_number');

    if (!this.cancelApt) {
      console.error('No appointment data available');
      return;
    }
    this.spinner.show();
    const data = {
      id: this.cancelApt.id,
      booking_status: 2,
      visa_number: visa_number,
      date_booked: this.cancelApt.date_booked,
      booked_time: this.cancelApt.booked_time,
    };

    this.apiservice.appointmentcancel(data).subscribe({
      next: (response) => {
        console.log(response,'responseresponse');
        
        this.toastr.success(response.message)
        console.log('Appointment cancelled successfully', response);
        this.onButtonClick();
        this.spinner.hide();
      },
      error: (error) => {

        console.error('Error cancelled appointment', error);
        this.spinner.hide();
      }
    });
  }

  resheduleApp() {
    if (!this.cancelApt) {
      console.error('No appointment data available');
      return;
    }

    // Show spinner
    this.showSpinner = true;

    this.router.navigate(['/appointmentnew']).then(() => {
      this.showSpinner = false;
    });
  }

  appointmentHistoryTab(val: any) {
    this.activeTab = val;
  }


}

