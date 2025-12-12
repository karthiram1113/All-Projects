import { Component,OnInit,
  ViewChild,
  AfterViewInit,
  HostListener, } from '@angular/core';
  import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
  import { LanguageService } from '../services/language.service';
  import { TranslateService } from '@ngx-translate/core';
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ApiServiceService } from '../services/api-service.service';
  import { NgxSpinnerService } from 'ngx-spinner';
  // import { ReCaptchaService } from 'angular-recaptcha3';
  import Swal from 'sweetalert2';
  import { DatePipe } from '@angular/common';
  // import { Timepipe } from './TimeFormatPipe';
  import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
  // import { error } from 'console';


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
  providers: [DatePipe],
})
export class AppointmentDetailsComponent {
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
  responseData: any;
  data: any;
  showNewAppointmentButton = true;

  constructor(
    private spinner : NgxSpinnerService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public router: Router,
    config: NgbPopoverConfig,
    private translate: TranslateService,
    private language: LanguageService,
    public datepipe: DatePipe,
    private apiservice: ApiServiceService
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
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit(){
    this.loadDataFromLocalStorage();

    const storedDataLogin = sessionStorage.getItem('data');
  
  if (storedDataLogin) {
    const response = JSON.parse(storedDataLogin); 
    this.data = response.data || [];  
  } else {
    this.data = [];  
  }

  this.showNewAppointmentButton = this.data.map((item: { specialityData: { booking_status: boolean; }; }) => item.specialityData.booking_status === false);

  console.log(this.data, 'Data loaded from sessionStorage');
  console.log(this.showNewAppointmentButton, 'Show New Appointment Button Flag');
  
  if (this.data && this.data.length > 0) {
    this.data.forEach((item: { specialityData: { booking_status: any; }; }, index: any) => {
      console.log(`Index ${index}: booking_status = ${item.specialityData.booking_status}`);
    });
  } else {
    console.log('No data available.');
  }
    
 }



 loadDataFromLocalStorage(): void {
   const storedData = localStorage.getItem('viewData');
   if (storedData) {
     this.data = JSON.parse(storedData);
   }
 } 
  // appointmenthistorydatas:any[]=[];
  onButtonClick(): void {
    const visa_number = sessionStorage.getItem('visa_number');
    if (!visa_number) {
      alert('No visa number found in session storage.');
      return;
    }
    this.spinner.show()
    const params = { visa_number: visa_number }; 
    // const params = { visa_number: '987856745654' }; 
    console.log(params);

    this.apiservice.appointmentHistory(params).subscribe({
      next: (response) => {
        
        this.responseData = response;
        console.log('API response:', response);
      
        localStorage.setItem('viewData',JSON.stringify(response.data));
        this.loadDataFromLocalStorage();
        this.spinner.hide()
        this.router.navigate(['/appointmentview']);
      },
      error: (err) => {
        console.error('API call error:', err);
        this.spinner.hide()
        alert('Server is Busy')
      
      }
    });
  }
 
  openSp(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      },3000)
  }
}
