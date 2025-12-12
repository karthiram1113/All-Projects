import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../app/home/home.component";
import { AboutComponent } from "../app/about/about.component";
import { VmsComponent } from "../app/vms/vms.component";
import { BookAppointmentComponent } from "../app/book-appointment/book-appointment.component";
import { CareersComponent } from "../app/careers/careers.component";
import { ContactComponent } from "../app/contact/contact.component";
import { FaqsComponent } from "../app/faqs/faqs.component";
import { MakeAppointmentComponent } from "../app/make-appointment/make-appointment.component";
import { StatusCheckComponent } from "../app/status-check/status-check.component";
import { LoadingComponent } from "../app/loading/loading.component";
import { PrivacyPolicyComponent } from "../app/privacy-policy/privacy-policy.component";
import { SuccessComponent } from "./success/success.component";
import { ChecklistComponent } from "./checklist/checklist.component";
import { CallCenterComponent } from "./call-center/call-center.component";
import { ReferralsComponent } from "./Referrals/referrals/referrals.component";
import { AppointmentLoginComponent } from "./appointment-login/appointment-login.component";
import { PartnerHospitalLoginComponent } from "./partner-hospital-login/partner-hospital-login.component";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { TermsOfUseComponent } from "./terms-of-use/terms-of-use.component";
import { AppointmentDetailsComponent } from "./appointment-details/appointment-details.component";
import { AppointmentNewComponent } from "./appointment-new/appointment-new.component";
import { AppointmentViewComponent } from "./appointment-view/appointment-view.component";

const routes: Routes = [
  { path: "", component: LoadingComponent },
  // { path: 'loading', component: LoadingComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "visa-medical-services", component: VmsComponent },
  { path: "contact", component: ContactComponent },
  { path: "faqs", component: FaqsComponent },
  { path: "make-appointment", component: MakeAppointmentComponent },
  { path: "book-appointment", component: BookAppointmentComponent },
  { path: "status-check", component: StatusCheckComponent },
  { path: "careers", component: CareersComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "success", component: SuccessComponent },
  { path: "checklist", component: ChecklistComponent },
  { path: "book-referral-appointment", component: CallCenterComponent },
  { path: "referrals", component: ReferralsComponent },
  { path: "appointmentlogin", component: AppointmentLoginComponent },
  { path: "appointmentdetails", component: AppointmentDetailsComponent },
  { path: "appointmentnew", component: AppointmentNewComponent },
  { path: "appointmentview", component: AppointmentViewComponent },
  { path: "partnerhospitallogin", component: PartnerHospitalLoginComponent },
  { path: "upload-file", component: UploadFileComponent },
  { path: "terms-of-use", component: TermsOfUseComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
