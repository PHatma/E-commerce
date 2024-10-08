import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  // {path:'', redirectTo:'home',pathMatch:'full'},
  // {path:'home',component:HomeComponent,title:'Home'},
  // {path:'about',component:AboutComponent,title:'About'},
  // {path:'cart',component:CartComponent,title:'Cart'},
  // {path:'login',component:LoginComponent,title:'Login'},
  // {path:'register',component:RegisterComponent,title:'Register'},
  // {path:'categories',component:CategoriesComponent,title:'Categories'},
  // {path:'products',component:ProductsComponent,title:'Products'},
  // {path:'brands',component:BrandsComponent,title:'Brands'},
  // {path:'**',component:NotFoundComponent,title:'404 NOT FOUND'},
  {path:'',component:LayoutMainComponent,canActivate:[authGuard],children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'Home' },
    {path:'cart',component:CartComponent,title:'Cart'},
    {path:'categories',component:CategoriesComponent,title:'Categories'},
    {path:'details/:id',component:AboutComponent,title:'Details'},
    {path:'products',component:ProductsComponent,title:'Products'},
    {path:'brands',component:BrandsComponent,title:'Brands'},
  ]},
  {path:'',component:LayoutAuthComponent,children:[
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'}
  ]},
  {path:'**',component:NotFoundComponent,title:'404 NOT FOUND'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
