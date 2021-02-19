import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private nav: NavBarServicesService) { this.nav.hide(); }

  ngOnInit(): void {
   
  }

}
