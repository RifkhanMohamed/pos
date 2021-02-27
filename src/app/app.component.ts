import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pos';
  visible=false;
  constructor(private router: Router,public nav :NavBarServicesService) {

  }
  ngOnInit(): void {
    this.nav.show();
  }
  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    // document.getElementById("main1").style.marginLeft="250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    // document.getElementById("main1").style.marginLeft="0";
  }
  navigateProducts(){
    this.router.navigate(['products/get']);
  }
  navigateBranches(){
    this.router.navigate(['branches/get']);
  }
  navigateCustomers(){
    this.router.navigate(['customer']);
  }
  navigateSuppliers(){
    this.router.navigate(['suppliers']);
  }
}
