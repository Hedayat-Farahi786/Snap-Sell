import { AnyARecord } from 'dns';
import { AlertsService } from './alerts.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categoriesIcons = [
    {
      id: 0,
      icon: '../../assets/icons/products/icons8-baguette-100.png',
      name: 'baguette',
      selected: false,
    },
    {
      id: 1,

      icon: '../../assets/icons/products/icons8-beef-100.png',
      name: 'beef',
      selected: false,
    },
    {
      id: 2,
      icon: '../../assets/icons/products/icons8-cake-100.png',
      name: 'cake',
      selected: false,
    },
    {
      id: 3,
      icon: '../../assets/icons/products/icons8-cola-100.png',
      name: 'cola',
      selected: false,
    },
    {
      id: 4,
      icon: '../../assets/icons/products/icons8-dolmades-100.png',
      name: 'dolmades',
      selected: false,
    },
    {
      id: 5,
      icon: '../../assets/icons/products/icons8-french-fries-100.png',
      name: 'frenchFries',
      selected: false,
    },
    {
      id: 6,
      icon: '../../assets/icons/products/icons8-fried-chicken-100.png',
      name: 'chicken',
      selected: false,
    },
    {
      id: 7,
      icon: '../../assets/icons/products/icons8-green-tea-100.png',
      name: 'greenTea',
      selected: false,
    },
    {
      id: 8,
      icon: '../../assets/icons/products/icons8-hot-dog-100.png',
      name: 'hotDog',
      selected: false,
    },
    {
      id: 9,
      icon: '../../assets/icons/products/icons8-ice-cream-cone-100.png',
      name: 'iceCream',
      selected: false,
    },
    {
      id: 10,
      icon: '../../assets/icons/products/icons8-lemonade-100.png',
      name: 'lemonade',
      selected: false,
    },
    {
      id: 11,
      icon: '../../assets/icons/products/icons8-noodles-100.png',
      name: 'noodles',
      selected: false,
    },
    {
      id: 12,
      icon: '../../assets/icons/products/icons8-pretzel-100.png',
      name: 'pretzel',
      selected: false,
    },
    {
      id: 13,
      icon: '../../assets/icons/products/icons8-salad-100.png',
      name: 'salad',
      selected: false,
    },
    {
      id: 14,
      icon: '../../assets/icons/products/icons8-salami-pizza-100.png',
      name: 'salamiPizza',
      selected: false,
    },
    {
      id: 15,
      icon: '../../assets/icons/products/icons8-steak-100.png',
      name: 'steak',
      selected: false,
    },
    {
      id: 16,
      icon: '../../assets/icons/products/icons8-sushi-100.png',
      name: 'sushi',
      selected: false,
    },
    {
      id: 17,
      icon: '../../assets/icons/products/icons8-taco-100.png',
      name: 'taco',
      selected: false,
    },
    {
      id: 18,
      icon: '../../assets/icons/products/icons8-takeaway-hot-drink-100.png',
      name: 'hotDrink',
      selected: false,
    },
    {
      id: 19,
      icon: '../../assets/icons/products/icons8-the-toast-100.png',
      name: 'toast',
      selected: false,
    },
    {
      id: 20,
      icon: '../../assets/icons/products/icons8-wrap-100.png',
      name: 'wrap',
      selected: false,
    },
  ];

  categories = [
    {
      icon: '../../assets/icons/products/icons8-list-view-100.png',
      name: 'All',
      selected: true,
    },
    // {
    //   id: 0,
    //   iconId: 15,
    //   icon: '../../assets/icons/products/icons8-steak-100.png',
    //   name: 'Steaks',
    //   products: [],
    // },
    {
      id: 1,
      iconId: 18,
      icon: '../../assets/icons/products/icons8-takeaway-hot-drink-100.png',
      name: 'Coffee',
      products: [
        {
          id: 0,
          image: '../../assets/coffee/1.jpg',
          name: 'Americano Coffee',
          info: 'Coffee americano passion 2 shot caramel sauce',
          price: 5.3,
        },
        {
          id: 1,
          image: '../../assets/coffee/2.jpg',
          name: 'Espresso Coffee',
          info: 'Coffee esspresso passion 2 shot caramel sauce',
          price: 5.3,
          options: [
            {
              name: 'Sugar',
              values: [20, 40, 60],
            },
            {
              name: 'Ice',
              values: [20, 40, 60],
            },
          ],
        },
        {
          id: 2,

          image: '../../assets/coffee/3.jpg',
          name: 'Capacino Coffee',
          info: 'Coffee capacino passion 2 shot caramel sauce',
          price: 6.5,
          options: [
            {
              name: 'Sugar',
              values: [20, 40, 60],
            },
            {
              name: 'Sugar',
              values: [20, 40, 60],
            },
          ],
        },
        {
          id: 3,

          image: '../../assets/coffee/4.jpg',
          name: 'Latino Coffee',
          info: 'Coffee Latino passion 2 shot caramel sauce',
          price: 3.2,
        },
        {
          icon: 4,
          image: '../../assets/coffee/5.jpg',
          name: 'Simple Coffee',
          info: 'Coffee Simple passion 2 shot caramel sauce',
          price: 2.5,
        },
      ],
    },
    {
      id: 2,
      iconId: 9,
      icon: '../../assets/icons/products/icons8-ice-cream-cone-100.png',
      name: 'Ice Cream',
      products: [],
    },
    {
      id: 3,
      iconId: 2,
      icon: '../../assets/icons/products/icons8-cake-100.png',
      name: 'Desserts',
      products: [],
    },
  ];

  showAddCategory = false;
  showEditCategory = false;
  editCategoryName: string = '';
  categoryToEdit: any;
  selectedCategoryIcon: any;

  editCategoryForm!: FormGroup;

  categoriesPlaceholderImage: string =
    '../../assets/icons/products/icons8-image-100.png';

  constructor(private alertsService: AlertsService, private http: HttpClient) {
    this.editCategoryForm = new FormGroup({
      icon: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl('')
    });
  }


  getAllCategories(){
    return this.http.get(environment.backendUrl + "categories");
  }

  deleteCategoryById(id: string){
    return this.http.delete(environment.backendUrl + "categories/" + id);
  }

  toggleShowAddCategory() {
    this.showAddCategory = !this.showAddCategory;
    this.removeSelection();
    this.categoriesPlaceholderImage =
      '../../assets/icons/products/icons8-image-100.png';
  }

  toggleEditCategory() {
    this.showEditCategory = !this.showEditCategory;
  }


  addNewCategory(data: any) {
    this.http.post(environment.backendUrl + "categories", data).subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Category ${data.name} created sucessfully`);
        this.toggleShowAddCategory();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );
  }

  openEditCategory(category: any) {
    this.editCategoryForm.get('name')?.setValue(category.name);
    this.editCategoryForm.get('icon')?.setValue(category.icon);
    this.editCategoryForm.get('description')?.setValue(category.description);
    this.categoriesPlaceholderImage = category.icon;
    this.selectCategoryIcon(category.iconId);
    this.showEditCategory = !this.showEditCategory;
    this.categoryToEdit = category;
  }

  editCategory() {
    let id = this.categoryToEdit._id;
    this.http.patch(environment.backendUrl + "categories/" + id, this.editCategoryForm.value).subscribe(
      (res: any) => {
        this.alertsService.displaySuccessAlert("Success", `Category updated sucessfully`);
        this.toggleEditCategory();
        this.editCategoryForm.reset();
      }, (err: any) => {
        this.alertsService.displayErrorAlert("Error", err.message);
      }
    );
  }

  deleteCategory(category: any) {
    this.categories = this.categories.filter((c) => c.name !== category.name);
    this.alertsService.displaySuccessAlert(
      'Success',
      `${category.name} category successfully deleted!`
    );
  }

  selectCategoryIcon(id: any) {
    this.selectedCategoryIcon = id;
    this.categoriesIcons.forEach((icon: any) => {
      if (id === icon.id) {
        icon.selected = true;
      } else {
        icon.selected = false;
      }
    });
  }

  removeSelection() {
    this.categoriesIcons.forEach((icon: any) => (icon.selected = false));
  }

  addToCategories(category: any) {
    this.categories.push(category);
  }
}
