import { Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from './alerts.service';

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


  constructor(private categoriesService: CategoriesService, private alertService: AlertsService) {
    this.categories = this.categoriesService.categories.filter((cat: any, i: number) => i !== 0);


    this.categories.map((cat: any) => {
      this.products[cat.name] = cat.products;
    })

    let res: any = this.products;

    for (let key in res) {
      this.settingProducts.push({
        menuName: key,
        items: res[key]
      })
    }


    this.addProductForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      image: new FormControl('../../assets/icons/products/icons8-image-100.png'),
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


  addNewProduct(){
    let categoryName = "";
    this.categoriesService.categories.forEach((cat: any) => {
      if(cat.name === this.addProductForm.get('category')?.value){
        categoryName = cat.name;
        let data = {
          id: cat.products.length,
          image: this.addProductForm.get('image')?.value,
          name: this.addProductForm.get('name')?.value,
          info: this.addProductForm.get('info')?.value,
          price: this.addProductForm.get('price')?.value
        }
        cat.products.push(data);
        this.alertService.displaySuccessAlert('Success', `Product Added to ${categoryName} successfully!`);
        this.toggleShowAddProduct();
      }
    })
  }


  editProduct(){
    let data = this.editProductForm.value;
    let match = false;

    this.categories.forEach((cat: any) => {
      if(cat.name === data.category){
        cat.products.forEach((prod: any) => {
          if(prod.name === data.name){
            match = true;
          }
        });
      }
    });

    if(!match){
      this.categories.forEach((cat: any, index: number) => {
        if(cat.name === data.category){
          let res = {
            id: this.productToEditId,
            image: data.image,
            name: data.name,
            info: data.info,
            price: data.price
          }
          this.categories[index].products[this.productToEditId] = res;
          this.alertService.displaySuccessAlert('Success', 'Product edited successfully!');
          this.toggleShowEditProduct();
        }
      });
    } else {
      this.alertService.displayErrorAlert('Error', 'Product with this name already exists!');
    }

  }

  deleteProduct(category: any, id: any){
    this.settingProducts.forEach((prod: any, i: number) => {
      if(prod.menuName === category){
        this.settingProducts[i].items = prod.items.filter((prod: any) => prod.id !== id);
      }
    });
    this.alertService.displaySuccessAlert('Success', 'Product deleted successfully!');
  }

  openEditProduct(category: any, id: any){
    this.productToEditId = id;
    this.categories.forEach((cat: any) => {
      if(cat.name === category){
        this.editProductForm.get('category')?.setValue(cat.name);
        this.editProductForm.get('image')?.setValue(cat.products[id].image);
        this.editProductForm.get('name')?.setValue(cat.products[id].name);
        this.editProductForm.get('info')?.setValue(cat.products[id].info);
        this.editProductForm.get('price')?.setValue(cat.products[id].price);
      }
    });
    this.toggleShowEditProduct();
  }

  toggleShowAddProduct(){
    this.showAddProduct = !this.showAddProduct;
  }

  toggleShowEditProduct(){
    this.showEditProduct = !this.showEditProduct;
  }


  addToBillProducts(product: any) {
    this.billProducts.push(product);
  }

  toggleShowBill() {
    this.showBill = !this.showBill;
  }


}
