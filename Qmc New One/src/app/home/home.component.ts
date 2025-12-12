import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbPopoverConfig, NgbModalConfig, NgbModal], // add NgbPopoverConfig to the component providers
})
export class HomeComponent implements OnInit, AfterViewInit {
  lang: any;
  country: any;
  @ViewChild('content')
  content!: NgbModalConfig;
  @ViewChild('success')
  success!: NgbModalConfig;
  windowWidth: any = window.innerWidth < 600 ? window.innerWidth : '1100';
  enablepopup: any;
  changeText: boolean = false;
  mapaddressdetails: any;
  countrycenterarray: any = [
    {
      countryname: 'India',
      centeraddress: [
        {
          cityname: 'MUMBAI',
          cityaddress:
            'Hallmark Business Plaza, 2nd floor, Opposite Gurunanak Hospital, Bandra East Mumbai.',
        },
        {
          cityname: 'Delhi',
          cityaddress:
            'Delhi - Unit no. 2, Lower Ground Floor, Parsvnath Mall, Akshardham Metro Station, Akshardham, New Delhi - 110092.',
        },
        {
          cityname: 'KOLKATA',
          cityaddress:
            'BIPL Building Gamma, First Floor, Bengal Intelligent Park, Block EP & GP, Plot A2 & M2, Sector V Salt Lake Electronic Complex, Bidhan Nagar, Kolkata-700 091.',
        },
        {
          cityname: 'HYDERABAD',
          cityaddress:
            'Krishe Sapphire, Ground Floor, Hitech City Rd, Vittal Rao Nagar, Madhapur, Hyderabad, Telangana 500081.',
        },
        {
          cityname: 'CHENNAI',
          cityaddress:
            'No. 136, Shyalama Towers, 1st Floor, Arcot Road, Vadapalani, Chennai.',
        },
        {
          cityname: 'LUCKNOW',
          cityaddress:
            '2nd floor, BBD Viraj Tower, Vibhuti Khand,Gomti Nagar, Lucknow.',
        },
        {
          cityname: 'Kochi',
          cityaddress:
            'National Building, Pearl Star, Ground Floor, Edappally Raghavan Pillai Rd, Devankulangara, Mamangalam, Ernakulam, Kerala.',
        },
      ],
    },
    {
      countryname: 'Bangladesh',
      centeraddress: [
        {
          cityname: 'Dhaka',
          cityaddress:
            'Rupayan Trade Center at 114, Kazi Nazrul Islam Avenue (11th Floor), Bangla Motor, Ramna, Dhaka-1000, Bangladesh.',
        },
        {
          cityname: 'Sylhet',
          cityaddress:
            'Garden Tower, 2nd Floor, Sahajalal Bridge,Link Road, PS : Kotwali,Sylhet - 3100, Bangladesh.',
        },
      ],
    },
    {
      countryname: 'Pakistan',
      centeraddress: [
        {
          cityname: 'Islamabad',
          cityaddress:
            'Gerry’s Building, 1-A, I & T Center, G-6, Islamabad, Pakistan.',
        },
        {
          cityname: 'Karachi',
          cityaddress:
            'Bahria Complex IV, 4th Floor, Main Chaudhary Khaliq UZ Zaman Road, Gizri Road, Clifton area Navy Housing Society, Karachi, Pakistan.',
        },
      ],
    },
    {
      countryname: 'Sri Lanka',
      centeraddress: [
        {
          cityname: 'Colombo',
          cityaddress:
            'No.475 /3, Sentra Super City, Sri Jayawardenepura MW, Rajagiriya, Kotte, Sri Lanka.',
        },
      ],
    },
    {
      countryname: 'Philippines',
      centeraddress: [
        {
          cityname: 'Manila',
          cityaddress:
            'Unit 106, NU mall of Asia Building, Coral Way st., MOA complex, Pasay City, Manila, Philippines.',
        },
      ],
    },
    {
      countryname: 'Nepal',
      centeraddress: [
        {
          cityname: 'Kathmandu',
          cityaddress: 'Ward no. 4 Maharajgunj Chakrapath Kathmandu Nepal.',
        },
      ],
    },
  ];
  staticmapdetails: any = [
    {
      place: 'Lucknow ',
      cssclass: 'lucknow',
      address1: 'Qatar Medical Center	,',
      address2: 'BBD Viraj Towers, 2nd Floor, TCG/1,',
      address3: ' A-V/3 ,Vibhuti Khand,',
      address4: 'Shaheed Path, Gomti Nagar,',
      address5: 'Lucknow,UP – 226010',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Kolkata',
      cssclass: 'Kolkata',
      address1: 'Qatar Medical Center	,',
      address2: 'Bengal Intelligence Park, Building Gamma Building C ,',
      address3: '1st Floor Block EP GP Sector - V ,',
      address4: 'Salt Lake Electronics Complex North 24 Parganas,',
      address5: 'Kolkata – 700091',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Kochi',
      cssclass: 'Kochi',
      address1: 'Qatar Medical Center	,',
      address2: 'National Pearl Star Building ,',
      address3: 'Door number 38/4111 /D,',
      address4: 'Ground Floor New Changamapuzha Park Edapally,',
      address5: 'Kochi – 682024',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'New Delhi',
      cssclass: 'new-delhi',
      address1: 'Qatar Medical Center	,',
      address2: 'Unit. No. 2, Lower Ground Floor,',
      address3: 'Parsvnath Mall, Akshardham Metro Station,',
      address4: 'Akshardham,',
      address5: 'New Delhi - 110092',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Hyderabad',
      cssclass: 'Hyderabad',
      address1: 'Qatar Medical Center	,',
      address2: 'No. 88, Krishe Sapphire,',
      address3:
        'Ground Floor Hitech city main road, Madhapur Serilingam Palli Mandal ,',
      address4: 'Rangareddy District Hyderabad ,',
      address5: 'Telangana- 500081',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Mumbai',
      cssclass: 'Mumbai',
      address1: 'Qatar Medical Center,',
      address2: '02nd Floor, Iconic Building,',
      address3: 'Urmi Estate, 95,',
      address4: 'Ganpatrao Kadam Marg, Lower Parel,',
      address5: 'Mumbai - 400013',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Chennai',
      cssclass: 'Chennai',
      address1: 'Qatar Medical Center	,',
      address2: 'No 136, Shyamala Towers,',
      address3: '1st Floor  Arcot Road ,',
      address4: 'Saligramam,',
      address5: 'Chennai – 600093',
      Phnumber: '+91 44 6133 1333',
    },
    {
      place: 'Colombo, Srilanka',
      cssclass: 'Colombo',
      address1: 'Qatar Medical Center	,',
      address2: '2nd floor, No 475/3 Sentra Super city,',
      address3: 'Sri Jayewardenepura MW Rajagiriya Kotte ,',
      address4: 'Colombo ,',
      address5: 'Srilanka -10100',
      Phnumber: '+94117942999',
    },
    {
      place: 'Karachi, Pakistan',
      cssclass: 'Karachi',
      address1: 'Qatar Medical Center	,',
      address2: 'Bahria Complex 4 ,Navy Housing society,',
      address3: 'Clifton Area,',
      address4: 'Karachi,',
      address5: 'Pakistan',
      Phnumber: '+92 51 8439384',
    },
    {
      place: 'Islamabad, Pakistan',
      cssclass: 'Islamabad',
      address1: 'Qatar Medical Center	,',
      address2: 'Gerry’s Building ,',
      address3: '1-A I &T Center G-6,',
      address4: 'Islamabad ,',
      address5: 'Pakistan',
      Phnumber: '+92 51 8439384',
    },
    {
      place: 'Dhaka, Bangladesh',
      cssclass: 'Dhaka',
      address1: 'Qatar Medical Center,',
      address2: 'Rupayan Trade Center- 11th Floor,',
      address3: '114 Kazi Nazrul Islam Avenue ,',
      address4: 'Bangla Motor,',
      address5: 'Dhaka -1000',
      Phnumber: '+880 9666 777 101',
    },
    {
      place: 'Philippines',
      cssclass: 'Philippines',
      address1: 'Qatar Medical Center, ',
      address2: 'UNIT 105,',
      address3: 'National University "NU" Tower,',
      address4: 'Coral Way St. Mall of Asia Complex ,',
      address5: 'Pasay City-1300',
      Phnumber: '+63 285282554',
    },
    {
      place: 'Nepal ',
      cssclass: 'Nepal',
      address1: 'Qatar Medical Center,',
      address2: 'Chakrapath,',
      address3: 'Kathmandu,',
      address4: 'Ward No. 4,',
      address5: 'Postal Code- 44600',
      Phnumber: '+977 1 5970029',
    },
    {
      place: 'Sylhet ',
      cssclass: 'Sylhet',
      address1: 'Qatar Medical Center,',
      address2: 'Garden Tower, 2nd Floor,',
      address3: 'Sahajalal Bridge,Link Road,',
      address4: 'PS : Kotwali,Sylhet-3100',
      address5: 'Bangladesh',
      Phnumber: '+8801711920152',
    },
  ];
  activemaplocation: any;
  centeraddress: any = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    config: NgbPopoverConfig,
    private translate: TranslateService,
    private language: LanguageService,
    private modalService: NgbModal
  ) {
    // customize default values of popovers used by this component tree
    config.placement = 'right';
    config.triggers = 'hover';
    // this.language.languageChange.subscribe((props) => {
    //   console.log("language", props);
    //   this.lang = props;
    //   // this.translate.use(props);
    // });
    this.lang = localStorage.getItem('language');
    if (localStorage.getItem('language') == 'ur') {
      document.body.style.direction = 'rtl';
    } else {
      document.body.style.direction = 'ltr';
    }
  }
  ngAfterViewInit() {
    // this.openModal();
  }
  openModal() {
    this.router.navigateByUrl('/appointmentlogin');
    // this.modalService.open(this.content, {
    //   centered: true,
    //   backdrop: "static",
    //   keyboard: false,
    // });
  }
  // openSuccessModel(){
  //   this.modalService.open(this.success, { centered: true });
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params, this.language.language);
      this.translate.use(this.language.language);
    });
    this.country = localStorage.getItem('country');

    this.countrycenterarray.forEach((element: any) => {
      if (element.countryname == this.country) {
        this.centeraddress = element.centeraddress;
      }
    });
    this.centeraddress.forEach((element: any) => {
      element.cityname = 'contactPage.contentTitle.' + element.cityname;
      element.cityaddress = 'contactPage.contentText.' + element.cityaddress;
    });
  }
  modalClose() {
    this.router.navigateByUrl('/book-referral-appointment');
  }

  locationdeatils(mapaddress: any) {
    var classname: any = document.getElementsByClassName('popupvisible');
    var classnameactive: any = document.getElementsByClassName('active');
    classname[0]?.classList?.remove('popupvisible');
    classnameactive[1]?.classList?.remove('active');
    this.mapaddressdetails = mapaddress;
    this.enablepopup = true;
    this.activemaplocation = mapaddress;

    setTimeout(() => {
      var data: any = document.getElementById(mapaddress.place);
      data.classList.add('active');
      data.parentNode.children[2].classList.add('popupvisible');
    }, 100);
  }

  closepopup(mapaddress: any) {
    this.enablepopup = false;
    var data: any = document.getElementById(mapaddress.place);
    data.classList.remove('active');
    data.parentNode.children[2].classList.remove('popupvisible');
  }
  hidefloat(eleClass:any){
      var btnHide: any = document.getElementsByClassName("out-btn");
      btnHide[0].style.setProperty('display', 'none');
      var btnShow: any = document.getElementsByClassName("in-btn");
      btnShow[0].style.setProperty('display', 'block');
      var ele: any = document.getElementById("floater-container");
      ele.style.setProperty('right', '-350px');
  }
  showfloat(eleClass:any){
      var btnHide: any = document.getElementsByClassName("in-btn");
      btnHide[0].style.setProperty('display', 'none');
      var btnShow: any = document.getElementsByClassName("out-btn");
      btnShow[0].style.setProperty('display', 'block');
      var ele: any = document.getElementById("floater-container");
      ele.style.setProperty('right', '0px');
  }
}
