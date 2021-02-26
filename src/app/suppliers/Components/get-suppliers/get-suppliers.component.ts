import { Component, OnInit } from '@angular/core';
import { Supplier } from "../../Modals/supplier";
import { SuppliersService } from "../../Services/suppliers.service";
import {Sort} from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-suppliers',
  templateUrl: './get-suppliers.component.html',
  styleUrls: ['./get-suppliers.component.css']
})
export class GetSuppliersComponent implements OnInit {
  getAllSuppliers:Supplier[];
  sortedData: Supplier[];
  getMail=[];
  getPhone=[];
  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  supplierForm=new FormGroup({});
  supplierEditForm=new FormGroup({});
  supplierId:number;
  constructor(private suppliers:SuppliersService,private fb:FormBuilder,private toastr: ToastrService) 
  {
    
  }

  ngOnInit(): void {
    this.getAllSuppliersMethod();
    this.getAllPhones();
    this.getAllMails();

    this.supplierForm=this.fb.group({
      supplierAddress:new FormControl(''),
      supplierName:new FormControl('',Validators.required),
      supplierTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNo.bind(this)]),
      supplierEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmail.bind(this)]),
      supplierFaxNo:new FormControl('')
    });

    this.supplierEditForm=this.fb.group({
      supplierEditAddress:new FormControl(''),
      supplierEditName:new FormControl('',Validators.required),
      supplierEditTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}")]),
      supplierEditEmail:new FormControl('',[Validators.required,Validators.email]),
      supplierEditFaxNo:new FormControl('')
    })
  }

  getAllPhones(){
    this.suppliers.getAllPhone().toPromise()
    .then(res=>{
      this.getPhone=res;
    })
    .catch(e=>{
      console.log(e);
    });
  }

  getAllMails(){
    this.suppliers.getAllMail().toPromise()
    .then(res=>{
      this.getMail=res;
    })
    .catch(e=>{
      console.log(e);
    });
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

  uniqueTelNo(control: FormControl){
    if(this.getPhone.indexOf(control.value)!=-1){
      return {'supplierTelNoIsNotAllowed':true}
    }
    return null;
  }

  uniqueEmail(control: FormControl){
    if(this.getMail.indexOf(control.value)!=-1){
      return {'supplierEmailIsNotAllowed':true}
    }
    return null;
  }

  createNewSupplier(){
    let body={
      "address": this.supplierForm.get('supplierAddress').value,
      "archived": false,
      "email": this.supplierForm.get('supplierEmail').value,
      "faxNo": this.supplierForm.get('supplierFaxNo').value,
      "name": this.supplierForm.get('supplierName').value,
      "telNo": this.supplierForm.get('supplierTelNo').value
    }
    this.suppliers.createSupplier(body).toPromise()
    .then(s=>{
      this.toastr.success(s.message);
      this.getAllSuppliersMethod();
      this.getAllPhones();
      this.getAllMails();
      this.supplierForm.reset();
    })
    .catch(e=>{ 
      if(e.error.error){
        this.toastr.error(e.error.error);
      }
      else{
        this.toastr.error(e.error);
      }
    });
  }

  updateSupplier(){
    let body={
      "address": this.supplierEditForm.get('supplierEditAddress').value,
      "archived": false,
      "email": this.supplierEditForm.get('supplierEditEmail').value,
      "faxNo": this.supplierEditForm.get('supplierEditFaxNo').value,
      "name": this.supplierEditForm.get('supplierEditName').value,
      "telNo": this.supplierEditForm.get('supplierEditTelNo').value,
      "supplierId":this.supplierId
    }
    
    
    this.suppliers.editSupplier(body).toPromise()
    .then(res=>{
      this.toastr.success(res.message);
      this.getAllSuppliersMethod();
      this.getAllPhones();
      this.getAllMails();
      this.supplierEditForm.reset();
    })
    .catch(e=>{
      if(e.error.error){
        this.toastr.error(e.error.error);
      }
      else{
        this.toastr.error(e.error);
      }
    });
  }

  onEdit(id){
    this.supplierId=Number(id);
    let i=this.sortedData.findIndex(x=>x.supplierId==id);
    this.supplierEditForm.get('supplierEditAddress').setValue(this.sortedData[i].address);
    this.supplierEditForm.get('supplierEditEmail').setValue(this.sortedData[i].email);
    this.supplierEditForm.get('supplierEditFaxNo').setValue(this.sortedData[i].faxNo);
    this.supplierEditForm.get('supplierEditName').setValue(this.sortedData[i].name);
    this.supplierEditForm.get('supplierEditTelNo').setValue(this.sortedData[i].telNo);
  }

  onDelete(id){
    this.suppliers.deleteSupplier(id).toPromise()
    .then(res=>{
      this.toastr.success(res.message);
      this.getAllSuppliersMethod();
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
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }