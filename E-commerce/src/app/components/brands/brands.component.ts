import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from 'src/app/shared/brands.service';
import { Category } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  constructor(private _BrandsService:BrandsService){}
  brandSubscripe:Subscription = new Subscription();
  data:Category[] = []
  ngOnInit(): void {
    this.brandSubscripe = this._BrandsService.getAllbrands().subscribe({
      next:(respo)=>{
        console.log(respo.data);
        this.data = respo.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

    
  ngOnDestroy(): void {
    this.brandSubscripe.unsubscribe()
  }
}
