import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  getBrand !:Subscription;
  bransList :IBrand[]=[];




  ngOnInit(): void {
  this._NgxSpinnerService.show('loading') 
  this.getBrand = this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.bransList =res.data
  this._NgxSpinnerService.hide('loading') 

  },
  error:(err: HttpErrorResponse)=>{
  console.log(err);
  }
  })
  }
  ngOnDestroy(): void {
  this.getBrand?.unsubscribe()
  }
}
