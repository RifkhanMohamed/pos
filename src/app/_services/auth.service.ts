import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

const AUTH_API = environment.base_url + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body): Observable<any> {
    if(this.isUserAuthenticated()){
      return this.http.post(AUTH_API + 'signin', body, httpOptions);
    }
    else{
      alert("You cannot login to this site because another user is logged in to this site using this web browser.");
      window.location.reload();
    }
  }

  register(body): Observable<any> {
    return this.http.post(AUTH_API + 'signup', body, httpOptions);
  }

  isUserAuthenticated(): boolean {
    if(window.localStorage.getItem('auth-user') != null){
      window.localStorage.removeItem('auth-user');
      window.localStorage.removeItem('auth-token');
      return true;

    }
    else {
      return true;
      }
    }
}
