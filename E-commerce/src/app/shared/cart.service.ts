import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  headerToken:any = {
    token:localStorage.getItem('userToken')
  }
  constructor(private _HttpClient:HttpClient) { }

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
    {
      productId:id
    },
    {
      headers:this.headerToken
    })
  }

  getCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
    {
      headers:this.headerToken
    })
  }

  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`,{
      headers:this.headerToken
    })
  }
  updateCartItemCount(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${id}`
    ,
    {
      count:count
    },
    {
      headers:this.headerToken
    }
    )
  }
}
