import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form=new FormGroup({
    name:new FormControl('',[Validators.required]),
    nic:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    mobile:new FormControl('',[Validators.required]),
    land:new FormControl(''),
    fax:new FormControl('')
  })

  constructor(private nav: NavBarServicesService) { }

  ngOnInit(): void {
    this.nav.hide(); 
  }

}
