import { Component, OnInit } from '@angular/core';
import { Supplier } from "../../Modals/supplier";
import { SuppliersService } from "../../Services/suppliers.service";

@Component({
  selector: 'app-get-suppliers',
  templateUrl: './get-suppliers.component.html',
  styleUrls: ['./get-suppliers.component.css']
})
export class GetSuppliersComponent implements OnInit {
  getAllSuppliers:Supplier[];

  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  constructor(private suppliers:SuppliersService) 
  {
    this.getAllSuppliersMethod();
  }

  ngOnInit(): void {
  }

  getAllSuppliersMethod(){
    this.suppliers.getAllSuppliers().subscribe(
      res=>{
        this.getAllSuppliers= res as Supplier[];
      })
  }
}
