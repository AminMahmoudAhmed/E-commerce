import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)

detailsProduct: IProduct | null = null;

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(res)=>{
          let idProduct = res.get('id');

          this.productsService.getSpecificProducts(idProduct!).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct = res.data
            },
            error:(err)=>{
              console.error(err);
            }
          })

        }
      })
  }

}
