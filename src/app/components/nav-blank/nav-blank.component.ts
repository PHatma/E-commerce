import { Component ,inject, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  countNum :number=0;
   readonly _AuthService = inject(AuthService)
   readonly _CartService = inject(CartService)
   ngOnInit(): void {
    this._CartService.getProductToCart().subscribe({
      next :(res)=>{
      console.log('cart items' ,res);
              this._CartService.cartNumber.next(res.numOfCartItems)

      }
    })
   this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.countNum =data;
    }
   }) 
   }

}
