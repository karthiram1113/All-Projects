import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang = new Subject<any>();
  private country = new Subject<any>();
  languageChange = this.lang.asObservable();
  language:any='en';
  selectedCountry:any='India'
  constructor() { 
    if(localStorage.getItem('language')){
      this.language = localStorage.getItem('language')
    }else{
      this.language = 'en'
    }
  }
  changeLanguage(e:any){
    console.log('language',e);
    this.language= e;
    this.lang.next(this.language);
  }
  selectCountry(e:any){
    this.selectedCountry = e;
    this.country.next(this.selectedCountry);
  }
}
