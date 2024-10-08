import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  constructor(private _AuthServiceService:AuthServiceService,private _Router:Router,private _FormBuilder:FormBuilder){}
  LoginSubscripe:Subscription = new Subscription();
  responseError:string = ''
  loading:boolean = false;
  // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  // })
  // FORMBUILDER SYNTAX
  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })
  login():void{
    // console.log(this.registerFrom.value);
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.loading = true
      this.LoginSubscripe= this._AuthServiceService.userLogin(this.loginForm.value).subscribe({
        next:(respo)=>{
          console.log(respo);
          this.loading = false
          localStorage.setItem('userToken',respo.token);
          this._AuthServiceService.saveToken();
          if(respo.message=='success'){
            this._Router.navigate(['/home'])
          }
        }, 
        error:(err)=>{
          this.loading = false
          console.log(err.error);
          this.responseError = err.error.message
        },
      })
    }
  }
  ngOnDestroy(): void {
    this.LoginSubscripe.unsubscribe();
  }

}
