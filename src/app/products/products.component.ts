import { CategoriesService } from './../api/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  loading = true;


  categories: any = [];
  products: any = [];
  allProducts: any = []
  totalProducts: number = 0;
  allMenu: any = {};

  displayProducts: any = [];

  selectedMenu: string = "";


  constructor(public productsService: ProductsService, public categoriesService: CategoriesService) {
    // this.categories = categoriesService.categories;
    // this.products = productsService.products;
    // this.totalProducts = 0;
    // for (let key in this.products) {
    //   this.totalProducts += this.products[key].length;
    //   this.allProducts.push({
    //     menuName: key,
    //     items: this.products[key]
    //   })
    // }
    // console.log(this.allProducts);

  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      }
    )

    this.productsService.getAllproducts().subscribe(
      (res: any) => {
        this.products = res;
        this.selectMenu('All');
        this.categories.forEach((category: any) => {
          let menuName = category.name;
          let items: any = [];
          this.products.forEach((product: any) => {
            if (product.category.name === category.name) {
              items.push(product);
            }
          });
          this.allProducts.push({
            menuName,
            items
          })
        });
    this.loading = false;
      }
    )
  }

  selectMenu(menuName: string) {
    this.selectedMenu = menuName;
    this.displayProducts = [];
    this.products.forEach((product: any) => {
      if (product.category.name === menuName) {
        this.displayProducts.push(product);
      }
    });
  }

  addToBill(product: any) {
    product.note = "";
    this.productsService.addToBillProduct(product);
  }


}
