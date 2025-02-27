import { Component, computed, inject, input, InputSignal, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

 private readonly authService = inject(AuthService)
  private readonly myTranslateService = inject(MyTranslateService)
 private readonly translateService = inject(TranslateService)
   private readonly cartService = inject(CartService);


isLogin :InputSignal<boolean> = input<boolean>(true)

countCart:Signal<number> = computed(()=>this.cartService.cartNumber())
countRemove:Signal<number> = computed(()=>this.cartService.cartNumber())

ngOnInit(): void {
 

if( this.isLogin()){
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartService.cartNumber.set(res.numOfCartItems)
    }
  })

}



}

logout():void{

this.authService.logout();
}

change(lang:string):void{

this.myTranslateService.changeLangTranslate(lang);


}


currentLang(lang:string):boolean{

return this.translateService.currentLang === lang

}

}
