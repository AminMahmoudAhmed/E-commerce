import { Component, inject } from '@angular/core';
import{ FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly authService = inject(AuthService);
 private readonly formBuilder =inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  msgError:string = '';
  success :string = '';

  loginForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  // loginForm:FormGroup = new FormGroup({
  
  //   email: new FormControl(null,[Validators.required,Validators.email]),
  //   password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
   
  // } );

   submitForm():void{

  if(this.loginForm.valid){
    this.isLoading = true;
    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          
      setTimeout(() => {
        localStorage.setItem("token", res.token);

          this.authService.getUserData();   


        
        this.router.navigate(['/home']) 
      }, 500);

        this.success = res.message


        }
        this.isLoading = false;
      },
      error:(err: HttpErrorResponse)=>{
   
        console.log(err);
        this.msgError = err.error.message
        this.isLoading = false;
  
      }
     })
  }
  }


}
