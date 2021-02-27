import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { HostListener } from "@angular/core";
import { HomeService } from "../../Services/home.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Categories=[];
  scrHeight:any;
  scrWidth:any;
  @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
        this.scrHeight = (window.innerHeight-250).toString()+'px';
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);

  }



  constructor(private nav: NavBarServicesService,private home:HomeService) {
    this.nav.show();
    this.getScreenSize();
    
   }

  ngOnInit(): void {
    this.home.getAllCategories().toPromise()
    .then(res=>{
      this.Categories=res;
      console.log(this.Categories);
      
    })
    .catch(e=>{
      console.log(e);
      
    });
  }

}


