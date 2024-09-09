import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _CartService = inject(CartService)
  cartDetails : ICart ={} as ICart
  numOfCartItems:BehaviorSubject<number> = new BehaviorSubject(0);

  ngOnInit(): void {
    this._NgxSpinnerService.show('loading')
    this._CartService.getProductToCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber .next(res.numOfCartItems)
        this.numOfCartItems= res.numOfCartItems
        console.log(res.numOfCartItems);
        this.cartDetails =res.data
        this._NgxSpinnerService.hide('loading')

    },
    error:(err: HttpErrorResponse)=>{
    console.log(err);
    }
    })
  }
  remove(id:string):void{
    this._CartService.deleteCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails =res.data
        this._CartService.cartNumber.next(res.numOfCartItems)
    },
    error:(err: HttpErrorResponse)=>{
    console.log(err);
    }
    })
  }
  update(id:string ,count:number):void{
  if(count>0){
    this._CartService.updateCartItem(id ,count).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails =res.data
    },
    error:(err: HttpErrorResponse)=>{
    console.log(err);
    }
    })
  }else{
    this.remove(id)
  }


  }
  clear():void{
  this._CartService.clearCard().subscribe({
    next:(res)=>{
      console.log(res.numOfCartItems);
       if(res.message =='success'){
          this.cartDetails ={} as ICart
          this._CartService.cartNumber.next(0)
          }
 },
  error:(err: HttpErrorResponse)=>{
  console.log(err);
  }
})
  }
}

