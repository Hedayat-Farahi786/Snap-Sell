import { Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from './alerts.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  addProductForm!: FormGroup;
  editProductForm!: FormGroup;


  products: any = {};

  showBill: boolean = false;

  billProducts: any = [];

  showAddProduct: boolean = false;
  showEditProduct: boolean = false;



  categories: any = [];


  productToEditId: any;
  settingProducts: any = [];


  constructor(private categoriesService: CategoriesService, private alertService: AlertsService, private http: HttpClient) {
    
    this.getAllproducts().subscribe(
      (res: any) => {
        this.products = res;
      }
    )


    this.addProductForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      image: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      info: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })

    this.editProductForm = new FormGroup({
      category: new FormControl(''),
      image: new FormControl('../../assets/icons/products/icons8-image-100.png'),
      name: new FormControl(''),
      info: new FormControl(''),
      price: new FormControl('')
    })

  }


  calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.billProducts.length; i++) {
      totalPrice += this.billProducts[i].price * this.billProducts[i].quantity;
    }
    return totalPrice.toFixed(2);
  }



  getAllproducts(){
    return this.http.get(environment.backendUrl + "products");
  }


  addNewProduct(){
    let data = {
      product_image: this.addProductForm.get('image')?.value,
      name: this.addProductForm.get('name')?.value,
      info: this.addProductForm.get('info')?.value,
      price: this.addProductForm.get('price')?.value,
      category: this.addProductForm.get('category')?.value,
    }
   return this.http.post(environment.backendUrl + "products", data);
  }

  onAddProductImageSelect(event: any){
    const file = event.target.files[0];
    this.addProductForm.get('image')?.setValue(file);
    console.log(this.addProductForm.get('image')?.value);
  }

  deleteProduct(id: any){
    return this.http.delete(environment.backendUrl + "products/" + id);
  }


  editProduct(){
    let data = this.editProductForm.value;
  
    return this.http.patch(environment.backendUrl + "products/" + this.productToEditId, data);
  }

  openEditProduct(product: any){

    this.productToEditId = product._id;

    this.editProductForm.get('category')?.setValue(product.category._id);
    this.editProductForm.get('image')?.setValue(product.image);
    this.editProductForm.get('name')?.setValue(product.name);
    this.editProductForm.get('info')?.setValue(product.info);
    this.editProductForm.get('price')?.setValue(product.price);

    this.toggleShowEditProduct();
  }

  toggleShowAddProduct(){
    this.showAddProduct = !this.showAddProduct;
  }

  toggleShowEditProduct(){
    this.showEditProduct = !this.showEditProduct;
  }


  addToBillProduct(product: any) {
    let productFound = false;
    for (let i = 0; i < this.billProducts.length; i++) {
      if (this.billProducts[i]._id === product._id) {
        this.billProducts[i].quantity++;
        productFound = true;
        break;
      }
    }
    if (!productFound) {
      product.quantity = 1;
      this.billProducts.push(product);
    }
  }
  
  removeProductFromBill(productId: string) {
    let indexToRemove = -1;
    for (let i = 0; i < this.billProducts.length; i++) {
      if (this.billProducts[i]._id === productId) {
        if (this.billProducts[i].quantity > 1) {
          this.billProducts[i].quantity--;
        } else {
          indexToRemove = i;
        }
        break;
      }
    }
    if (indexToRemove >= 0) {
      this.billProducts.splice(indexToRemove, 1);
    }
  }


  totalBillProductsLength() {
    let total = 0;
    this.billProducts.forEach((product: any) => {
      total += product.quantity;
    });
    return total;
  }

  toggleShowBill() {
    this.showBill = !this.showBill;
  }


  resetBill(){
    this.billProducts = [];
    this.toggleShowBill();
  }


}
