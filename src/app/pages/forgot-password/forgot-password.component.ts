import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  step:number = 1;
  isLoading: boolean = false;


  verifyEmailForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
   
  });


  verifyCodeForm:FormGroup = this.formBuilder.group({
    resetCode: ['', [Validators.required, Validators.pattern(/^\w{6}$/)]],
 
  });


  verifyResetPasswordForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });



sendVerifyEmailForm():void {

if( this.verifyEmailForm.value ){
  this.authService.sendVerifyEmail(this.verifyEmailForm.value).subscribe({
    next:(res)=>{
      if(res.statusMsg === 'success'){
        this.step = 2;
      }
    
    },
 
  } )
}



}

sendVerifyCodeForm(): void {


if(this.verifyCodeForm.value){
  this.authService.sendVerifyCode(this.verifyCodeForm.value).subscribe({
    next:(res)=>{
      if(res.status === 'Success'){
        this.step = 3;
      }
 
    },
  
  })
}

}

sendVerifyResetPasswordForm(): void {



  if(this.verifyResetPasswordForm.value){
    
  this.authService.sendResetPassword(this.verifyResetPasswordForm.value).subscribe({
    next:(res)=>{
      this.router.navigate(['/login'])
     },
    
  } )
}
  }








}