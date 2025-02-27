import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

private readonly activatedRoute = inject(ActivatedRoute)
private readonly orderService = inject(OrderService)
   private readonly formBuilder =inject(FormBuilder);

cartId:string = "";


 checkoutForm:FormGroup = this.formBuilder.group({
  details: ['', [Validators.required]],
  phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
  city: ['', [Validators.required]],
  } ) ;


  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param)=>{   

       this.cartId = param.get('id')!;  


      }
      )
  }
  submitForm(): void {

     
      console.log(this.checkoutForm.value)

      this.orderService.checkOutSession(this.cartId ,this.checkoutForm.value ).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === 'success'){
           open(res.session.url , '_self')
          }
         
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }   

