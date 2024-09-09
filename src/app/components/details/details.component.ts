import { IProduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  

  text:string = " ";
  productList:IProduct[]=[];
  categoriesList:ICategory[]=[];
  getAllProductSub !:Subscription;


  detailsProduct :IProduct |null = null

ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(p)=>{
  let idproduct = p.get('id');
  this._ProductsService.getSpecificProducts(idproduct).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.detailsProduct= res.data;
      
    },
    error:(err: HttpErrorResponse)=>{
      console.log(err);
      
    },
  })

  }
})

}
addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this._ToastrService.success(res.message , 'FreshCart')
  },
  error:(err: HttpErrorResponse)=>{
  console.log(err);
  }
  })
  }
  addWishList(id:string):void{
    this._WishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this._ToastrService.success(res.message , 'FreshCart')
    },
    error:(err: HttpErrorResponse)=>{
    console.log(err);
    }
    })
    }
}
