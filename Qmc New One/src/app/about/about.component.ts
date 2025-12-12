import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  windowWidth:any=window.innerWidth<600?window.innerWidth:'1100';
  country:any;
  lang: any;
  mapaddressdetails: any;
  activemaplocation: any;
  enablepopup: any;
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
    }, {
      place: 'Kolkata',
      cssclass: 'Kolkata',
      address1: 'Qatar Medical Center	,',
      address2: 'Bengal Intelligence Park, Building Gamma Building C ,',
      address3: '1st Floor Block EP GP Sector - V ,',
      address4: 'Salt Lake Electronics Complex North 24 Parganas,',
      address5: 'Kolkata – 700091',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'Kochi',
      cssclass: 'Kochi',
      address1: 'Qatar Medical Center	,',
      address2: 'National Pearl Star Building ,',
      address3: 'Door number 38/4111 /D,',
      address4: 'Ground Floor New Changamapuzha Park Edapally,',
      address5: 'Kochi – 682024',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'New Delhi',
      cssclass: "new-delhi",
      address1: 'Qatar Medical Center	,',
      address2: 'Unit. No. 2, Lower Ground Floor,',
      address3: 'Parsvnath Mall, Akshardham Metro Station,',
      address4: 'Akshardham,',
      address5: 'New Delhi - 110092',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'Hyderabad',
      cssclass: 'Hyderabad',
      address1: 'Qatar Medical Center	,',
      address2: 'No. 88, Krishe Sapphire,',
      address3: 'Ground Floor Hitech city main road, Madhapur Serilingam Palli Mandal ,',
      address4: 'Rangareddy District Hyderabad ,',
      address5: 'Telangana- 500081',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'Mumbai',
      cssclass: 'Mumbai',
      address1: 'Qatar Medical Center,',
      address2: '02nd Floor, Iconic Building,',
      address3: 'Urmi Estate, 95,',
      address4: 'Ganpatrao Kadam Marg, Lower Parel,',
      address5: 'Mumbai - 400013',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'Chennai',
      cssclass: 'Chennai',
      address1: 'Qatar Medical Center	,',
      address2: 'No 136, Shyamala Towers,',
      address3: '1st Floor  Arcot Road ,',
      address4: 'Saligramam,',
      address5: 'Chennai – 600093',
      Phnumber: '+91 44 6133 1333',
    }, {
      place: 'Colombo, Srilanka',
      cssclass: 'Colombo',
      address1: 'Qatar Medical Center	,',
      address2: '2nd floor, No 475/3 Sentra Super city,',
      address3: 'Sri Jayewardenepura MW Rajagiriya Kotte ,',
      address4: 'Colombo ,',
      address5: 'Srilanka -10100',
      Phnumber: '+94117942999',
    }, {
      place: 'Karachi, Pakistan',
      cssclass: 'Karachi',
      address1: 'Qatar Medical Center	,',
      address2: 'Bahria Complex 4 ,Navy Housing society,',
      address3: 'Clifton Area,',
      address4: 'Karachi,',
      address5: 'Pakistan',
      Phnumber: '+92 51 8439384'
    }, {
      place: 'Islamabad, Pakistan',
      cssclass: 'Islamabad',
      address1: 'Qatar Medical Center	,',
      address2: 'Gerry’s Building ,',
      address3: '1-A I &T Center G-6,',
      address4: 'Islamabad ,',
      address5: 'Pakistan',
      Phnumber: '+92 51 8439384'
    }, {
      place: 'Dhaka, Bangladesh',
      cssclass: 'Dhaka',
      address1: 'Qatar Medical Center,',
      address2: 'Rupayan Trade Center- 11th Floor,',
      address3: '114 Kazi Nazrul Islam Avenue ,',
      address4: 'Bangla Motor,',
      address5: 'Dhaka -1000',
      Phnumber: '+880 9666 777 101'
    }, {
      place: 'Philippines',
      cssclass: 'Philippines',
      address1: 'Qatar Medical Center, ',
      address2: 'UNIT 105,',
      address3: 'National University "NU" Tower,',
      address4: 'Coral Way St. Mall of Asia Complex ,',
      address5: 'Pasay City-1300',
      Phnumber: '+63 285282554'
    }, {
      place: 'Nepal ',
      cssclass: 'Nepal',
      address1: 'Qatar Medical Center,',
      address2: 'Chakrapath,',
      address3: 'Kathmandu,',
      address4: 'Ward No. 4,',
      address5: 'Postal Code- 44600',
      Phnumber: '+977 1 5970029'
    },

  ]
  constructor() {
    this.country=localStorage.getItem('country');
    this.lang =localStorage.getItem('language') ;
   }

  ngOnInit(): void {
  }

  locationdeatils(mapaddress: any) {
    var classname:any= document.getElementsByClassName('popupvisible');
    var classnameactive:any= document.getElementsByClassName('active');
    classname[0]?.classList?.remove('popupvisible');
    classnameactive[1]?.classList?.remove('active');
    this.mapaddressdetails = mapaddress;
    this.enablepopup = true;
    this.activemaplocation = mapaddress

    setTimeout(() => {
      var data: any = document.getElementById(mapaddress.place);
      data.classList.add('active');
      data.parentNode.children[2].classList.add('popupvisible')
    }, 100);
  }

  closepopup(mapaddress: any) {
    this.enablepopup = false;
    var data:any = document.getElementById(mapaddress.place);
    data.classList.remove('active');
    data.parentNode.children[2].classList.remove('popupvisible')
  }

}
