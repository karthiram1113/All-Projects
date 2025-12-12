import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import swal from 'sweetalert2';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  successMsg: any;
  country: any;
  lang: any;
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  constructor(
    private formBuilder: FormBuilder,
    private restApi: ApiServiceService,
    private language: LanguageService
  ) {
    this.lang = localStorage.getItem('language');
  }

  ngOnInit() {
    this.country = localStorage.getItem('country');
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      category: ['', Validators.required],
      visanumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      msgContent: ['', [Validators.required]],
      recaptcha: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }
  loadingStatus: any = false;
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    this.loadingStatus = true;

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));
    // this.loadingStatus=true;
    var data = this.contactForm.value;
    this.restApi.contactSend(data).subscribe(
      (data: any) => {
        console.log(data);
        this.successMsg = data.message;
        this.loadingStatus = false;
        setTimeout(() => {
          delete this.successMsg;
          this.contactForm.reset();
          this.submitted = false;
        }, 2500);
      },
      (error) => {
        this.loadingStatus = false;
        console.log(error);
        if (error.status == 200) {
          this.successMsg = error.error.text;
          setTimeout(() => {
            delete this.successMsg;
            this.contactForm.reset();
            this.submitted = false;
          }, 2500);
        } else {
          swal.fire('Error!', error.message, 'error');
        }

        // this.errorMsgPopup(error)
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.contactForm.reset();
  }
}
