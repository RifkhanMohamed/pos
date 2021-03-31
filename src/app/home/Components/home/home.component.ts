import { Component, OnInit } from '@angular/core';
import { NavBarServicesService } from "src/app/_services/nav-bar-services.service";
import { HostListener } from "@angular/core";
import { HomeService } from "../../Services/home.service";
import { ProductsService } from "../../../products/Services/products.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Categories=[];
  Products=[];
  scrHeight:any;
  scrWidth:any;
  retrievedImage: any;
  retrieveResonse:any;
  base64Data: any;
  @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
        this.scrHeight = (window.innerHeight-250).toString()+'px';
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }



  constructor(private nav: NavBarServicesService,private home:HomeService,private productService:ProductsService) {
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

    this.productService.getAllProducts().toPromise()
    .then(res=>{
      this.Products=res;
    })
    .catch(e=>{
      console.log(e);
      
    });
    this.getImage();
  }

  getImage(){
    this.home.getImage(1).toPromise()
    .then(res=>{
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    })
    .catch(e=>{
      console.log(e);

    })
  }

}


