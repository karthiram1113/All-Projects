import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {
  NgbAccordionDirective,
  NgbAccordionItem,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  @ViewChild(NgbAccordionDirective)
  private accordion!: NgbAccordionDirective;
  @ViewChild(NgbAccordionItem)
  private accordionItem!: NgbAccordionItem;
  data = [{}];
  lang: any;
  val12: boolean = true;
  val13: boolean = true;
  englishFaqs: boolean = true;
  constructor() {
    this.lang = localStorage.getItem('language');
    if (this.lang == 'en') {
      this.englishFaqs = false;
    } else {
      this.englishFaqs = true;
    }
    let aaa: any = document.getElementsByClassName('value10');

    // aaa.innerHtml;
    console.log('aaa=' + aaa);
  }

  public ngAfterViewInit(): void {
    this.accordion.collapseAll();
    this.accordionItem.toggle();
    console.log(this.accordionItem.id); //ngb-accordion-item-0
  }
  ngOnInit(): void {}

  goToBottom(type: any) {
    if (type != 'general') {
      console.log(document.body.scrollHeight / 2);
      window.scrollTo(0, document.body.scrollHeight / 2 - 150);
    } else {
      window.scrollTo(0, 0);
    }
  }
}
