import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  billForm = new FormGroup({
    amount: new FormControl('', [Validators.pattern('^[0-9]*$')]),
  });

  billProducts: any = [];
  products: any = [];

  totalPrice: number = 0;

  returnAmount: any = 0;

  constructor(private productsService: ProductsService) {
    this.billProducts = this.productsService.billProducts;
    this.products = [...new Set(this.billProducts)];

    this.totalPrice = this.billProducts
      .reduce((acc: any, product: any) => acc + product.price, 0)
      .toFixed(2);
  }

  ngOnInit(): void {
    const amountControl = this.billForm.get('amount');
    if (amountControl) {
      amountControl.valueChanges.subscribe((value: any) => {
        if (value !== '') {
          this.returnAmount = (this.totalPrice - parseInt(value)).toFixed(2);
        } else {
          this.returnAmount = 0;
        }
      });
    }
  }

  closeBill() {
    this.productsService.toggleShowBill();
  }

  productQuantity(id: any) {
    let total = 0;

    this.billProducts.forEach((product: any) => {
      if (product.id === id) {
        total++;
      }
    });

    return total;
  }
}
