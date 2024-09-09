import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)

  cardId :string|null   =" ";



  orders : FormGroup= this._FormBuilder .group({
      details : [null],
      phone :[null],
      city :[null],

  })
  orderSumbit():void{
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cardId ,this.orders.value).subscribe({
      next:(res)=>{
        console.log('cardID',this.cardId);
        if(res.status ==='success'){
          console.log(res.session.url);
          window.open(  res.session.url,'_self')
        }

      },
      error:(err)=>{
        console.log('faaaaaaaailed',err);

      }
    })

  }
  ngOnInit(): void {
    this._NgxSpinnerService.show('loading')
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cardId = params.get('id')
        console.log(this.cardId);
        this._NgxSpinnerService.show('loading')

      }
    })
  }
}
