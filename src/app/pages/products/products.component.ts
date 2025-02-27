import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-products',
  imports: [SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  
    private readonly productsService = inject(ProductsService);
search :  string = '';

  products:WritableSignal<IProduct[]> = signal([]);


  ngOnInit(): void {
    this.getProductsData();
    
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products.set(res.data)
      }
    })


}
}