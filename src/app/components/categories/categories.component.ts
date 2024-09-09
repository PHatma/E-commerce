import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule ,RouterLink ,FormsModule ,SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  

 
  categoriesList:ICategory[]=[];
  getCategory !:Subscription;



  ngOnInit(): void {
  this._NgxSpinnerService.show('loading')
  this.getCategory = this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoriesList=res.data;
      this._NgxSpinnerService.hide('loading')

  },
  error:(err: HttpErrorResponse)=>{
  console.log(err);
  }
  })
  }
  ngOnDestroy(): void {
  this.getCategory?.unsubscribe()
  }
}
