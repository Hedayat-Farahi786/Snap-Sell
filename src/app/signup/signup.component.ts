import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showLanguages: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  selectLanguage(){
    this.showLanguages = !this.showLanguages;
  }
}
