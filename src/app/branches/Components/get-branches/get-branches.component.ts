import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {Sort} from '@angular/material/sort';
import { BranchesService } from "../../Services/branches.service";
import { Branch } from "../../Modals/branch";
import { Unit } from "../../../units/Modals/unit";
import { BranchesModule } from '../../branches.module';
import { FormGroup,FormControl ,FormBuilder,Validators,} from '@angular/forms';
import { UnitsService } from 'src/app/units/Services/units.service';
@Component({
  selector: 'app-get-branches',
  templateUrl: './get-branches.component.html',
  styleUrls: ['./get-branches.component.css']
})
export class GetBranchesComponent implements OnInit {
  getAllBranches:Branch[];
  sortedData: Branch[];
  getAllUnits:Unit[];

  branchForm=new FormGroup({});
  unitForm=new FormGroup({});

  allBranchTelNo=[];
  allBranchesName=[];
  allBranchEmail=[];
  allUnitName=[];
  unitsValues=[];
  unitIds=[];

  searchText:any;
  p:number=1;
  total:number;
  itemsPerPage:number=10;
  constructor(private units: UnitsService,private toastr: ToastrService,private fb: FormBuilder,private http: HttpClient,private router: Router,private branch:BranchesService) {
this.getAllBranchesMethod();
this.getAllUnitMethod();

this.branchForm=fb.group({
  branchAddress:new FormControl(''),
  branchName:new FormControl('',[Validators.required,this.uniqueBranchName.bind(this)]),
  branchTelNo:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.uniqueTelNoBranch.bind(this)]),
  branchEmail:new FormControl('',[Validators.required,Validators.email,this.uniqueEmailBranch.bind(this)]),
  branchFaxNo:new FormControl(''),
  branchUnit:new FormControl('')
})

this.unitForm= fb.group({
  unitName:new FormControl('',[Validators.required,this.uniqueUnitName.bind(this)])
})

   }

  ngOnInit(): void {
  }

  uniqueBranchName(control:FormControl){
    if(this.allBranchesName.indexOf(control.value)!=-1){
      return{'branchNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueUnitName(control: FormControl){
    if(this.allUnitName.indexOf(control.value)!=-1){
      return {'unitNameIsNotAllowed':true}
    }
    return null;
  }

  uniqueEmailBranch(control: FormControl){
    if(this.allBranchEmail.indexOf(control.value)!=-1){
      return {'branchEmailIsNotAllowed':true}
    }
    return null;
  }

  uniqueTelNoBranch(control: FormControl){
    if(this.allBranchTelNo.indexOf(control.value)!=-1){
      return {'branchTelNoIsNotAllowed':true}
    }
    return null;
  }

  getAllBranchesMethod(){
    this.allBranchesName=[];
    this.allBranchTelNo=[];
    this.allBranchEmail=[];
    this.branch.getAllBranches().subscribe(
      res=>{
        this.getAllBranches=res as Branch[];
        if(this.getAllBranches.length>0){
          for(var i=0;i<this.getAllBranches.length;i++){
            this.allBranchesName.push(this.getAllBranches[i].name);
            this.allBranchTelNo.push(this.getAllBranches[i].phoneNo);
            this.allBranchEmail.push(this.getAllBranches[i].email);
          }
        }
        this.total=this.getAllBranches.length;
        this.sortedData = this.getAllBranches.slice();
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

  sortData(sort: Sort) {
    const data = this.getAllBranches.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'phoneNo': return compare(a.phoneNo, b.phoneNo, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'faxNo': return compare(a.faxNo, b.faxNo, isAsc);
        case 'unit': return compare(a.unit.name, b.unit.name, isAsc);
        default: return 0;
      }
    });
  }

  createNewBranch(){

    if(this.unitsValues!=[]){
      for(var i =0;i<this.unitsValues.length;i++){
        this.getAllUnits.filter(x=>x.name==this.unitsValues[i].value).forEach(s=>this.unitIds.push(
        {
          "archived": true,
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
        "archived": true,
        "email": this.branchForm.get('branchEmail').value,
        "faxNo": this.branchForm.get('branchFaxNo').value,
        "name": this.branchForm.get('branchName').value,
        "phoneNo": this.branchForm.get('branchTelNo').value
    }
    }
    else{
      body={
        "address": this.branchForm.get('branchAddress').value,
        "archived": true,
        "email": this.branchForm.get('branchEmail').value,
        "faxNo": this.branchForm.get('branchFaxNo').value,
        "name": this.branchForm.get('branchName').value,
        "phoneNo": this.branchForm.get('branchTelNo').value,
        "unit": this.unitIds
    }
    }
    this.branch.createBranch(body).toPromise()
    .then(s=>{this.toastr.success("Branch "+this.branchForm.get('branchName').value+" has successfully created.",s['message']);this.getAllBranchesMethod();this.onResetBranch();})
    .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }

  onEdit(id){

  }
  onDelete(id){
    let branchName;
    this.getAllBranches.filter(s=>s.branchId==id).forEach(x=>branchName=x.name);
   this.branch.deleteBranch(id).toPromise().
   then(s => { this.toastr.success( branchName+" Successfully Deleted..!");this.getAllBranchesMethod();})
   .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);}); 
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

  createNewUnit(){
    let body={
      "archived": true,
      "name": this.unitForm.get('unitName').value,
  }
  this.units.createUnit(body).toPromise()
  .then(s=>{this.toastr.success("Unit "+this.unitForm.get('unitName').value+" has successfully created.",s['message']);this.getAllUnitMethod();})
  .catch(s=>{ this.toastr.error("Error", s['error']['message']); console.log(s);})
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }