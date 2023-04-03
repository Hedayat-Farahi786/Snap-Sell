import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  products = {
    "All": [],
    "Steaks": [],
    "Coffee": [
      {
        id: 0,
        image: '../../assets/coffee/1.jpg',
        name: 'Americano Coffee',
        info: 'Coffee americano passion 2 shot caramel sauce',
        price: 5.30,
      },
      {
        id: 1,
        image: '../../assets/coffee/2.jpg',
        name: 'Espresso Coffee',
        info: 'Coffee esspresso passion 2 shot caramel sauce',
        price: 5.30,
        options: [
          {
            name: 'Sugar',
            values: [20, 40, 60]
          },
          {
            name: 'Ice',
            values: [20, 40, 60]
          }
        ]
      },
      {
        id: 2,
  
        image: '../../assets/coffee/3.jpg',
        name: 'Capacino Coffee',
        info: 'Coffee capacino passion 2 shot caramel sauce',
        price: 6.50,
        options: [
          {
            name: 'Sugar',
            values: [20, 40, 60]
          },
          {
            name: 'Sugar',
            values: [20, 40, 60]
          }
        ]
      },
      {
        id: 3,
  
        image: '../../assets/coffee/4.jpg',
        name: 'Latino Coffee',
        info: 'Coffee Latino passion 2 shot caramel sauce',
        price: 3.20,
      },
      {
        id: 4,
  
        image: '../../assets/coffee/5.jpg',
        name: 'Simple Coffee',
        info: 'Coffee Simple passion 2 shot caramel sauce',
        price: 2.50,
      }
    ],
    "Ice Cream": [],
    "Desserts": []
  }



  showBill: boolean = false;

  billProducts: any = [];


  constructor() {}


  addToBillProducts(product: any){
    this.billProducts.push(product);
  }


  toggleShowBill(){
    this.showBill = !this.showBill;
  }

}
