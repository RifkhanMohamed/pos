import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : "products", loadChildren : () => import('./products/products.module').then(m=>m.ProductsModule)},
  {path : "branches", loadChildren : () => import('./branches/branches.module').then(m=>m.BranchesModule)},
  {path : "suppliers", loadChildren : () => import('./suppliers/suppliers.module').then(m=>m.SuppliersModule)},
  {path : "login", loadChildren : () => import('./login/login.module').then(m=>m.LoginModule)},
  {path : "categories", loadChildren : () => import('./categories/categories.module').then(m=>m.CategoriesModule)},
  {path : "units", loadChildren : () => import('./units/units.module').then(m=>m.UnitsModule)},
  {path : "brands", loadChildren : () => import('./brands/brands.module').then(m=>m.BrandsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
