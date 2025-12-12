import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VmsComponent } from './vms/vms.component';
import { CareersComponent } from './careers/careers.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactComponent } from './contact/contact.component';
import { StatusCheckComponent } from './status-check/status-check.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { LoadingComponent } from './loading/loading.component';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SuccessComponent } from './success/success.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
// localization module import
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChecklistComponent } from './checklist/checklist.component';
import { CallCenterComponent } from './call-center/call-center.component';
import { ReferralsComponent } from './Referrals/referrals/referrals.component';
import { AppointmentLoginComponent } from './appointment-login/appointment-login.component';
import { Timepipe } from './appointment-login/TimeFormatPipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartnerHospitalLoginComponent } from './partner-hospital-login/partner-hospital-login.component';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
// import { LivechatWidgetModule } from '@livechat/angular-widget';
// loader module
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../environments/environment.prod';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentNewComponent } from './appointment-new/appointment-new.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '-lang.json');
}
interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    VmsComponent,
    CareersComponent,
    FaqsComponent,
    ContactComponent,
    StatusCheckComponent,
    MakeAppointmentComponent,
    BookAppointmentComponent,
    LoadingComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    SuccessComponent,
    ChecklistComponent,
    CallCenterComponent,
    ReferralsComponent,
    AppointmentLoginComponent,
    AppointmentDetailsComponent,
    AppointmentNewComponent,
    AppointmentViewComponent,
    Timepipe,
    PartnerHospitalLoginComponent,
    UploadFileComponent,
    TermsOfUseComponent,
  ],
  imports: [
    BrowserModule,
    NgbAccordionModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // LivechatWidgetModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    FormsModule,
    NgbModule,
    NgbModalModule,
    NgxCaptchaModule,
    NgMultiSelectDropDownModule.forRoot(),
    
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    MaterialModule,
    RecaptchaFormsModule,
    RecaptchaModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FaqsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
