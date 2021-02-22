import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators,AbstractControl, FormArray,ValidatorFn } from "@angular/forms";
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ProductsService } from "../../Services/products.service";
import { BrandsService } from "../../../brands/Services/brands.service";
import { CategoriesService } from "../../../categories/Services/categories.service";
import { SuppliersService } from "../../../suppliers/Services/suppliers.service";
import { BranchesService } from "../../../branches/Services/branches.service";
import { UnitsService } from "../../../units/Services/units.service";
import { Products } from "../../Modals/products";
import { Brands } from "../../../brands/Modals/brands";
import { Category } from "../../../categories/Modals/category";
import { Supplier } from "../../../suppliers/Modals/supplier";
import { Branch } from "../../../branches/Modals/branch";
import { Unit } from "../../../units/Modals/unit";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})

export class CreateProductsComponent implements OnInit {
form =new FormGroup({});
categoryForm=new FormGroup({});
brandForm=new FormGroup({});
supplierForm=new FormGroup({});
branchForm=new FormGroup({});
unitForm=new FormGroup({});

getAllProducts:Products[];
getAllBrands:Brands[];
getAllCategories:Category[];
getAllSuppliers:Supplier[];
getAllBranches:Branch[];
getAllUnits:Unit[];

allProductCodes=[];
allCategoriesName=[];
allUnitName=[];
allBrandsName=[];
allSuppliersEmail=[];
allBranchEmail=[];
allSuppliersTelNo=[];
allBranchTelNo=[];
allBranchesName=[];
unitsValues=[];
unitIds=[];

findProductCodeValue:any;
  constructor(private toastr: ToastrService,private fb: FormBuilder,private units:UnitsService,private products: ProductsService,private brands: BrandsService,private categories: CategoriesService,private suppliers: SuppliersService,private branches: BranchesService) {
    this.getAllProductsMethod();
    this.getAllBrandsMethod();
    this.getAllCategoriesMethod();
    this.getAllSuppliersMethod();
    this.getAllBranchesMethod();
    this.getAllUnitMethod();

    this.form= fb.group({
      productCode:new FormControl('',[Validators.required,this.uniqueProductCode.bind(this)]),
      productName:new FormControl('',Validators.required),
      productDes:new FormControl(''),
      costPrice:new FormControl ('', [Validators.required,RxwebValidators.numeric({allowDecimal:true,isFormat:true})]),
      price:new FormControl ('', [Validators.required,RxwebValidators.numeric({allowDecimal:true,isFormat:true})]),
      productGuarantee:new FormControl(''),
      productCategory:new FormControl(''),
      productBrand:new FormControl(''),
      productSupplier:new FormControl(''),
      productBranch:new FormControl(''),
      productQuantity:new FormControl('',[Validators.required,RxwebValidators.numeric({allowDecimal:true})]),
    });

    this.categoryForm= fb.group({
      categoryName:new FormControl('',[Validators.required,this.uniqueCategoryName.bind(this)])
    })

    this.unitForm= fb.group({
      unitName:new FormControl('',[Validators.required,this.uniqueUnitName.bind(this)])
    })

    this.brandForm= fb.group({
      brandName:new FormControl('',[Validators.required,this.uniqueBrandName.bind(this)])
    })

    this.supplierForm=fb.group({
      supplierAddress:new FormControl(''),
      supplierName:new FormControl('',Validators.required),
      supplierTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNo.bind(this)]),
      supplierEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmail.bind(this)]),
      supplierFaxNo:new FormControl('')
    })

    this.branchForm=fb.group({
      branchAddress:new FormControl(''),
      branchName:new FormControl('',[Validators.required,this.uniqueBranchName.bind(this)]),
      branchTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNoBranch.bind(this)]),
      branchEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmailBranch.bind(this)]),
      branchFaxNo:new FormControl(''),
      branchUnit:new FormControl('')
    })
    
   }
   
  ngOnInit(): void {
  }

  getAllProductsMethod(){
    this.allProductCodes=[];
    this.products.getAllProducts().subscribe(
      res=>{
      this.getAllProducts=res as Products[];
      if(this.getAllProducts.length>0){
        for (var i= 0; i < this.getAllProducts.length; i++) {
          this.allProductCodes.push(this.getAllProducts[i].productCode);
        }
      }
      console.log(this.allProductCodes,"this.allProductCodes");
      console.log(this.getAllProducts,"this.getAllProducts");
    });
  }

  getAllBrandsMethod(){
  this.allBrandsName=[];
    this.brands.getAllBrands().subscribe(
      res=>{
        this.getAllBrands=res as Brands[];
        if(this.getAllBrands.length>0){
          for(var i=0;i<this.getAllBrands.length;i++){
            this.allBrandsName.push(this.getAllBrands[i].brandName);
          }
        }
      })
  }

  getAllCategoriesMethod(){
    this.allCategoriesName=[];
    this.categories.getAllCategories().subscribe(
      res=>{
        this.getAllCategories=res as Category[];
        if(this.getAllCategories.length>0){
          for(var i=0;i<this.getAllCategories.length;i++){
            this.allCategoriesName.push(this.getAllCategories[i].cateName);
          }
        }
    })
  }

  getAllUnitMethod(){
    this.allUnitName=[];
    this.units.getAllUnits().subscribe(
      res=>{
        this.getAllUnits=res as Unit[];
        if(this.getAllUnits.length>0){
          for(var i=0;i<this.getAllUnits.length;i++){
            this.allUnitName.push(this.getAllUnits[i].name);
          }
        }
      })
  }

  getAllSuppliersMethod(){
this.allSuppliersEmail=[];
this.allSuppliersTelNo=[];
    this.suppliers.getAllSuppliers().subscribe(
      res=>{
        this.getAllSuppliers=res as Supplier[];
        if(this.getAllSuppliers.length>0){
          for(var i=0;i<this.getAllSuppliers.length;i++){
            this.allSuppliersEmail.push(this.getAllSuppliers[i].email);
            this.allSuppliersTelNo.push(this.getAllSuppliers[i].telNo);
          }
        }
      })
  }

  getAllBranchesMethod(){
    this.allBranchesName=[];
    this.allBranchTelNo=[];
    this.allBranchEmail=[];
    this.branches.getAllBranches().subscribe(
      res=>{
        this.getAllBranches=res as Branch[];
        if(this.getAllBranches.length>0){
          for(var i=0;i<this.getAllBranches.length;i++){
            this.allBranchesName.push(this.getAllBranches[i].name);
            this.allBranchTelNo.push(this.getAllBranches[i].phoneNo);
            this.allBranchEmail.push(this.getAllBranches[i].email);
          }
        }
      })
  }

  uniqueProductCode(control: FormControl){
    if(this.allProductCodes.indexOf(control.value)!=-1){
      return {'productCodeIsNotAllowed':true}
    }
    return null;
  }

  uniqueCategoryName(control: FormControl){
    if(this.allCategoriesName.indexOf(control.value)!=-1){
      return {'categoryNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueUnitName(control: FormControl){
    if(this.allUnitName.indexOf(control.value)!=-1){
      return {'unitNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueBrandName(control: FormControl){
    if(this.allBrandsName.indexOf(control.value)!=-1){
      return {'brandNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueBranchName(control:FormControl){
    if(this.allBranchesName.indexOf(control.value)!=-1){
      return{'branchNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueEmail(control: FormControl){
    if(this.allSuppliersEmail.indexOf(control.value)!=-1){
      return {'supplierEmailIsNotAllowed':true}
    }
    return null;
  }

  uniqueEmailBranch(control: FormControl){
    if(this.allBranchEmail.indexOf(control.value)!=-1){
      return {'branchEmailIsNotAllowed':true}
    }
    return null;
  }

  uniqueTelNo(control: FormControl){
    if(this.allSuppliersTelNo.indexOf(control.value)!=-1){
      return {'supplierTelNoIsNotAllowed':true}
    }
    return null;
  }

  uniqueTelNoBranch(control: FormControl){
    if(this.allBranchTelNo.indexOf(control.value)!=-1){
      return {'branchTelNoIsNotAllowed':true}
    }
    return null;
  }


  createNewProduct(){
    let body;

    if(this.form.get('productSupplier').value=='' && this.form.get('productBrand').value=='' && this.form.get('productCategory').value=='' && this.form.get('productBranch').value=='' ){
      body={
        "archived": false,
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value
      }
    }
    else if(this.form.get('productCategory').value=='' && this.form.get('productBrand').value=='' && this.form.get('productBranch').value==''){
      body={
        "archived": false,
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value,
        "suppliers": {
          "archived": false,
          "supplierId": Number(this.form.get('productSupplier').value)
        }
      }
    }
    else if(this.form.get('productCategory').value=='' && this.form.get('productSupplier').value=='' && this.form.get('productBranch').value==''){
      body={
        "archived": false,
        "brands": {
          "archived": false,
          "brandId": Number(this.form.get('productBrand').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value
      }
    }
    else if(this.form.get('productSupplier').value=='' && this.form.get('productBrand').value=='' && this.form.get('productBranch').value==''){
      body={
        "archived": false,
        "category": {
          "archived": false,
          "cateId": Number(this.form.get('productCategory').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value
      }
    }
    else if(this.form.get('productSupplier').value=='' && this.form.get('productBrand').value=='' && this.form.get('productCategory').value==''){
      body={
        "archived": false,
        "branch": {
          "archived": false,
          "branchId": Number(this.form.get('productBranch').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value
      }
    }
    else if(this.form.get('productCategory').value=='' && this.form.get('productBranch').value==''){
      body={
       "archived": false,
       "brands": {
         "archived": false,
         "brandId": Number(this.form.get('productBrand').value)
       },
       "costPrice": this.form.get('costPrice').value,
       "price": this.form.get('price').value,
       "productCode": this.form.get('productCode').value,
       "productDesc": this.form.get('productDes').value,
       "stockInUnit":this.form.get('productQuantity').value,
       "productGuar": this.form.get('productGuarantee').value,
       "productName": this.form.get('productName').value,
       "suppliers": {
         "archived": false,
         "supplierId": Number(this.form.get('productSupplier').value)
       }
     }
    }
    else if(this.form.get('productCategory').value=='' && this.form.get('productBrand').value==''){
    body={
     "archived": false,
     "branch": {
       "archived": false,
       "branchId": Number(this.form.get('productBranch').value)
     },
     "costPrice": this.form.get('costPrice').value,
     "price": this.form.get('price').value,
     "productCode": this.form.get('productCode').value,
     "productDesc": this.form.get('productDes').value,
     "stockInUnit":this.form.get('productQuantity').value,
     "productGuar": this.form.get('productGuarantee').value,
     "productName": this.form.get('productName').value,
     "suppliers": {
       "archived": false,
       "supplierId": Number(this.form.get('productSupplier').value)
     }
   }
    }
    else if(this.form.get('productCategory').value=='' && this.form.get('productSupplier').value==''){
  body={
   "archived": false,
   "brands": {
     "archived": false,
     "brandId": Number(this.form.get('productBrand').value)
   },
   "costPrice": this.form.get('costPrice').value,
   "price": this.form.get('price').value,
   "productCode": this.form.get('productCode').value,
   "productDesc": this.form.get('productDes').value,
   "stockInUnit":this.form.get('productQuantity').value,
   "productGuar": this.form.get('productGuarantee').value,
   "productName": this.form.get('productName').value,
   "branch": {
    "archived": false,
    "branchId": Number(this.form.get('productBranch').value)
  }
 }
    }
    else if(this.form.get('productBranch').value==''&&this.form.get('productBrand').value==''){
  body={
   "archived": false,
   "category": {
    "archived": false,
    "cateId": Number(this.form.get('productCategory').value)
  },
   "costPrice": this.form.get('costPrice').value,
   "price": this.form.get('price').value,
   "productCode": this.form.get('productCode').value,
   "productDesc": this.form.get('productDes').value,
   "stockInUnit":this.form.get('productQuantity').value,
   "productGuar": this.form.get('productGuarantee').value,
   "productName": this.form.get('productName').value,
   "suppliers": {
     "archived": false,
     "supplierId": Number(this.form.get('productSupplier').value)
   }
 }
    }
    else if(this.form.get('productBranch').value==''&& this.form.get('productSupplier').value==''){
    body={
   "archived": false,
   "category": {
    "archived": false,
    "cateId": Number(this.form.get('productCategory').value)
  },
   "costPrice": this.form.get('costPrice').value,
   "price": this.form.get('price').value,
   "productCode": this.form.get('productCode').value,
   "productDesc": this.form.get('productDes').value,
   "stockInUnit":this.form.get('productQuantity').value,
   "productGuar": this.form.get('productGuarantee').value,
   "productName": this.form.get('productName').value,
   "brands": {
    "archived": false,
    "brandId": Number(this.form.get('productBrand').value)
  }
 }
    }
    else if(this.form.get('productSupplier').value==''&&this.form.get('productBrand').value==''){
    body={
   "archived": false,
   "category": {
    "archived": false,
    "cateId": Number(this.form.get('productCategory').value)
  },
   "costPrice": this.form.get('costPrice').value,
   "price": this.form.get('price').value,
   "productCode": this.form.get('productCode').value,
   "productDesc": this.form.get('productDes').value,
   "stockInUnit":this.form.get('productQuantity').value,
   "productGuar": this.form.get('productGuarantee').value,
   "productName": this.form.get('productName').value,
   "branch": {
    "archived": false,
    "branchId": Number(this.form.get('productBranch').value)
  }
 }
    }
    else if(this.form.get('productCategory').value==''){
       body={
        "archived": false,
        "brands": {
          "archived": false,
          "brandId": Number(this.form.get('productBrand').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value,
        "suppliers": {
          "archived": false,
          "supplierId": Number(this.form.get('productSupplier').value)
        },
        "branch": {
          "archived": false,
          "branchId": Number(this.form.get('productBranch').value)
        }
      }
    }
    else if(this.form.get('productBrand').value==''){
      body={
        "archived": false,
        "category": {
          "archived": false,
          "cateId": Number(this.form.get('productCategory').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value,
        "suppliers": {
          "archived": false,
          "supplierId": Number(this.form.get('productSupplier').value)
        },
        "branch": {
          "archived": false,
          "branchId": Number(this.form.get('productBranch').value)
        }
      }
    }
    else if(this.form.get('productSupplier').value==''){
    body={
      "archived": false,
      "brands": {
        "archived": false,
        "brandId": Number(this.form.get('productBrand').value)
      },
      "category": {
        "archived": false,
        "cateId": Number(this.form.get('productCategory').value)
      },
      "costPrice": this.form.get('costPrice').value,
      "price": this.form.get('price').value,
      "productCode": this.form.get('productCode').value,
      "productDesc": this.form.get('productDes').value,
      "stockInUnit":this.form.get('productQuantity').value,
      "productGuar": this.form.get('productGuarantee').value,
      "productName": this.form.get('productName').value,
      "branch": {
        "archived": false,
        "branchId": Number(this.form.get('productBranch').value)
      }
    }
    }
    else if(this.form.get('productBranch').value==''){
      body={
        "archived": false,
        "brands": {
          "archived": false,
          "brandId": Number(this.form.get('productBrand').value)
        },
        "category": {
          "archived": false,
          "cateId": Number(this.form.get('productCategory').value)
        },
        "costPrice": this.form.get('costPrice').value,
        "price": this.form.get('price').value,
        "productCode": this.form.get('productCode').value,
        "productDesc": this.form.get('productDes').value,
        "stockInUnit":this.form.get('productQuantity').value,
        "productGuar": this.form.get('productGuarantee').value,
        "productName": this.form.get('productName').value,
        "suppliers": {
          "archived": false,
          "supplierId": Number(this.form.get('productSupplier').value)
        }
      }
    }
    else{
    body={
      "archived": false,
      "brands": {
        "archived": false,
        "brandId": Number(this.form.get('productBrand').value)
      },
      "category": {
        "archived": false,
        "cateId": Number(this.form.get('productCategory').value)
      },
      "costPrice": this.form.get('costPrice').value,
      "price": this.form.get('price').value,
      "productCode": this.form.get('productCode').value,
      "productDesc": this.form.get('productDes').value,
      "productGuar": this.form.get('productGuarantee').value,
      "productName": this.form.get('productName').value,
      "stockInUnit":this.form.get('productQuantity').value,
      "suppliers": {
        "archived": false,
        "supplierId": Number(this.form.get('productSupplier').value)
      },
      "branch": {
        "archived": false,
        "branchId": Number(this.form.get('productBranch').value)
      }
    }
    }

    console.log(body,"body");
    
    this.products.createProduct(body).toPromise().
    then(s => { this.toastr.success("Product "+ this.form.get('productName').value +" has successfully created.",s['message']); console.log(s);
    this.onReset();    
    this.getAllProductsMethod();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
  }

  createNewCategory(){
    let body={
        "archived": false,
        "cateName": this.categoryForm.get('categoryName').value
    }
    this.categories.createCategory(body).toPromise().
    then(s=>{this.toastr.success("Category "+this.categoryForm.get('categoryName').value+" has successfully created.",s['message']);this.getAllCategoriesMethod();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }

  createNewBrand(){
    let body={
        "archived": false,
        "brandName": this.brandForm.get('brandName').value
    }
    this.brands.createBrand(body).toPromise().
    then(s=>{this.toastr.success("Brand "+this.brandForm.get('brandName').value+" has successfully created.",s['message']);this.getAllBrandsMethod();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
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
    .then(s=>{this.toastr.success("Supplier "+this.supplierForm.get('supplierName').value+" has successfully created.",s['message']);this.getAllSuppliersMethod();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }

  createNewBranch(){

    if(this.unitsValues!=[]){
      for(var i =0;i<this.unitsValues.length;i++){
        this.getAllUnits.filter(x=>x.name==this.unitsValues[i].value).forEach(s=>this.unitIds.push(
        {
          "archived": false,
          "unitId": s.unitId
        }
        )
        )
      }
    }
console.log(this.unitIds,"this.unitIds");

    
    let body;
    if(this.unitsValues==[]){
      body={
        "address": this.branchForm.get('branchAddress').value,
        "archived": false,
        "email": this.branchForm.get('branchEmail').value,
        "faxNo": this.branchForm.get('branchFaxNo').value,
        "name": this.branchForm.get('branchName').value,
        "phoneNo": this.branchForm.get('branchTelNo').value
    }
    }
    else{
      body={
        "address": this.branchForm.get('branchAddress').value,
        "archived": false,
        "email": this.branchForm.get('branchEmail').value,
        "faxNo": this.branchForm.get('branchFaxNo').value,
        "name": this.branchForm.get('branchName').value,
        "phoneNo": this.branchForm.get('branchTelNo').value,
        "unit": this.unitIds
    }
    }
    this.branches.createBranch(body).toPromise()
    .then(s=>{this.toastr.success("Branch "+this.branchForm.get('branchName').value+" has successfully created.",s['message']);this.getAllBranchesMethod();this.onResetBranch();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }

  createNewUnit(){
    let body={
        "archived": false,
        "name": this.unitForm.get('unitName').value,
    }
    this.units.createUnit(body).toPromise()
    .then(s=>{this.toastr.success("Unit "+this.unitForm.get('unitName').value+" has successfully created.",s['message']);this.getAllUnitMethod();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }

  onReset(){
    this.form.get('costPrice').patchValue('');
    this.form.get('price').patchValue('');
    this.form.get('productCode').patchValue('');
    this.form.get('productDes').patchValue('');
    this.form.get('productGuarantee').patchValue('');
    this.form.get('productName').patchValue('');
    this.form.get('productBrand').patchValue('');
    this.form.get('productSupplier').patchValue('');
    this.form.get('productCategory').patchValue('');
    this.form.get('productBranch').patchValue('');
    this.form.get('productQuantity').patchValue('');
  }
  
  onResetBranch(){
    this.branchForm.get('branchAddress').patchValue('');
    this.branchForm.get('branchEmail').patchValue('');
    this.branchForm.get('branchFaxNo').patchValue('');
    this.branchForm.get('branchName').patchValue('');
    this.branchForm.get('branchTelNo').patchValue('');
    this.branchForm.get('branchUnit').patchValue('');
    this.unitsValues=[];
  }

  onResetCategory(){
    this.categoryForm.get('categoryName').patchValue('');
  }
}
