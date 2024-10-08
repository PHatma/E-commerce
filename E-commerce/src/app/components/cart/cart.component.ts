import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy{

  cartSubs:Subscription = new Subscription();
  cartSubsUpdate:Subscription = new Subscription();
  cartSubsRemove:Subscription = new Subscription();
  cartData:any = {}

  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    this.cartSubs = this._CartService.getCart().subscribe({
      next:(respo)=>{
        console.log(respo.data);
        this.cartData = respo.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  removeItem(id:string):void{
    this.cartSubsRemove = this._CartService.removeCartItem(id).subscribe({
      next:(respo)=>{
        console.log(respo.data);
        this.cartData = respo.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  changeCount(id:string,count:number):void{
    if(count>=1){
      this.cartSubsUpdate = this._CartService.updateCartItemCount(id,count).subscribe({
        next:(respo)=>{
          console.log(respo.data);
          this.cartData = respo.data
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.cartSubs.unsubscribe();
    this.cartSubsRemove.unsubscribe();
    this.cartSubsUpdate.unsubscribe();
   }


}
