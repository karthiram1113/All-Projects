import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  environment {
    private http = inject(HttpClient);
  
 apiUrl = 'http://192.168.0.101/Hermon_Ecom/api'

loginAdmin(credentials: { email: string; password: string }): Observable<any> {
  const endpoint = `${this.apiUrl}login/admin`;
  return this.http.post<any>(endpoint, credentials);
}
};
