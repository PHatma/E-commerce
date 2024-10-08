import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Category, Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy{

  constructor(private _CategoriesService:CategoriesService){}
  categorySubscripe:Subscription = new Subscription();
  data:Category[] = []
  ngOnInit(): void {
    this.categorySubscripe = this._CategoriesService.getAllCategories().subscribe({
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
    this.categorySubscripe.unsubscribe()
  }

}
