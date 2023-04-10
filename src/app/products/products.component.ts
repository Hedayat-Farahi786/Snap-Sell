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
  products: any;
  allProducts: any = []
  totalProducts: number = 0;

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
    // this.totalProducts = 0;


    this.categoriesService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      }
    )

    this.productsService.getAllproducts().subscribe(
      (res: any) => {
        this.products = res;
        this.selectMenu(this.categories[0].name);
      }
    )



    this.categories.forEach((category: any) => {
      let menuName = category.name;
      let items: any = [];
      this.products.forEach((product: any) => {
        if(product.category === category.name){
          items.push(product);
        }
      });
      this.totalProducts += items.length;
      this.allProducts.push({
        id: category.id,
        menuName,
        items
      })
    });
  }

  selectMenu(menuName: string){
    this.selectedMenu = menuName;
    this.displayProducts = [];
    this.products.forEach((product: any) => {
      if(product.category.name === menuName){
        this.displayProducts.push(product);
      }
    });
  }

  addToBill(product: any){
    this.productsService.addToBillProducts(product);
  }
  

}
