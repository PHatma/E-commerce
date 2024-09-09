import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ,RouterLink ,FormsModule ,SearchPipe,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit ,OnDestroy {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)


 
  text:string = " ";
 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  productList:IProduct[]=[];
  categoriesList:ICategory[]=[];
  getAllProductSub !:Subscription;



  ngOnInit():void {
    this._NgxSpinnerService.show('loading')
    this.getAllProductSub=  this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productList=res.data;
  },
  error:(err: HttpErrorResponse)=>{
    console.log(err);
  }
})
this._CategoriesService.getAllCategories().subscribe({
  next:(res)=>{
    console.log(res.data);
    this.categoriesList=res.data;
    this._NgxSpinnerService.hide('loading')

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
      this._CartService.cartNumber.next(res.numOfCartItems)
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
        this._ToastrService.success('It has been successfully aded to 💖' , 'FreshCart')
    },
    error:(err: HttpErrorResponse)=>{
    console.log(err);
    }
    })
    }
   
}
