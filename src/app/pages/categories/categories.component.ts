import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

categories:WritableSignal<ICategory[]> = signal([]);

 private readonly categoriesService = inject(CategoriesService);

ngOnInit(): void {

  this.getcategorysData();
}



getcategorysData(): void {
   
  this.categoriesService.getAllCategories().subscribe({
    next: (res) => {
      console.log(res.data);
      this.categories.set(res.data)
    }
  })

}


}
