import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {










  private readonly activatedRoute = inject(ActivatedRoute)
    private readonly categoriesService = inject(CategoriesService)
  
  detailsCategory: ICategory | null = null;

  idCategory : string | null = null;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
          next:(res)=>{

      this.idCategory = res.get('id');
  
            this.categoriesService.getSpecificCategory(this.idCategory).subscribe({
              next:(res)=>{
                console.log(res.data);
                this.detailsCategory = res.data
              },
              error:(err)=>{
                console.error(err);
              }
            })
  
          }
        })
    }
  
  
}
