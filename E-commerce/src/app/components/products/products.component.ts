import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{

  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private _toastr: ToastrService){}
  productsSubscripe:Subscription = new Subscription();
  addtocartSubscripe:Subscription = new Subscription();
  products:Product[] = []



  ngOnInit(): void {
    this.productsSubscripe = this._ProductsService.getAllProducts().subscribe({
      next:(respo)=>{ 
        console.log(respo.data);
        this.products = respo.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  addtoCart(id:string):void{
    this.addtocartSubscripe = this._CartService.addToCart(id).subscribe({
      next:(respo)=>{
        console.log(respo);
        this._toastr.success(respo.message);
      },
      error:(err)=>{
        console.log(err);
        this._toastr.error(err.message, 'Major Error', {
          timeOut: 3000,
        });
      }
    })
  }



  

  ngOnDestroy(): void {
    this.productsSubscripe.unsubscribe()
  }

}
