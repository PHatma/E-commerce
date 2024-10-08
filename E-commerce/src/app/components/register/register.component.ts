import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  constructor(private _AuthServiceService:AuthServiceService,private _Router:Router){}
  registerSubscripe:Subscription = new Subscription();
  responseError:string = ''
  loading:boolean = false;
  registerFrom:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:[this.passwordConfirm]} as FormControlOptions )


  passwordConfirm(group:FormGroup){
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if(rePassword?.value===''){
      rePassword.setErrors({required:true})
    }else if(rePassword?.value !== password?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  register():void{
    // console.log(this.registerFrom.value);
    if(this.registerFrom.valid){
      this.loading = true
      this.registerSubscripe= this._AuthServiceService.registerUser(this.registerFrom.value).subscribe({
        next:(respo)=>{
          console.log(respo);
          this.loading = false
          if(respo.message=='success'){
            this._Router.navigate(['/login'])
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
    this.registerSubscripe.unsubscribe();
  }
}
