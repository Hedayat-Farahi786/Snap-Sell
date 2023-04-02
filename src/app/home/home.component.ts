import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLanguages: boolean = false;


  menuOpened: boolean = false;

  cameDown: boolean = false;

  constructor(public productsService: ProductsService) {
  }
  
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
    this.productsService.toggleShowBill();
  }

}
