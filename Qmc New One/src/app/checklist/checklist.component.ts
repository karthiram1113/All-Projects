import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  country:any;
  constructor(private language: LanguageService) { }

  ngOnInit(): void {
    this.country=this.language.selectedCountry;
  }

}
