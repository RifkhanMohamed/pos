import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { SignUpService } from "../../Services/sign-up.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Towns=[];
  mailDetails=[];
  phoneDetails=[];
  nicDetails=[];
  form=new FormGroup({});
  forMail=false;

  constructor(private toastr: ToastrService,private nav: NavBarServicesService,private fb: FormBuilder,private appService: SignUpService) { 
    this.nav.hide(); 
    this.form=fb.group({
      name:new FormControl('',[Validators.required]),
      nic:new FormControl('',[Validators.required,this.isNicExist.bind(this)]),
      address:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email,this.isMailExist.bind(this)]),
      town:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.isPhoneExist.bind(this)]),
      land:new FormControl('',[Validators.pattern("[0-9 ]{10}")]),
      fax:new FormControl('',[Validators.pattern("[0-9 ]{10}")])
    })
  }

  ngOnInit(): void {
    this.appService.getAllTowns().toPromise()
    .then(res=>{
      this.Towns=res;
      this.Towns.sort((a,b) => (a.cityName > b.cityName) ? 1 : ((b.cityName > a.cityName) ? -1 : 0)); 
    })
    .catch(e=>{
      console.log(e);
    });

    this.appService.userMailGetAll().toPromise()
    .then(res=>{
      this.mailDetails=res;
    })
    .catch(e=>{
      console.log(e);
    });

    this.appService.userPhoneGetAll().toPromise()
    .then(res=>{
      this.phoneDetails=res;
    })
    .catch(e=>{
      console.log(e);
      
    });

    this.appService.userNicGetAll().toPromise()
    .then(res=>{
      this.nicDetails=res;
    })
    .catch(e=>{
      console.log(e);
    })
  }

  isMailExist(control: FormControl){
    if(this.mailDetails.indexOf(control.value)!=-1){
      return {'userEmailIsNotAllowed':true}
    }
    return null;
  }

  isPhoneExist(control: FormControl){
    if(this.phoneDetails.indexOf(control.value)!=-1){
      return {'userPhoneIsNotAllowed':true}
    }
    return null;
  }

  isNicExist(control: FormControl){
    if(this.nicDetails.indexOf(control.value)!=-1){
      return {'userNicIsNotAllowed':true}
    }
    return null;
  }

  onRegister(){
    let body={
      "userDetails": {
        "correspondanceaddress": this.form.get('address').value,
        "email": this.form.get('mail').value,
        "emailverifiedid": true,
        "faxno": this.form.get('fax').value,
        "lanNo": this.form.get('land').value,
        "mobileno": this.form.get('mobile').value,
        "mobileverifieid": true,
        "namewithinitials": this.form.get('name').value,
        "nic": this.form.get('nic').value,
        "town": this.form.get('town').value
      }
    }
    console.log(body,"body");
    
    this.appService.signUp(body).toPromise()
    .then(res=>{
      this.toastr.success(res);
    })
    .catch(e=>{
      this.toastr.error(e);
      console.log(e);
    })
  }


}
