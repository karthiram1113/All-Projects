import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  bookAppointmentApi(data: any) {
    throw new Error('Method not implemented.');
  }
  appointmentupdate(arg0: { id: any; booking_status: number; date_booked: string | null; booked_time: any; }) {
    throw new Error('Method not implemented.');
  }
  bookAppointment(payload: { date: string | null; slots: { start_time: any; end_time: any; }[]; }) {
    throw new Error('Method not implemented.');
  }
  apiUrl: any;

  appointmentbook(data: { applicant_id: any; patient_name: any; visa_number: any; application_number: any; mobile_number: any; email_id: any; date: string; time: any; department: string | undefined; service: string | undefined; service_code: string | undefined; center_code: any; center_name: any; }) {
    throw new Error('Method not implemented.');
  }
  getDropdown(params: { center: string; department: string; date: string; }) {
    throw new Error('Method not implemented.');
  }
  getData() {
    throw new Error('Method not implemented.');
  }

  getDropdownOptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dropdown/options`);
  }

  baseURL: string = environment.baseURL;
  partnerBaseURL: string = environment.basePartnerURL;
  partnerUrl:string=environment.partnerUrl
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  token: any;
  partnerLogoutShow: boolean = false;
  private isPartnerLoggedIn: boolean = false;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}
  public setLoggedInPartner(data: boolean) {
    // you need set header flag true false from other components on basis of your requirements, header component will be visible as per this flag then
    this.isPartnerLoggedIn = data;
  }
  public getUserPartnerIn(): boolean {
    return this.isPartnerLoggedIn;
  }

  statusCheck(data: any): Observable<any> {
    return this.http
      .post<any>(
        // this.baseURL + "glapi/getVisaDetails",
        this.partnerBaseURL + 'transaction/web/applicant-status',

        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  // setPartnerLogoutShow(data: boolean) {
  //   return (this.partnerLogoutShow = data);
  // }
  // getPartnerLogoutShow() {
  //   return this.partnerLogoutShow;
  // }
  contactSend(data: any): Observable<any> {
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/qmc-contact-form',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  carrerSend(data: any): Observable<any> {
    return this.http
      .post<any>(this.baseURL + 'glapi/sendEmailForCareers', data)
      .pipe(catchError(this.handleError));
  }

  getApplicantData(data: any): Observable<any> {
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/userDetail/getApplicantData',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

// appointment login

appointmentlog(data: any): Observable<any> {
  return this.http
    .post<any>(
      this.  partnerBaseURL + 'transaction/bookappointment/referrals',
      JSON.stringify(data),
      this.httpOptions
    )
    .pipe(catchError(this.handleError));
}

// Appointment Check Box Api

dropdownapi(data: any, centerCode: string): Observable<any> {
  const url = `${this.partnerBaseURL}transaction/available-slot`;
  // this.  partnerBaseURL + 'transaction/available-slot?center=CH';
  return this.http.get<any>(url, { params: data })
    .pipe(
      catchError(this.handleError)
    );
}

// Appointment Histort Api

appointmentHistory(data: any): Observable<any> {
  const url = `${this.partnerBaseURL}transaction/bookappointment-history`;
  return this.http.get<any>(url, { params: data })
    .pipe(
      catchError(this.handleError)
    );
}

// Appointment Cancel Api

appointmentcancel(data: any): Observable<any> {
  console.log('Request data:', data);

  return this.http
    .post<any>(
      `${this.partnerBaseURL}transaction/appointment-cancel`,
      data, // No need to stringify data here
      this.httpOptions
    )
    .pipe(
      catchError((error) => {
        console.error('Request failed with error:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
}

// Parter Login

partnerTabMethod(data: any): Observable<any> {
  console.log('Request data:', data);

  return this.http
    .post<any>(
      `${this.partnerUrl}additional_referrals`,
      data, // No need to stringify data here
      this.httpOptions
    )
    .pipe(
      catchError((error) => {
        console.error('Request failed with error:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
}


// Book Appointment  Api

bookappointmentapi(data: any): Observable<any> {
  return this.http
    .post<any>(
      this.  partnerBaseURL + 'transaction/bookappointment/save',
      JSON.stringify(data),
      this.httpOptions
    )
    .pipe(catchError(this.handleError));
}


  userDetail(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/userDetail/',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getSlotByUserDetail(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/slot/getSlotByUserDetail',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getslotdetails(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/slotGroup/fourWeeks',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  checkOTP(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/appointment/otpVerification',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  Bookappointtment(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .post<any>(
        this.baseURL + 'api/v1/appointment',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getappointmenthistory(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };

    return this.http
      .post<any>(
        this.baseURL + 'api/v1/appointment/history',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  rescheduleAppointment(appointmentID: any, data: any): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .put<any>(
        this.baseURL +
          'api/v1/appointment/rescheduleAppointment/' +
          appointmentID,
        data,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  downloadAppointment(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
      responseType: 'blob' as 'json',
    };

    return this.http
      .post<any>(
        this.baseURL + 'api/v1/appointmentPdf',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  cancelAppointment(appointmentID: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      }),
    };
    return this.http
      .get<any>(
        this.baseURL + 'api/v1/appointment/cancelAppointment/' + appointmentID,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  gethospitalitytoken(data: any): Observable<any> {
    this.spinner.show();
    return this.http
      .post<any>(this.partnerBaseURL + 'api/auth/hospital-token', data)
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  getcountrydetails(data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + data,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/countries',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  getcitydetails(token: any, data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/cities',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  gethospitaldetails(token: any, data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/list',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }

  gethospitalreferrals(token: any, data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/referrals',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  gethospitalLabreferrals(token: any, data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/additional_referrals',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  savedocument(data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('hospital-token'),
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/save',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  //tab2
  saveadditionaldocument(data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('hospital-token'),
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/additional_save',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }

  saveReferalSpecialityConfimation(data: any): Observable<any> {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('hospital-token'),
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/confirmation',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }

  savehospitalregistrationdate(token: any, data: any) {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/save-registration',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }

  //tab_2
  savehospitaladditionalregistrationdate(token: any, data: any) {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/additional_save-registration',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  //tab1
  saveprintcount(token: any, data: any) {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/print',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  //tab2
  saveprintadditionalcount(token: any, data: any) {
    this.spinner.show();
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<any>(
        this.partnerBaseURL + 'transaction/hospital/additional_print',
        data,
        httpOptions
      )
      .pipe(
        map((res: any) => {
          this.spinner.hide();
          return res;
        }),
        catchError(this.handleError)
      );
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    // return truel
    // window.alert(errorMessage);
    // this.errorMsg.next(error);
    return throwError(error);
  }
}
