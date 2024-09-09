import { Component, inject, OnInit } from '@angular/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule ,RouterLink ,FormsModule ,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)


  text:string = " ";
  productList:IProduct[]=[];
  categoriesList:ICategory[]=[];
  getAllProductSub !:Subscription;



  ngOnInit(): void {
    this._NgxSpinnerService.show('loading')
    this.getAllProductSub=  this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.productList=res.data;
          this._NgxSpinnerService.hide('loading')

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
  ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
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
    
}
