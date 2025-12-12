import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  langState: any = false;
  languageList: any = [
    {
      lang: 'Nepali',
      code: 'ne',
      nativeLang: 'नेपाली',
      countryList: [{ natCountry: 'नेपाल', engCountry: 'Nepal' }],
    },
    {
      lang: 'Bengali',
      code: 'bn',
      nativeLang: 'বাংলা',
      countryList: [
        { natCountry: 'ভারত', engCountry: 'India' },
        { natCountry: 'বাংলাদেশ', engCountry: 'Bangladesh' },
      ],
    },
    {
      lang: 'Urdu',
      code: 'ur',
      nativeLang: 'اُردُو‎',
      countryList: [
        { natCountry: 'بھارت', engCountry: 'India' },
        { natCountry: 'پاکستان', engCountry: 'Pakistan' },
      ],
    },
    {
      lang: 'Tamil',
      code: 'ta',
      nativeLang: 'தமிழ்',
      countryList: [
        { natCountry: 'இந்தியா', engCountry: 'India' },
        { natCountry: 'இலங்கை', engCountry: 'Sri Lanka' },
      ],
    },
    {
      lang: 'Hindi',
      code: 'hi',
      nativeLang: 'हिन्दी',
      countryList: [{ natCountry: 'भारत', engCountry: 'India' }],
    },
    {
      lang: 'Malayalam',
      code: 'ml',
      nativeLang: 'മലയാളം',
      countryList: [{ natCountry: 'ഇന്ത്യ', engCountry: 'India' }],
    },
    {
      lang: 'Sinhala',
      code: 'si',
      nativeLang: 'සිංහල‎',
      countryList: [{ natCountry: 'ශ්‍රී ලංකාව', engCountry: 'Sri Lanka' }],
    },
    {
      lang: 'English',
      code: 'en',
      nativeLang: 'English',
      countryList: [
        { natCountry: 'Bangladesh', engCountry: 'Bangladesh' },
        { natCountry: 'India', engCountry: 'India' },
        { natCountry: 'Nepal', engCountry: 'Nepal' },
        { natCountry: 'Pakistan', engCountry: 'Pakistan' },
        { natCountry: 'Philippines', engCountry: 'Philippines' },
        { natCountry: 'Sri Lanka', engCountry: 'Sri Lanka' },
      ],
    },
    // {"lang":"Arabic","code":"ar","nativeLang":"عَرَبِيّ","countryList":[{"natCountry":"بنغلاديش","engCountry":"Bangladesh"},{"natCountry":"الهند","engCountry":"India"},{"natCountry":"نيبال","engCountry":"Nepal"},{"natCountry":"باكستان","engCountry":"Pakistan"},{"natCountry":"الفلبين","engCountry":"Philippines"},{"natCountry":"سيريلانكا","engCountry":"Sri Lanka"}]},
    {
      lang: 'Marathi',
      code: 'mr',
      nativeLang: 'मराठी',
      countryList: [{ natCountry: 'भारत', engCountry: 'India' }],
    },
    {
      lang: 'Telugu ',
      code: 'te',
      nativeLang: 'తెలుగు',
      countryList: [{ natCountry: 'భారతదేశం', engCountry: 'India' }],
    },
    {
      lang: 'Filipino',
      code: 'fil',
      nativeLang: 'Filipino',
      countryList: [{ natCountry: 'Pilipinas', engCountry: 'Philippines' }],
    },
  ];
  constructor(
    public router: Router,
    private translate: TranslateService,
    private languageChange: LanguageService
  ) {
    this.translate.addLangs(['en', 'fil']);
    this.translate.setDefaultLang('en');
    localStorage.clear();
    document.body.style.direction = 'ltr';
    localStorage.setItem('URL', window.location.href);
  }

  //function to open modal
  openModalFunction(){

  }

  //function to close modal
  closeModalPopup(){
    let popupEle = <HTMLElement>document.getElementById('landingpagePopup');
    popupEle.style.display = 'none';
  }

  ngOnInit(): void {
    this.onChangeLanguage({ target: { value: 'en' } });
    this.openModalFunction();
  }
  countryList: any;
  pageLocation(e: any) {
    this.languageChange.selectCountry(e.target.value);
    localStorage.setItem('country', e.target.value);
    if (localStorage.getItem('language') == 'ur') {
      document.body.style.direction = 'rtl';
    } else {
      document.body.style.direction = 'ltr';
    }

    this.router.navigate(['/home']);
  }
  // nxtLanguage: any = 'English';
  onChangeLanguage(e: any) {
    // let langKey;
    console.log(e);
    let idx = this.languageList.findIndex(
      (ele: any) => ele.code == e.target.value
    );
    if (idx > -1) {
      this.countryList = this.languageList[idx].countryList;
    }

    localStorage.setItem('language', e.target.value);
    this.languageChange.changeLanguage(e.target.value);
    // this.nxtLanguage = 'French';
  }
}
