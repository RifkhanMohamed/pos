import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBranchesComponent } from "../branches/Components/get-branches/get-branches.component";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatTableModule } from "@angular/material/table";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { TagInputModule } from 'ngx-chips';
const routes: Routes = [
  {
    path: '',
    component: GetBranchesComponent
  },
  {
    path: 'get',
    component: GetBranchesComponent
  }
];

@NgModule({
  declarations: [GetBranchesComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    RxReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    TagInputModule
  ]
})
export class BranchesModule { }
