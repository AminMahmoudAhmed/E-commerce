import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [ RouterLink ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

private readonly wishlistService = inject(WishlistService);
private readonly cartService = inject(CartService);
wishlist :string = '';

 products:WritableSignal<IProduct[]> = signal([]);
 wistlist:WritableSignal<IProduct[]> = signal([]);

  ngOnInit(): void {
      this.wishlistService.getLoggedUserWishlist().subscribe({

      next: (res) => {
      
        console.log(res.wishlist);
        this.products.set(res.data);


     


      },
      })
      
  }




  addCartItem(id : string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

       
        
        this.cartService.cartNumber.set(res.numOfCartItems)

        console.log(this.cartService.cartNumber());
      } 
    })
  }




  addToWishlist(id : string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);

        console.log(this.wishlistService.myToken);

    
    
  }






    })
  }



  removeToWishlist(id : string):void{
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);

        this.wistlist = res.wishlist;

        

    
    
  }






    })
  }









  
}
