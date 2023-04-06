import { AnyARecord } from 'dns';
import { AlertsService } from './alerts.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesIcons = [
    {
      id: 0,
      icon: "../../assets/icons/products/icons8-baguette-100.png",
      name: "baguette",
      selected: false,
    },
    {
      id: 1,

      icon: "../../assets/icons/products/icons8-beef-100.png",
      name: "beef",
      selected: false,
    },
    {
      id: 2,
      icon: "../../assets/icons/products/icons8-cake-100.png",
      name: "cake",
      selected: false,
    },
    {
      id: 3,
      icon: "../../assets/icons/products/icons8-cola-100.png",
      name: "cola",
      selected: false,
    },
    {
      id: 4,
      icon: "../../assets/icons/products/icons8-dolmades-100.png",
      name: "dolmades",
      selected: false,
    },
    {
      id: 5,
      icon: "../../assets/icons/products/icons8-french-fries-100.png",
      name: "frenchFries",
      selected: false,
    },
    {
      id: 6,
      icon: "../../assets/icons/products/icons8-fried-chicken-100.png",
      name: "chicken",
      selected: false,
    },
    {
      id: 7,
      icon: "../../assets/icons/products/icons8-green-tea-100.png",
      name: "greenTea",
      selected: false,
    },
    {
      id: 8,
      icon: "../../assets/icons/products/icons8-hot-dog-100.png",
      name: "hotDog",
      selected: false,
    },
    {
      id: 9,
      icon: "../../assets/icons/products/icons8-ice-cream-cone-100.png",
      name: "iceCream",
      selected: false,
    },
    {
      id: 10,
      icon: "../../assets/icons/products/icons8-lemonade-100.png",
      name: "lemonade",
      selected: false,
    },
    {
      id: 11,
      icon: "../../assets/icons/products/icons8-noodles-100.png",
      name: "noodles",
      selected: false,
    },
    {
      id: 12,
      icon: "../../assets/icons/products/icons8-pretzel-100.png",
      name: "pretzel",
      selected: false,
    },
    {
      id: 13,
      icon: "../../assets/icons/products/icons8-salad-100.png",
      name: "salad",
      selected: false,
    },
    {
      id: 14,
      icon: "../../assets/icons/products/icons8-salami-pizza-100.png",
      name: "salamiPizza",
      selected: false,
    },
    {
      id: 15,
      icon: "../../assets/icons/products/icons8-steak-100.png",
      name: "steak",
      selected: false,
    },
    {
      id: 16,
      icon: "../../assets/icons/products/icons8-sushi-100.png",
      name: "sushi",
      selected: false,
    },
    {
      id: 17,
      icon: "../../assets/icons/products/icons8-taco-100.png",
      name: "taco",
      selected: false,
    },
    {
      id: 18,
      icon: "../../assets/icons/products/icons8-takeaway-hot-drink-100.png",
      name: "hotDrink",
      selected: false,
    },
    {
      id: 19,
      icon: "../../assets/icons/products/icons8-the-toast-100.png",
      name: "toast",
      selected: false,
    },
    {
      id: 20,
      icon: "../../assets/icons/products/icons8-wrap-100.png",
      name: "wrap",
      selected: false,
    },
  ]


  categories = [
    {
      icon: '../../assets/icons/products/icons8-list-view-100.png',
      name: 'All',
      selected: true
    },
    {
      id: 0,
      iconId: 15,
      icon: '../../assets/icons/products/icons8-steak-100.png',
      name: 'Steaks'
    },
    {
      id: 1,
      iconId: 18,
      icon: '../../assets/icons/products/icons8-takeaway-hot-drink-100.png',
      name: 'Coffee'
    },
    {
      id: 2,
      iconId: 9,
      icon: '../../assets/icons/products/icons8-ice-cream-cone-100.png',
      name: 'Ice Cream'
    },
    {
      id: 3,
      iconId: 2,
      icon: '../../assets/icons/products/icons8-cake-100.png',
      name: 'Desserts'
    },
  ]


  showAddCategory = false;
  showEditCategory = false;
  editCategoryName: string = "";
  categoryToEdit: any;
  selectedCategoryIcon: any;

  editCategoryForm!: FormGroup;

  categoriesPlaceholderImage: string = "../../assets/icons/products/icons8-image-100.png";



  constructor(private alertsService: AlertsService) {
    this.editCategoryForm = new FormGroup({
      icon: new FormControl(''),
      name: new FormControl(''),
    });
  }



  toggleShowAddCategory(){
    this.showAddCategory = !this.showAddCategory;
    this.removeSelection();
    this.categoriesPlaceholderImage = "../../assets/icons/products/icons8-image-100.png";
  }

  toggleEditCategory() {
    this.showEditCategory = !this.showEditCategory;
  }

  openEditCategory(category: any) {
    this.editCategoryForm.get('name')?.setValue(category.name);
    this.editCategoryForm.get('icon')?.setValue(category.icon);
    this.categoriesPlaceholderImage = category.icon;
    this.selectCategoryIcon(category.iconId);
    this.showEditCategory = !this.showEditCategory;
    this.categoryToEdit = category;
  }



  addNewCategory(data: any){

    let match = false;

    this.categories.forEach((cat: any) => {
      if(cat.name.toLowerCase() === data.name.toLowerCase()){
        match = true;
      }
    })

    if(!match){
      data.id = this.categories.length;
      this.categories.push(data);
      this.alertsService.displaySuccessAlert("Success", `${data.name} category successfully added!`);
      this.toggleShowAddCategory();
    } else {
      this.alertsService.displayErrorAlert("Error", "Category with this name already exists!")
    }
    
  }


  editCategory(){

      this.categories.forEach((cat: any, i: number) => {
        if(cat.id === this.categoryToEdit.id){
          let newData = this.editCategoryForm.value;

          newData.id = cat.id;
          newData.iconId = this.selectedCategoryIcon;


          this.categories[i] = newData;
        }
      })

      console.log(this.categories);
      


      this.alertsService.displaySuccessAlert("Success", `Category successfully edited!`);
      this.toggleEditCategory();
  }

  deleteCategory(category: any){
    this.categories = this.categories.filter(c => c.name !== category.name);
    this.alertsService.displaySuccessAlert("Success", `${category.name} category successfully deleted!`);
  }

  selectCategoryIcon(id: any){
    this.selectedCategoryIcon = id;
    this.categoriesIcons.forEach((icon: any) => {
      if(id === icon.id){
        icon.selected = true;
      } else {
        icon.selected = false;
      }
    })
  }

  removeSelection(){
    this.categoriesIcons.forEach((icon: any) => icon.selected = false);
  }

  addToCategories(category: any) {
    this.categories.push(category);
  }
}
