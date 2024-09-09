import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  step :number = 1;
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  verifyEmail : FormGroup=new FormGroup({
      email : new FormControl(null,[Validators.required ,Validators.email]) ,
     
    })
    verifyCode: FormGroup=new FormGroup({
      resetCode : new FormControl(null,[Validators.required ,Validators.pattern(/^[0-9]{6}$/)]) ,
     
    })
    resetPassword: FormGroup=new FormGroup({
      email : new FormControl(null,[Validators.required ,Validators.email]) ,
      newPassword : new FormControl(null,[Validators.required ,Validators.pattern(/^\w{6,}$/)]) ,
     
    })


    verifyEmailSubmit():void{
      let emailVal = this.verifyEmail.get('email')?.value
      this.resetPassword.get('email')?.patchValue(emailVal)
      this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.statusMsg ==='success'){
            this.step=2;
          }

            },
            error:(err: HttpErrorResponse)=>{
              console.log(err);
              
            },
      })
    }
    verifyCodeSubmit():void{
      this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status ==='Success'){
            this.step=3;
          }

            },
            error:(err: HttpErrorResponse)=>{
              console.log(err);
              
            },
      })
    }
    resetPasswordSubmit():void{
      this._AuthService.resetPass(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('userToken' ,res.token)

            },
            error:(err: HttpErrorResponse)=>{
              console.log(err);
              this._AuthService.saveUserData()
              this._Router.navigate(['/home'])
            },
      })
    }
}
