import { Component, OnInit } from '@angular/core';
import { Supplier } from "../../Modals/supplier";
import { SuppliersService } from "../../Services/suppliers.service";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-get-suppliers',
  templateUrl: './get-suppliers.component.html',
  styleUrls: ['./get-suppliers.component.css']
})
export class GetSuppliersComponent implements OnInit {
  getAllSuppliers:Supplier[];
  sortedData: Supplier[];
  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  constructor(private suppliers:SuppliersService) 
  {
    
  }

  ngOnInit(): void {
    this.getAllSuppliersMethod();
  }

  getAllSuppliersMethod(){
    this.suppliers.getAllSuppliers().subscribe(
      res=>{
        this.getAllSuppliers= res as Supplier[];
        this.total=this.getAllSuppliers.length
        this.sortedData = this.getAllSuppliers.slice();
      })
  }

  sortData(sort: Sort) {
    const data = this.getAllSuppliers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'telNo': return compare(a.telNo, b.telNo, isAsc);
        case 'faxNo': return compare(a.faxNo, b.faxNo, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        default: return 0;
      }
    });
  }

  onEdit(id){

  }

  onDelete(id){

  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }