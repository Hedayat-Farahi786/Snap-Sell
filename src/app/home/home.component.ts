import { AlertsService } from './../api/alerts.service';
import { CategoriesService } from './../api/categories.service';
import { ProductsService } from './../api/products.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
const appVersion = require('../../../package.json').version;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLanguages: boolean = false;


  menuOpened: boolean = false;

  cameDown: boolean = false;

  version = appVersion;
  

  datePipe = new DatePipe('en-US');

  
  today: any = this.datePipe.transform(new Date(), 'EEEE, d MMMM yyyy');;
  
  constructor(public productsService: ProductsService, public categoriesService: CategoriesService, public alertsService: AlertsService) {}
  
  ngOnInit(): void {
    window.addEventListener('scroll', ()=> {
      this.cameDown = window.scrollY > 200;
    })
  }


  selectLanguage(){
    this.showLanguages = !this.showLanguages;
  }


  toggleSidebar(){
    this.menuOpened = !this.menuOpened;
  }


  scrollToTop() {
    window.scrollTo(0, 0);
  }

  openBill(){
    if(this.productsService.billProducts.length > 0){
      this.productsService.toggleShowBill();
    }
  }

}
