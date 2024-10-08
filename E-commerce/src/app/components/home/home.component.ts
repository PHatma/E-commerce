import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { EcommDataService } from 'src/app/shared/ecomm-data.service';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  dataSubscripe:Subscription = new Subscription();
  categorySubscripe:Subscription = new Subscription();
  addtocartSubscripe:Subscription = new Subscription();
  products:Product[] = []
  category:Category[] = []
  constructor(private _EcommDataService:EcommDataService,private _CartService:CartService,private _toastr: ToastrService){}
  ngOnInit(): void {
    this.dataSubscripe = this._EcommDataService.getAllProducts().subscribe({
      next:(respo)=>{ 
        console.log(respo.data);
        this.products = respo.data
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.categorySubscripe = this._EcommDataService.getAllCategories().subscribe({
      next:(respo)=>{
        console.log(respo.data);
        this.category = respo.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.dataSubscripe.unsubscribe();
    this.categorySubscripe.unsubscribe();
    this.addtocartSubscripe.unsubscribe();
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


  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 900,
    autoplay:true,
    autoplayTimeout:3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

}
