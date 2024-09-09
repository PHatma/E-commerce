import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly _HttpClient = inject(HttpClient)
  myHeaders:any ={token :localStorage.getItem('userToken')}


  addProductToWishlist(id:string |null):Observable<any>
  {
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
    {
      "productId" :id
    },
    {
      headers:this.myHeaders
    }
  )
  }


  getProductToWishlist():Observable<any>
  {
  return  this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,

    {
      headers:this.myHeaders
    }
  )
  }



  deleteWishlistItem(id:string):Observable<any>
  {
  return  this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,

    {
      headers:this.myHeaders
    }
  )
  }
 
}
