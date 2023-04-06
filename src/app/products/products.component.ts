import { CategoriesService } from './../api/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  categories: any = [];
  allProducts: any = []
  products: any;
  totalProducts: number = 0;

  selectedMenu: string = "All";

 
  constructor(public productsService: ProductsService, public categoriesService: CategoriesService) {
    this.categories = categoriesService.categories;
    this.totalProducts = 0;
    this.products = productsService.products;
    for (let key in this.products) {
      this.totalProducts += this.products[key].length;
      this.allProducts.push({
        menuName: key,
        items: this.products[key]
      })
    }
  }

  ngOnInit(): void {
  }


  selectMenu(menuName: string){
    this.selectedMenu = menuName;
    
  }

  addToBill(product: any){
    this.productsService.addToBillProducts(product);
  }
  

}
