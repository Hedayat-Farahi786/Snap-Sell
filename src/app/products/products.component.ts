import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {




  menus = [
    {
      icon: '../../assets/icons/products/icons8-list-view-100.png',
      name: 'All',
      active: true
    },
    {
      icon: '../../assets/icons/products/icons8-steak-100.png',
      name: 'Steaks'
    },
    {
      icon: '../../assets/icons/products/icons8-takeaway-hot-drink-100.png',
      name: 'Coffee'
    },
    {
      icon: '../../assets/icons/products/icons8-ice-cream-cone-100.png',
      name: 'Ice Cream'
    },
    {
      icon: '../../assets/icons/products/icons8-cake-100.png',
      name: 'Desserts'
    },
  ]


  products: any;

  selectedMenu: any = "All";

 
  constructor(public productsService: ProductsService) {
    this.products = productsService.products;
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
