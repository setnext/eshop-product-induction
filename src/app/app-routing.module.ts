import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CompletePageComponent } from './complete-page/complete-page.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormPageComponent } from './form-page/form-page.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductWizardComponent } from './product-wizard/product-wizard.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent,pathMatch: 'full'},
  {path:'plist',component:ProductListComponent,pathMatch: 'full'},
  {path:'pcreate',component:CreateProductComponent,pathMatch: 'full'},
  {path:'create-category',component:CreateCategoryComponent,pathMatch: 'full'},
  {
    path: 'create-product',
    component: ProductWizardComponent
  },
  {
    path: 'complete',
    component: CompletePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
