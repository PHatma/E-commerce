import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrOfProducts:any[] ,term:string): any[] {
    return arrOfProducts.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
