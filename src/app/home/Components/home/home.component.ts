import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private nav: NavBarServicesService) {
    this.nav.show();
   }

  ngOnInit(): void {
   
  }

}
