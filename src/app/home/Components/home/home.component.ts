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
  imageWith=[];
  cart=[];
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

    this.getProducts();
    
  }

  async getProducts(){
    await this.productService.getAllProducts().toPromise()
    .then(res=>{
      this.Products=res;
      this.getImage();
    })
    .catch(e=>{
      console.log(e); 
    });
  }

  async getImage(){
    this.imageWith=[];
    for(var i=0;i<this.Products.length;i++){
    await this.home.getImage(this.Products[i]['image']).toPromise()
      .then(res=>{
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.imageWith.push({
          "image":this.retrievedImage,
          "product":this.Products[i]
        })
      })
      .catch(e=>{
        console.log(e);
      })
    }

  }

  onCategory(id){
    console.log(id);
    
    this.getProductByCategory(id);
  }

  getProductByCategory(id){
    this.home.getProductByCategory(id).toPromise()
    .then(res=>{
      this.Products=res;
      this.getImage();
    })
    .catch(e=>{
      console.log(e);
      
    })
  }

}


