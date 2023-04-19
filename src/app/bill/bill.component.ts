import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from '../api/alerts.service';
import { UserService } from '../api/user.service';
import { OrdersService } from '../api/orders.service';

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

  orderType: string = 'Take Away';

  totalPrice: any = 0;

  userData: any;

  returnAmount: any = 0;

  constructor(private productsService: ProductsService, private alertService: AlertsService, private userService: UserService, private orderService: OrdersService) {
    this.billProducts = this.productsService.billProducts;
  }

  ngOnInit(): void {
    this.totalPrice = this.productsService.calculateTotalPrice();
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


    this.userService.getUserData().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        this.alertService.displayErrorAlert("Error", err.error.message);
      }
    );

  }



  closeBill() {
    this.productsService.toggleShowBill();
  }

  deleteProduct(productId: string) {
    this.productsService.removeProductFromBill(productId);
    this.totalPrice = this.productsService.calculateTotalPrice();
  }

  changeOrderType(type: string) {
    this.orderType = type;
  }

  productQuantity(id: any) {
    let total = 0;

    this.billProducts.forEach((product: any) => {
      if (product._id === id) {
        total++;
      }
    });

    return total;
  }


  saveOrder() {
    if (this.billProducts.length !== 0) {


      let productsWithQuantity = this.billProducts.map((product: any) => {
        return {
          product: product._id,
          quantity: product.quantity,
          note: product.note
        };
      });

      let data = {
        products: productsWithQuantity,
        orderType: this.orderType,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        length: this.productsService.totalBillProductsLength(),
        total: +this.totalPrice,
        customer: "643ff206323823a789851d96",
      }

      this.orderService.createOrder(data).subscribe(
        (res: any) => {
          this.alertService.displaySuccessAlert("Success", `Order saved successfully!`);
        },
        (err: any) => {
          this.alertService.displayErrorAlert("Error", err.error.message);
        }
      );

      this.productsService.resetBill();

    } else {
      this.alertService.displayErrorAlert("Error", "There is no products in the bill")
    }
  }

  printBill() {
    // Create the bill content
    let billContent = `
    <!DOCTYPE html>
<html>
<head>
	<title>Invoice</title>
	<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<section class="border-2 border-gray py-5">
  <div class="mx-auto max-w-5xl bg-white py-16">
    <article class="overflow-hidden">
      <div class="rounded-b-md bg-[white]">
        <div class="flex flex-wrap items-center justify-between">
          <div class="p-9">
          <div class="space-y-6 flex flex-col items-center text-slate-700">
            <img class="h-12 object-cover" src="https://th.bing.com/th/id/R.38b241ed1a1101a5e0336a671ca3eca2?rik=sBY0miRLAziN1g&pid=ImgRaw&r=0" />

            <p class="font-body text-xl font-extrabold uppercase tracking-tight">${this.userData.storeName}</p>
          </div>
        </div>
        <div class="p-9">
          <div class="flex items-center justify-center w-full">
            <div class="flex flex-col space-y-3">
              <div class="text-sm font-medium text-slate-500 flex space-x-2">
                <p>Invoice #:</p>
                <p  class="text-sm font-semibold text-slate-700">1002</p>
              </div>
              <div class="text-sm font-medium text-slate-500 flex space-x-2">
                <p>Customer:</p>
                <p  class="text-sm font-semibold text-slate-700">Hedayat Farahi</p>
              </div>
              <div class="text-sm font-medium text-slate-500 flex space-x-2">
                <p>Order Type:</p>
                <p  class="text-sm font-semibold text-slate-700">${this.orderType}</p>
              </div>
              <div class="text-sm font-medium text-slate-500 flex space-x-2">
                <p>Date:</p>
                <p  class="text-sm font-semibold text-slate-700">${new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div class="p-9">
          <div class="mx-0 mt-8 flex flex-col">
            <table class="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-slate-700 sm:pl-6 md:pl-0">Product</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-center text-sm font-bold text-slate-700 sm:table-cell">Quantity</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-center text-sm font-bold text-slate-700 sm:table-cell">Price</th>
                  <th scope="col" class="py-3.5 pl-3 pr-4 text-center text-sm font-bold text-slate-700 sm:pr-6 md:pr-0">Total Amount</th>
                </tr>
              </thead>
              <tbody>`;

              this.billProducts.forEach((product: any) => {
                billContent += `
                <tr class="border-b border-slate-200">
                  <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div class="font-medium text-slate-700">${product.name}</div>
                    <div class="mt-0.5 text-slate-500 sm:hidden">${product.quantity} unit at $${product.price}</div>
                  </td>
                  <td class="hidden px-3 py-4 text-center text-sm text-slate-500 sm:table-cell">${product.quantity}</td>
                  <td class="hidden px-3 py-4 text-center text-sm text-slate-500 sm:table-cell">$${product.price.toFixed(2)}</td>
                  <td class="py-4 pl-3 pr-4 text-center text-sm text-slate-500 sm:pr-6 md:pr-0">$${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
                `
              })
                

                billContent += `</tbody>
              <tfoot>
                <tr>
                  <th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-6 text-right text-sm font-light text-slate-500 sm:table-cell md:pl-0">Subtotal</th>
                  <th scope="row" class="pl-4 pr-3 pt-6 text-left text-sm font-light text-slate-500 sm:hidden">Subtotal</th>
                  <td class="pl-3 pr-4 pt-6 text-center text-sm text-slate-500 sm:pr-6 md:pr-0">$${this.totalPrice}</td>
                </tr>
                <tr>
                  <th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-4 text-right text-sm font-light text-slate-500 sm:table-cell md:pl-0">Discount</th>
                  <th scope="row" class="pl-4 pr-3 pt-6 text-left text-sm font-light text-slate-500 sm:hidden">Discount</th>
                  <td class="pl-3 pr-4 pt-6 text-center text-sm text-slate-500 sm:pr-6 md:pr-0">$0.00</td>
                </tr>

                <tr>
                  <th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-4 text-right text-base text-slate-700 sm:table-cell md:pl-0 font-semibold">Total</th>
                  <th scope="row" class="pl-4 pr-3 pt-4 text-left text-sm font-normal text-slate-700 sm:hidden">Total</th>
                  <td class="pl-3 pr-4 pt-4 text-center text-base font-bold text-slate-700 sm:pr-6 md:pr-0">$${this.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </article>
  </div>
</section>


            </body>
            </html>

`;

    // Open the print dialog box
    let printWindow = window.open('', '', 'height=500,width=800');
    printWindow?.document.write(billContent);
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  }


}
