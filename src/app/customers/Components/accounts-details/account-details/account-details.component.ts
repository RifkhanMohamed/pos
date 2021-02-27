import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from "../../../Services/customers.service";
import { Customer } from "../../../Modals/customer";
import { Accounts } from "../../../Modals/account";
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  customerDetails:Customer;
  customerAccounts:Accounts[];
  sortedData:Accounts[];
  customerId:number;
  name:string;
  searchText:any;
  total:number;

  constructor(private customer:CustomersService,private router:Router,private route:ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.customerId=Number(this.route.snapshot.paramMap.get('id'));
    this.customer.getCustomerById(Number(this.route.snapshot.paramMap.get('id'))).toPromise()
    .then(res=>{
      this.customerDetails=res as Customer;
      this.name=this.customerDetails.name;
      console.log(this.customerDetails.name);
      
    })
    .catch(e=>{
      console.log(e);
      
    });

    this.customer.getAccount(Number(this.route.snapshot.paramMap.get('id'))).toPromise()
    .then(res=>{
      this.customerAccounts=res as Accounts[];
      this.total=this.customerAccounts.length;
      console.log(this.customerAccounts);
      this.sortedData = this.customerAccounts.slice();
    })
    .catch(e=>{
      console.log(e);
      
    });
  }

  sortData(sort: Sort) {
    const data = this.customerAccounts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdDate': return compare(a.createdDate, b.createdDate, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'transectionType': return compare(a.transectionType.name, b.transectionType.name, isAsc);
        case 'debit': return compare(a.debit, b.debit, isAsc);
        case 'credit': return compare(a.credit, b.credit, isAsc);
        case 'purchaseAmount': return compare(a.purchaseAmount, b.purchaseAmount, isAsc);
        case 'salesAmount': return compare(a.salesAmount, b.salesAmount, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }