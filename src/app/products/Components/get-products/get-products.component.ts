import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from "../../Services/products.service";
import { Products } from "../../Modals/products";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})

export class GetProductsComponent implements OnInit {

getAllProducts:Products[];
sortedData: Products[];
rowData : any;
searchText:any;
p:number=1;
total:number;
itemsPerPage:number=10;
constructor(private toastr: ToastrService,private products:ProductsService,private http: HttpClient,private router: Router) {


}

ngOnInit() {
  this.getAllProductsMethod();
  
}

addNew(){
  this.router.navigate(['products/create']);
}

Print(){
  document.getElementById("printButton1").hidden=true;
  document.getElementById("printButton2").hidden=true;
  document.getElementById("printInput").hidden=true;
  document.getElementById("printLabel").hidden=true;
  document.getElementById("printSelect").hidden=true;
  window.print();
  document.getElementById("printButton1").hidden=false;
  document.getElementById("printButton2").hidden=false;
  document.getElementById("printInput").hidden=false;
  document.getElementById("printLabel").hidden=false;
  document.getElementById("printSelect").hidden=false;
}

async getAllProductsMethod(){
 await this.products.getAllProducts().subscribe(
    res=>{
      this.getAllProducts=res as Products[];
      this.total=this.getAllProducts.length;
console.log(this.getAllProducts.length);
this.sortedData = this.getAllProducts.slice();
console.log(this.sortedData);

    })
}

onEdit(id,i){
  this.sortedData[i].productCode
  this.router.navigate(['products/create',
  {
    productId:id,
    name:this.sortedData[i].productName,
    cost:this.sortedData[i].costPrice,
    price:this.sortedData[i].price,
    code:this.sortedData[i].productCode,
    desc:this.sortedData[i].productDesc,
    guar:this.sortedData[i].productGuar,
    category:this.sortedData[i].category.cateId,
    branch:this.sortedData[i].branch.branchId,
    brand:this.sortedData[i].brands.brandId,
    supplier:this.sortedData[i].suppliers.supplierId,
    quantity:this.sortedData[i].stockInUnit
  }])
}

onDelete(id){
  let productName;
  this.getAllProducts.filter(s=>s.productId==id).forEach(x=>productName=x.productName);
 this.products.deleteProduct(id).toPromise().
 then(s => { this.toastr.success( productName+" Successfully Deleted..!");this.getAllProductsMethod();})
 .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);}); 
}

sortData(sort: Sort) {
  const data = this.getAllProducts.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'productCode': return compare(a.productCode, b.productCode, isAsc);
      case 'productName': return compare(a.productName, b.productName, isAsc);
      case 'productDesc': return compare(a.productDesc, b.productDesc, isAsc);
      case 'stockInUnit': return compare(a.stockInUnit, b.stockInUnit, isAsc);
      case 'productGuar': return compare(a.productGuar, b.productGuar, isAsc);
      case 'costPrice': return compare(a.costPrice, b.costPrice, isAsc);
      case 'price': return compare(a.price, b.price, isAsc);
      case 'category': return compare(a.category.cateName, b.category.cateName, isAsc);
      case 'brands': return compare(a.brands.brandName, b.brands.brandName, isAsc);
      case 'suppliers': return compare(a.suppliers.name, b.suppliers.name, isAsc);
      case 'branch': return compare(a.branch.name, b.branch.name, isAsc);
      default: return 0;
    }
  });
}

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
