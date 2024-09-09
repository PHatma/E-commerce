import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly _HttpClient = inject(HttpClient)
  myHeaders:any ={token :localStorage.getItem('userToken')}


  addProductToCart(id:string |null):Observable<any>
  {
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
    {
      "productId" :id
    },
    {
      headers:this.myHeaders
    }
  )
  }


  getProductToCart():Observable<any>
  {
  return  this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,

    {
      headers:this.myHeaders
    }
  )
  }
  deleteCartItem(id:string):Observable<any>
  {
  return  this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,

    {
      headers:this.myHeaders
    }
  )
  }
  updateCartItem(id:string , newCount : number):Observable<any>
  {
  return  this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,

    {
      "count":newCount
    },
    {
      headers:this.myHeaders
    }
  )
  }
  clearCard():Observable<any>
  {
  return  this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,


    {
      headers:this.myHeaders
    }
  )
  }
}
