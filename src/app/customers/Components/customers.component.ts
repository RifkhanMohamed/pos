import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from "../Modals/customer";
import { CustomersService } from "../Services/customers.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  customerId:number;
 

  customerForm=new FormGroup({});
  customerEditForm=new FormGroup({});

  constructor(private customer:CustomersService,private fb:FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.customerForm=this.fb.group({
      customerName:new FormControl('',[Validators.required]),
      customerAddress:new FormControl('',[Validators.required]),
      customerTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNo.bind(this)]),
      customerEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmail.bind(this)])
    });
    this.customerEditForm=this.fb.group({
      customerEditName:new FormControl('',[Validators.required]),
      customerEditAddress:new FormControl('',[Validators.required]),
      customerEditTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}")]),
      customerEditEmail:new FormControl('',[Validators.required,Validators.email])
    });
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

  createNewCustomer(){
    let body={
      "address": this.customerForm.get('customerAddress').value,
      "mail": this.customerForm.get('customerEmail').value,
      "name": this.customerForm.get('customerName').value,
      "phone": this.customerForm.get('customerTelNo').value  
  }

  this.customer.createCustomer(body).toPromise()
  .then(res=>{
    this.toastr.success(res.message);
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.customerForm.reset();
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

  updateCustomer(){
    let body={
      "address": this.customerEditForm.get('customerEditAddress').value,
      "mail": this.customerEditForm.get('customerEditEmail').value,
      "name": this.customerEditForm.get('customerEditName').value,
      "phone": this.customerEditForm.get('customerEditTelNo').value,
      "customerId": this.customerId
  }
  this.customer.updateCustomer(body).toPromise()
  .then(res=>{
    this.toastr.success(res.message);
    this.getAllCustomersMethod();
    this.getAllPhones();
    this.getAllMails();
    this.customerEditForm.reset();
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

  getAllCustomersMethod(){
    this.customer.getAllCustomers().toPromise()
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
  
  onEdit(id,i){
    this.customerId=Number(id);
    this.customerEditForm.get('customerEditName').setValue(this.sortedData[i].name);
    this.customerEditForm.get('customerEditAddress').setValue(this.sortedData[i].address);
    this.customerEditForm.get('customerEditTelNo').setValue(this.sortedData[i].phone);
    this.customerEditForm.get('customerEditEmail').setValue(this.sortedData[i].mail);
  }

  onDelete(id){
    this.customer.deleteCustomer(id).toPromise()
    .then(res=>{
      this.toastr.success(res.message);
      this.getAllCustomersMethod();
      this.getAllPhones();
      this.getAllMails();
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

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
