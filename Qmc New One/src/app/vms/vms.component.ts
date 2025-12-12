import { Component, OnInit } from '@angular/core';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss'],
  providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class VmsComponent implements OnInit {
  lang:any;
  windowWidth:any=window.innerWidth<600?window.innerWidth:'1100';
  constructor(public route: ActivatedRoute,config: NgbPopoverConfig,private translate: TranslateService, private language: LanguageService) {
    // customize default values of popovers used by this component tree
    config.placement = 'right';
    config.triggers = 'hover';
    this.language.languageChange.subscribe(props => {
      console.log("language", props);
      this.lang = props;
      this.translate.use(props);
    })
  }
  

  ngOnInit(): void {
  }

}
