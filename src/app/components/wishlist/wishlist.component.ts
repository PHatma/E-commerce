import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IWish } from '../../core/interfaces/iwish';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgFor ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})

  export class WishlistComponent  implements OnInit {
    private readonly _NgxSpinnerService = inject(NgxSpinnerService)
    private readonly _WishlistService = inject(WishlistService)
    private readonly _CartService = inject(CartService)
    private readonly _ToastrService = inject(ToastrService)


    cartDetails : IWish[] =[]
    numOfCartItems:BehaviorSubject<number> = new BehaviorSubject(0);
  
    ngOnInit(): void {
      this._NgxSpinnerService.show('loading')
      this._WishlistService.getProductToWishlist().subscribe({
        next:(res)=>{          
          this.cartDetails =res.data
          console.log('Doneeeee yarab',this.cartDetails );
          this._NgxSpinnerService.hide('loading')
  
      },
      error:(err: HttpErrorResponse)=>{
      console.log(err);
      }
      })
    }
    remove(id:string):void{
      this._WishlistService.deleteWishlistItem(id).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.cartDetails =res.data
      },
      error:(err: HttpErrorResponse)=>{
      console.log(err);
      }
      })
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
     
    
  }

