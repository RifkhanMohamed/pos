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
  strHeight:any;
  retrievedImage: any;
  retrieveResonse:any;
  base64Data: any;
  imageWith=[];
  cart=[];
  price:any;
  forUpdatePrice:any;
  forUpdateQuantityPrice:any;
  quantity=1;
  discount=0;
  maxQuantity:any;
  product:any;
  subTotal=0;
  index:any;
  @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
        this.scrHeight = (window.innerHeight-250).toString()+'px';
        this.scrWidth = window.innerWidth;
        this.strHeight=(window.innerHeight-80).toString()+'px';
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
    var longTxt=document.getElementById("forSlice");
    console.log(longTxt);
    
  }

  onCart(price,max,product,index){
    this.product=product;
    this.price=price;
    this.forUpdatePrice=price;
    this.forUpdateQuantityPrice=price;
    this.maxQuantity=max;
    this.discount=0;
    this.index=index;
    if(this.maxQuantity==0){
      this.quantity=0;

    }
    else{
      this.quantity=1;
    }
  }
  onAddCart(){
    this.cart.push({
      "price":((this.price*this.quantity)-((this.price*this.quantity)*this.discount/100)),
      "quantity":this.quantity,
      "product":this.product,
      "discount":this.discount,
      "unitPrice":this.price,
      "index":this.index
    });
    this.calculateSubTotal();
    if(this.imageWith[this.index]['product']['stockInUnit']>0){
      this.imageWith[this.index]['product']['stockInUnit']=this.maxQuantity-this.quantity;
    }
  }
  calculateSubTotal(){
    this.subTotal=0;
    for(var i=0;i<this.cart.length;i++){
      this.subTotal=this.subTotal+this.cart[i]['price'];
    }
  }
  onQuantity(){
    // if(this.quantity==0){
    //   this.quantity=1;
    // }
    if(this.quantity>this.maxQuantity){
      this.quantity=this.maxQuantity;
    }
  }
  onDiscount(){
    if(this.discount>100){
      this.discount=100;
    }
    
  }
  detectQuantity(){
    if(this.quantity>1){
      this.quantity=this.quantity-1;
    }
    else{
      this.quantity=1;
    }

  }
  addQuantity(){
    if(this.quantity<this.maxQuantity){
      this.quantity=this.quantity+1;
    }
    else{
      this.quantity=this.maxQuantity;
    }

  }
  detectDiscount(){
    if(this.discount>0){
      this.discount=this.discount-10;
    }
    else{
      this.discount=0;
    }

  }
  addDiscount(){
    if(this.discount<100){
      this.discount=this.discount+10;
    }
    else{
      this.discount=100;
    }
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
  onDelete(i){
    
    this.imageWith[this.cart[i]['index']]['product']['stockInUnit']=this.imageWith[this.cart[i]['index']]['product']['stockInUnit']+this.cart[i]['quantity'];
    this.cart.splice(i,1);
    this.calculateSubTotal();
    
  }

}


