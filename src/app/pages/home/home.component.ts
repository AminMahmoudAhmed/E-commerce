import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);



  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
   items: 1,
    nav: false 
  }




  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  products:WritableSignal<IProduct[]> = signal([]);

  categories:WritableSignal<ICategory[]> = signal([]);

  wishlists:WritableSignal<IProduct[]> = signal([]);


  wishlist : string[] = [];
  
  ngOnInit(): void {
    this.getProductsData();
    this.getcategorysData();
   
      }
    
  

  

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products.set(res.data)
      }
    })

  }

  getcategorysData(): void {
   
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories.set(res.data)
      }
    })

  }



  


  addCartItem(id : string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.toastrService.success(res.message , 'FreshCart');
        
        this.cartService.cartNumber.set(res.numOfCartItems)

        console.log(this.cartService.cartNumber());
      } 
    })
  }




  
  addToWishlist(id : string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);

        this.wishlist = res.wishlist;

        console.log(this.wishlistService.myToken);

    
    
  }






    })
  }




  // removeToWishlist(id : string):void{
  //   this.wishlistService.removeProductFromWishlist(id).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //       this.wishlist = res.wishlist;

      
    
    
  // }






  //   })
  // }






  
  removeToWishlist(id : string):void{
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);

        this.wishlist = res.wishlist;

        

    
    
  }






    })
  }









}
