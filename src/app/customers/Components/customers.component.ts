import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from "../Modals/customer";
import { Accounts } from "../Modals/account";
import { CustomersService } from "../Services/customers.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from "../../home/Services/home.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  getAllCustomers:Customer[];
  sortedData: Customer[];
  getPhone=[];
  getMail=[];
  getCustomerId=[];
  selectedFile: File;
  photoId=1;
  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  customerId:number;
  x = 0;
  y = 0;
  scrHeight:any;
  scrWidth:any;
  retrievedImage: any;
  retrieveResonse:any;
  base64Data: any;
  getPhotoId:number;
  forWork=false;
  forUpdatePhotoName:any;
  // forUpdatePhotoId:number;
 

  customerForm=new FormGroup({});
  customerEditForm=new FormGroup({});

  constructor(private router:Router,private customer:CustomersService,private fb:FormBuilder,private toastr: ToastrService,private service: HomeService ) { }

  ngOnInit(): void {
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.getAllCustomerId();
  
    this.customerForm=this.fb.group({
      customerName:new FormControl('',[Validators.required]),
      customerAddress:new FormControl('',[Validators.required]),
      customerTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNo.bind(this)]),
      customerEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmail.bind(this)]),
      customerPhoto:new FormControl('')
    });
    this.customerEditForm=this.fb.group({
      customerEditName:new FormControl('',[Validators.required]),
      customerEditAddress:new FormControl('',[Validators.required]),
      customerEditTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}")]),
      customerEditEmail:new FormControl('',[Validators.required,Validators.email]),
      customerEditPhoto:new FormControl('')
    });
  }

  getImage(){
    this.service.getImage(this.getPhotoId).toPromise()
    .then(res=>{
      this.retrieveResonse = res;
      this.forUpdatePhotoName=this.retrieveResonse.name;
      this.customerEditForm.get('customerEditPhoto').setValue(this.forUpdatePhotoName);
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    })
    .catch(e=>{
      console.log(e);
    })
  }

  onMouse1(e){
    var target = e.target || e.srcElement || e.currentTarget;
    if (document.getElementById('tableDatas').contains(target)){
      this.forWork=true;
      document.getElementById('imageDiv').style.visibility = "visible";
    }
    else{
      console.log("b");
      this.forWork=false;
      document.getElementById('imageDiv').style.visibility = "hidden";
    }
  }

  async onMouse(e,id){
    if(this.forWork){
      this.getPhotoId=id;
      await this.getImage();
      document.addEventListener('mousemove', this.onMouseUpdate);
    }
  }

  onMouseUpdate(e) {
    this.x = e.pageX;
    this.y = e.pageY;
    document.getElementById('imageDiv').style.left=(this.x+5)+"px";
    document.getElementById('imageDiv').style.top=(this.y+5)+"px";
  }

  uniqueTelNo(control: FormControl){
    if(this.getPhone.indexOf(control.value)!=-1){
      return {'customerTelNoIsNotAllowed':true}
    }
    return null;
  }

  uniqueEmail(control: FormControl){
    if(this.getMail.indexOf(control.value)!=-1){
      return {'customerEmailIsNotAllowed':true}
    }
    return null;
  }

  async createNewCustomer(){
    await this.uploadPhoto();
    let body;
      body={
        "address": this.customerForm.get('customerAddress').value,
        "mail": this.customerForm.get('customerEmail').value,
        "name": this.customerForm.get('customerName').value,
        "phone": this.customerForm.get('customerTelNo').value,
        "image":{
          "id":this.photoId
        }  
    }



  await this.customer.createCustomer(body).toPromise()
  .then(res=>{
    this.toastr.success(res.message);
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.getAllCustomerId();
    this.customerForm.reset();
    this.photoId=1;
    this.selectedFile=null;
    window.location.reload();
  })
  .catch(e=>{
    if(e.error.error){
      this.toastr.error(e.error.error);
    }
    else{
      this.toastr.error(e.error);
    }
  })
  }

  async updateCustomer(){
    await this.uploadPhoto();
    let body={
      "address": this.customerEditForm.get('customerEditAddress').value,
      "mail": this.customerEditForm.get('customerEditEmail').value,
      "name": this.customerEditForm.get('customerEditName').value,
      "phone": this.customerEditForm.get('customerEditTelNo').value,
      "customerId": this.customerId,
      "image":{
        "id":this.photoId
      }  
  }
  this.customer.updateCustomer(body).toPromise()
  .then(res=>{
    this.toastr.success(res.message);
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.getAllCustomerId();
    this.customerEditForm.reset();
    this.photoId=1;
    this.selectedFile=null;
    window.location.reload();
  })
  .catch(e=>{
    if(e.error.error){
      this.toastr.error(e.error.error);
    }
    else{
      this.toastr.error(e.error);
    }
  })
  }

  async getAllCustomersMethod(){
  await  this.customer.getAllCustomers().toPromise()
    .then(res=>{
      this.getAllCustomers=res as Customer[];
      console.log(this.getAllCustomers);
      this.total=this.getAllCustomers.length;
      this.sortedData = this.getAllCustomers.slice();
    })
    .catch(e=>{
      console.log(e);
    });
  }

  getAllPhones(){
    this.customer.getAllPhones().toPromise()
    .then(res=>{
      this.getPhone=res;
    })
    .catch(e=>{
      console.log(e);
      
    })
  }

  getAllMails(){
    this.customer.getAllMail().toPromise()
    .then(res=>{
      this.getMail=res;
    })
    .catch(e=>{
      console.log(e);
      
    })
  }

  async getAllCustomerId(){
   await this.customer.getAllCustomerId().toPromise()
    .then(res=>{
      this.getCustomerId=res;
      this.getAccounts();
    })
    .catch(e=>{
      console.log(e);
      
    })
  }

  sortData(sort: Sort) {
    const data = this.getAllCustomers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'mail': return compare(a.mail, b.mail, isAsc);
        case 'account': return compare(a.account, b.account, isAsc);
        default: return 0;
      }
    });
  }

  addNew(){

  }
  
  async onEdit(id){
    document.getElementById('imageDiv').style.visibility = "hidden";
    this.customerId=Number(id);
    let i=this.sortedData.findIndex(x=>x.customerId==id);
    this.customerEditForm.get('customerEditName').setValue(this.sortedData[i].name);
    this.customerEditForm.get('customerEditAddress').setValue(this.sortedData[i].address);
    this.customerEditForm.get('customerEditTelNo').setValue(this.sortedData[i].phone);
    this.customerEditForm.get('customerEditEmail').setValue(this.sortedData[i].mail);
    this.photoId=this.sortedData[i].image;
    await this.getImage();
  }

  onPass(id){
    document.getElementById('imageDiv').style.visibility = "hidden";
    this.customerId=id;
  }

  onDelete(){
    
    this.customer.deleteCustomer(this.customerId).toPromise()
    .then(res=>{
      this.toastr.success(res.message);
      this.getAllCustomersMethod();
      this.getAllPhones();
      this.getAllMails();
      window.location.reload();
    })
    .catch(e=>{
      if(e.error.error){
        this.toastr.error(e.error.error);
      }
      else{
        this.toastr.error(e.error);
      }
    })
  }

  onNavigate(id){
    this.router.navigate(['customer/accounts',{id:id}]);
  }

 async getAccounts(){
    for(var i=0;i<this.getCustomerId.length;i++){
   await   this.customer.getAccount(this.getCustomerId[i]).toPromise()
      .then(res=>{
        console.log(res,"res");
        
        if(res.length>0){
          var temp=0;
          for(var j=0;j<res.length;j++){
           var balance=(res[j].debit-res[j].credit);
           temp=temp+balance;
          }
          console.log(balance,temp);
          let g=this.sortedData.findIndex(x=>x.customerId==this.getCustomerId[i])
          this.sortedData[g].account=temp;
        }
        else{
          let g=this.sortedData.findIndex(x=>x.customerId==this.getCustomerId[i])
          this.sortedData[g].account=0;
        }
      })
      .catch(e=>{
        console.log(e);
      })
    }
    
  }

 async uploadPhoto(){
   if(this.selectedFile){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
   await this.customer.createImage(uploadImageData).toPromise()
    .then(res=>{
      this.photoId=res.body;
      this.toastr.success("Successfully Uploaded!");
    })
    .catch(e=>{
      this.toastr.error(e);
    });
   }
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
