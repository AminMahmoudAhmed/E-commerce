import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IUserorders } from '../../shared/interfaces/iuserorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly orderService = inject(OrderService)
  private readonly authService = inject(AuthService)


  userId : string = '';

  // allOrdersList: IUserorders[] = [];
  allOrdersList:WritableSignal<IUserorders[]> = signal([]);



  ngOnInit(): void {

this.authService.getUserData();
this.userId = this.authService.userData.id;

      this.orderService.getUserOrders(this.userId ).subscribe({
        next: (res) => {
          console.log(res);
          this.allOrdersList.set(res);
          // this.allOrdersList = res;
        }
      })
  }
}
