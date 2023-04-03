import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLanguages: boolean = false;


  menuOpened: boolean = false;

  cameDown: boolean = false;
  

  datePipe = new DatePipe('en-US');

  
  today: any = this.datePipe.transform(new Date(), 'EEEE, d MMMM yyyy');;
  
  constructor(public productsService: ProductsService) {}
  
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
