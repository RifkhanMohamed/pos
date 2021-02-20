import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@ViewChild('username') username;
@ViewChild('password') password;
@ViewChild('emailWrong') emailWrong;

isLoggedIn=false;
isLoginFailed=false;
roles:string[];

form=new FormGroup({
  userName:new FormControl(''),
  password: new FormControl('')
})
  constructor(private nav: NavBarServicesService,private authService: AuthService, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.nav.hide(); 
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn=false;
      this.roles=this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(){
    let body={
      "username":this.form.get('userName').value,
      "password":this.form.get('password').value
    }
    this.nav.hide();
    this.authService.login(body).toPromise()
    .then(res=>{
      this.tokenStorageService.saveToken(res.accessToken);
      this.tokenStorageService.saveUser(res);
      this.isLoginFailed=false;
      this.isLoggedIn=true;
      this.roles=this.tokenStorageService.getUser().roles;
    })
    .catch(e=>{
      console.log(e);
    })
  }

  reloadPage() {
    window.location.reload();
  }

}
