import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  private readonly cartService = inject(CartService)


  cartDetails: ICart = {} as ICart



  ngOnInit(): void {
    this.getCartData();
  }





  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      }
    })
  }




  removeItem(id: string): void {

    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.cartService.cartNumber.set(res.numOfCartItems)

      }

    })


  }




  updateItem(id: string , count: number): void {

    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      }
    })


  }








  clearCart(): void {


    // Sweetalert2

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res.data);
            if (res.message === 'success') {
              this.cartDetails = {} as ICart;
              this.cartService.cartNumber.set(0)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          }
        })


      
      }
    });





  }






}
