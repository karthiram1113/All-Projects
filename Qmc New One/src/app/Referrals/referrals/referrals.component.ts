import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {

  lang:any;
  constructor() {
    this.lang =localStorage.getItem('language') ;
  }

  ngOnInit(): void {
  }

}
