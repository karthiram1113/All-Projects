import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FaqsComponent } from '../faqs/faqs.component';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  // providers: [NgbModalConfig, NgbModal]
})
export class NavComponent implements OnInit {
  // @ViewChild('content') content:NgbModalConfig;
  @ViewChild('content')
  content!: NgbModalConfig;
  @Input() item: boolean = false;
  lang: any;
  country: any;
  stricky: any = false;
  partnerhospitalityicon: boolean = true;
  partnerLoginShow: boolean = true;
  partnerLogoutShow: boolean = false;
  disableBtn: boolean = true;
  constructor(
    public faqsComponent: FaqsComponent,
    public route: ActivatedRoute,
    public router: Router,
    private translate: TranslateService,
    private language: LanguageService,
    private modalService: NgbModal,
    private apiservice: ApiServiceService
  ) {
    this.partnerLogoutShow = this.apiservice.getUserPartnerIn();

    console.log(this.language.language);
    // this.language.languageChange.subscribe(props => {
    //   console.log("language", props);
    //   this.lang= 'props'
    //   this.translate.use(props);
    // })
    const queryParams = window.location.pathname;
    let queryParamsArr = queryParams.split('/');
    const pageTittle = queryParamsArr[1];
    console.log(pageTittle);
    if (pageTittle == 'partnerhospitallogin') {
      this.partnerLoginShow = false;
    } else {
      this.partnerLoginShow = true;
    }

    // if (localStorage.getItem("login") == "true") {
    //   this.partnerLogoutShow = true;
    // } else {
    //   this.partnerLogoutShow = false;
    // }
    if (localStorage.getItem('URL') == 'https://qatarmedicalcenter.com/') {
      this.partnerhospitalityicon = false;
    } else {
      this.partnerhospitalityicon = true;
    }
    document.documentElement.scrollTop = 0;
    this.translate.use('en');
    this.country = localStorage.getItem('country');
  }
  openModal() {
    this.router.navigateByUrl('/appointmentlogin');
  }

  openpartnerhospitallogin() {
    this.router.navigateByUrl('/partnerhospitallogin');
  }

  ngOnInit(): void {
    console.log(this.partnerLogoutShow);

    this.route.queryParams.subscribe((params: any) => {
      console.log(params, this.language.language);
      // if(params.state=='false'){
      //   this.lang='en';

      // }else{
      //   this.lang=this.language.language
      // }
      this.translate.use(this.language.language);
    });
  }
  isShow = true;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    // console.log(event);
    if (document.documentElement.scrollTop > 200) {
      this.stricky = true;
    } else {
      this.stricky = false;
    }
  }
  modalClose() {
    this.router.navigateByUrl('/book-referral-appointment');
  }
  partnerhospitallogout() {
    this.item = false;
    this.router.navigateByUrl('/home');
  }
  gotofaqpage(type: any) {
    this.router.navigateByUrl('/faqs');
    setTimeout(() => {
      this.faqsComponent.goToBottom(type);
    }, 200);
  }
}
function partnerLogoutShow() {
  throw new Error('Function not implemented.');
}
