import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient)

  myHeaders: any ={token :localStorage.getItem('userToken')}

  checkOut(id:string | null ,shippingDetails :object):Observable<any>
  {
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,
    {
      "shippingAddress":shippingDetails
    },
    {
      headers: this.myHeaders
    }
  )
  }
}
