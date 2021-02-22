import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { SignUpService } from "../../Services/sign-up.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Towns=[];
  form=new FormGroup({
    name:new FormControl('',[Validators.required]),
    nic:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email,this.isMailExist.bind(this)]),
    town:new FormControl('',[Validators.required]),
    mobile:new FormControl('',[Validators.required]),
    land:new FormControl(''),
    fax:new FormControl('')
  })

  constructor(private nav: NavBarServicesService,private appService: SignUpService) { }

  ngOnInit(): void {
    this.nav.hide(); 
    this.appService.getAllTowns().toPromise()
    .then(res=>{
      this.Towns=res;
      console.log(this.Towns);
      this.Towns.sort((a,b) => (a.cityName > b.cityName) ? 1 : ((b.cityName > a.cityName) ? -1 : 0)); 
    })
    .catch(e=>{
      console.log(e);
    });
  }

  isMailExist(control: FormControl){
    this.appService.isExistMail(control.value).toPromise()
    .then(res=>{
      if(res==true){
        return {'userEmailIsNotAllowed':true}
      }
      return false;
    })
    .catch(e=>{
      console.log(e);
    })
  }

}
