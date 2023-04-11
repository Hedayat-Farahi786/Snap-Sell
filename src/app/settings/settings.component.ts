import { AlertsService } from './../api/alerts.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { CategoriesService } from '../api/categories.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsMenu = [
    {
      icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z',
      title: 'My Store',
      info: 'Manage you data, logo, etc...',
    },
    {
      icon: 'M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z',
      title: 'Categories',
      info: 'Manage or add categories',
    },
    {
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
      title: 'Products',
      info: 'Manage or add products, pricing, etc...',
    },
    {
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
      title: 'Security',
      info: 'Configure your password',
    },
    {
      icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
      title: 'About Us',
      info: 'Know about SnapSell',
    },
  ];

  addCategoryForm!: FormGroup;
  storeForm!: FormGroup;
  securityForm!: FormGroup;

  logoPreview = '../../assets/logos/logo_vertical.png';

  openTab = 0;
  openSetting = 4;

  userData: any = {};


  categories: any = [];
  products: any = [];

  categoriesIcons: any = [];

  displayProducts: any = [];

  selectedCategoryId: number = 0;

  constructor(
    public productService: ProductsService,
    public categoriesService: CategoriesService,
    public alertsService: AlertsService,
    private userService: UserService
  ) {

    this.categoriesIcons = this.categoriesService.categoriesIcons;

    this.getAllCategories();
    this.getAllProducts();



    let res: any = this.productService.products;

    for (let key in res) {
      this.products.push({
        menuName: key,
        items: res[key],
      });
    }
  }

  ngOnInit(): void {

    this.addCategoryForm = new FormGroup({
      icon: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    this.userService.getUserData().subscribe(
      (res: any) => {
        this.storeForm.get('storeName')?.setValue(res.storeName);
        this.storeForm.get('currency')?.setValue(res.currency);
        this.storeForm.get('mainColor')?.setValue(res.mainColor);
        this.userService.refreshUserData();
        this.alertsService.displaySuccessAlert("Success", "Store data updated successfully!");
      },
      (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.error.message);
      }
    );

    this.storeForm = new FormGroup({
      storeName: new FormControl(''),
      currency: new FormControl(''),
      mainColor: new FormControl(''),
      logo: new FormControl(null),
    });

    

    this.securityForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    }, {
      validators: this.passwordMatchingValidatior
    });
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmNewPassword')?.value;

    if (!password || !confirmPassword) { // if the password or confirmation has not been inserted ignore
      return null;
    }
    
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      this.securityForm.controls['confirmNewPassword'].setErrors({ missMatch: true }); // set the error in the confirmation input/control
    }
  
    return null;
  };


  addNewProduct() {
    this.productService.addNewProduct().subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Product added successfully!`);
        this.productService.toggleShowAddProduct();
        this.productService.addProductForm.reset();
        this.getAllProducts();
      },
      (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );
  }

  deleteProduct(product: any) {
    this.productService.deleteProduct(product._id).subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `${product.name} deleted successfully!`);
        this.getAllProducts();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );
  }

  editProduct() {
    this.productService.editProduct().subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Product updated successfully!`);
        this.productService.toggleShowEditProduct();
        this.productService.editProductForm.reset();
        this.getAllProducts();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );
  }



  deleteCategory(category: any) {
    this.categoriesService
      .deleteCategoryById(category._id)
      .subscribe((res: any) => {
        this.alertsService.displaySuccessAlert(
          'Success',
          'Category Deleted Successfuly!'
        );
        this.getAllCategories();
      });

  }


  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  getAllProducts() {
    this.productService.getAllproducts().subscribe((res: any) => {
      this.products = res;
      this.toggleTabs(this.openTab);
    });
  }

  currencyConverter(cur: string) {
    switch (cur) {
      case 'usd':
        return 'USD $';
      case 'eur':
        return 'EURO €';
      default:
        return '';
    }
  }

  updatePassword() {
    this.userService.updatePassword(this.securityForm.value);
  }


  onLogoSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.logoPreview = e.target['result'];
      };
    }
  }

  submitStoreData() {
    this.userService.updateUser(this.storeForm.value).subscribe(
      (res: any) => {
        this.userService.getUserData();
        this.userData = this.userService.userData;
        this.alertsService.displaySuccessAlert("Success", "Store data updated successfully!");
      },
      (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.error.message);
      }
    )
  }

  addNewCategory() {
    let data = this.addCategoryForm.value;
    this.categoriesService.addNewCategory(data).subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Category ${data.name} created sucessfully`);
        this.getAllCategories();
        this.categoriesService.toggleShowAddCategory();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );;
    this.addCategoryForm.reset();
  }

  editCategory() {
    this.categoriesService.editCategory().subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Category updated sucessfully`);
        this.categoriesService.toggleEditCategory();
        this.categoriesService.editCategoryForm.reset();
        this.getAllCategories();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );;
  }

  selectCategoryIcon(id: number) {
    this.selectedCategoryId = id;
    this.addCategoryForm.get('icon')?.setValue(this.categoriesIcons[id].icon);
    this.categoriesService.selectCategoryIcon(id);
    this.categoriesService.categoriesPlaceholderImage =
      this.categoriesIcons[id].icon;
  }
  editCategoryIcon(id: number) {
    this.selectedCategoryId = id;
    this.categoriesService.editCategoryForm
      .get('icon')
      ?.setValue(this.categoriesIcons[id].icon);
    this.categoriesService.selectCategoryIcon(id);
    this.categoriesService.categoriesPlaceholderImage =
      this.categoriesIcons[id].icon;
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
    this.displayProducts = [];

    this.products.forEach((product: any) => {
      if (product.category.name === this.categories[$tabNumber].name) {
        this.displayProducts.push(product);
      }
    });
  }
  toggleSettings($tabNumber: number) {
    this.openSetting = $tabNumber;
  }
}
