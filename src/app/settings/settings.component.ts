import { AlertsService } from './../api/alerts.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { CategoriesService } from '../api/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  hrImagePreview = '../../assets/logos/logo_horizontal.png';
  vtImagePreview = '../../assets/logos/logo_vertical.png';
  logoImagePreview = '../../assets/logos/logo_icon.png';

  openTab = -1;
  openSetting = 3;

  categories: any = [];
  products: any = [];

  categoriesIcons: any = [];

  displayProducts: any = [];

  selectedCategoryId: number = 0;

  constructor(
    public productService: ProductsService,
    public categoriesService: CategoriesService,
    public alertsService: AlertsService
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

  deleteCategory(category: any) {
    console.log(category);
    this.categoriesService
      .deleteCategoryById(category._id)
      .subscribe((res: any) => {
        this.alertsService.displaySuccessAlert(
          'Success',
          'Category Deleted Successfuly!'
        );
      });
    this.getAllCategories();
  }

  ngOnInit(): void {

    this.addCategoryForm = new FormGroup({
      icon: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    this.storeForm = new FormGroup({
      name: new FormControl('McDonalds'),
      currency: new FormControl('usd'),
      color: new FormControl('#E06F2B'),
      hrImage: new FormControl(null),
      vtImage: new FormControl(null),
      logoImage: new FormControl(null),
    });

    this.securityForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
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
    console.log(this.securityForm.value);
  }

  onHrImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.hrImagePreview = e.target['result'];
      };
    }
  }

  onVtImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.vtImagePreview = e.target['result'];
      };
    }
  }

  onLogoImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.logoImagePreview = e.target['result'];
      };
    }
  }

  submitStoreData() {
    console.log(this.storeForm.value);
  }

  addNewCategory() {
    let data = this.addCategoryForm.value;
    this.categoriesService.addNewCategory(data);
    this.getAllCategories();
    this.addCategoryForm.reset();
  }

  editCategory() {
    this.categoriesService.editCategory();
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
