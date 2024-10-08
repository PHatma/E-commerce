import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private _AuthServiceService:AuthServiceService){}


  logout():void{
    this._AuthServiceService.userLogout()
  }
}
