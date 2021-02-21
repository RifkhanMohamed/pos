import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

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
spinnerOn = false;
errorMessage = '';
roles:string[];

form=new FormGroup({
  userName:new FormControl(''),
  password: new FormControl('')
})
modalRef: BsModalRef;
  constructor(private nav: NavBarServicesService,private authService: AuthService, private tokenStorageService:TokenStorageService,private route: Router,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.nav.hide(); 
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn=false;
      this.roles=this.tokenStorageService.getUser().roles;
    }
  }

  async onSubmit(){
    this.spinnerOn = true;
    let body={
      "username":this.form.get('userName').value,
      "password":this.form.get('password').value
    }
    // this.nav.hide();
    await this.authService.login(body).toPromise()
    .then(res=>{
      this.tokenStorageService.saveToken(res.accessToken);
      this.tokenStorageService.saveUser(res);
      this.isLoginFailed=false;
      this.isLoggedIn=true;
      this.roles=this.tokenStorageService.getUser().roles;
      this.spinnerOn = false;
      this.route.navigate(['home']);
    })
    .catch(e=>{
      console.log(e);
      this.spinnerOn = false;
      this.errorMessage = e.error.message;
      this.isLoginFailed = true;
      document.getElementById("openModal").click();
    })
  }

  reloadPage() {
    window.location.reload();
  }

  Open(emailWrong: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emailWrong,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  onSignUp(){
    this.route.navigate(['signup']);
  }

}
