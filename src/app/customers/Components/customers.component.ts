import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from "../Modals/customer";
import { CustomersService } from "../Services/customers.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  getAllCustomers:Customer[];
  sortedData: Customer[];

  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  constructor(private customer:CustomersService) { }

  ngOnInit(): void {
    this.getAllCustomersMethod();
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

  }

  onDelete(id){

  }

  onNavigate(id){

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
