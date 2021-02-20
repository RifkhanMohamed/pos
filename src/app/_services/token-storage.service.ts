import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.clear();

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    //if(this.isUserAuthenticated()){
     console.log("token authenticated");
     window.localStorage.removeItem(TOKEN_KEY);
     window.localStorage.setItem(TOKEN_KEY, token);
     window.sessionStorage.removeItem(TOKEN_KEY);
     window.sessionStorage.setItem(TOKEN_KEY, localStorage.getItem('auth-token'));
    //}
   }

   public getToken(): string {
    if(sessionStorage.getItem('auth-user') != null){
      window.sessionStorage.setItem('auth-user', localStorage.getItem('auth-user'));
      window.sessionStorage.setItem('auth-token', localStorage.getItem('auth-token'));
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  public saveUser(user) {
    //if(this.isUserAuthenticated()){
      console.log("user authenticated");
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    //}
  }

  public getUser() {
    if(sessionStorage.getItem('auth-user') != null){
      window.sessionStorage.setItem('auth-user', localStorage.getItem('auth-user'));
      window.sessionStorage.setItem('auth-token', localStorage.getItem('auth-token'));
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
  }

  isUserAuthenticated(): boolean {
    if(window.localStorage.getItem(USER_KEY) == null){
      return true;
    }
    else {
      return false;
      }
    }

    public updateSessionStorage(){
      // window.sessionStorage.removeItem('auth-user');
      // window.sessionStorage.removeItem('auth-token');
      //if(localStorage.getItem('auth-user') != null && localStorage.getItem('auth-token') != null && sessionStorage.getItem('auth-user') != null){
        window.sessionStorage.setItem('auth-user', localStorage.getItem('auth-user'));
        window.sessionStorage.setItem('auth-token', localStorage.getItem('auth-token'));
     // }
    }
}
