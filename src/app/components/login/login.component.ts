import { Component, inject } from '@angular/core';
import { ReactiveFormsModule ,FormGroup ,FormControl,Validators, AbstractControl, FormBuilder} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    private readonly _AuthService = inject(AuthService)
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _Router = inject(Router)
    msgSussess:boolean=false;
    msgError:string = " ";
    isLoading:boolean= false;
    loginForm : FormGroup= this._FormBuilder .group({
        email :[null ,[Validators.required ,Validators.email]] ,
        password : [null ,[Validators.required ,Validators.pattern(/^\w{6,}$/)]],
       
    })
  
  // loginForm : FormGroup=new FormGroup({
  //   name : new FormControl(null,[Validators.required ,Validators.minLength(3)  , Validators.maxLength(20)]),
  //   email : new FormControl(null,[Validators.required ,Validators.email]) ,
  //   password : new FormControl(null,[Validators.required ,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword : new FormControl(null),
  //   phone : new FormControl(null,[Validators.required ,Validators.pattern(/01[0125][0-9]{8}$/)]),
  
  // }, this.confirmPassword);
  
  
  login():void{
    this.isLoading= true;
  
    if(this.loginForm.valid){
    this._AuthService.setloginForm(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.message =='success'){
        this.msgSussess= true;
      setTimeout(()=>{
    this._Router.navigate(['/home'])
  
       },1000)
      }
         },
    error:(err: HttpErrorResponse)=>{
      this.msgError=err.error.message
      console.log(err);
      this.isLoading= false;
       }
  
  })
  }
  else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()
  }
  }

  }

