import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {


  // message: any;
  message = {
    title: 'Error',
    text: 'Something went wrong!'
  };

  showWarning: boolean = false;
  showError: boolean = false;
  showSuccess: boolean = false;
  timeout: any;

  constructor() { }




  displaySuccessAlert(title: string, text: string){
    clearTimeout(this.timeout);
    this.message = {
      title,
      text
    };
    this.showSuccess = true;
    this.timeout = setTimeout(() => {
      this.toggleSuccessAlert(); 
    }, 5000);
  }

  displayErrorAlert(title: string, text: string){
    clearTimeout(this.timeout);
    this.message = {
      title,
      text
    };
    this.showError = true;
    this.timeout = setTimeout(() => {
      this.toggleErrorAlert(); 
    }, 5000);
  }

  displayWarningAlert(title: string, text: string){
    clearTimeout(this.timeout);
    this.message = {
      title,
      text
    };
    this.showWarning = true;
    this.timeout = setTimeout(() => {
      this.toggleWarningAlert(); 
    }, 5000);
  }


  toggleSuccessAlert(){
    this.showSuccess = false;
  }

  toggleErrorAlert(){
    this.showError = false;
  }

  toggleWarningAlert(){
    this.showWarning = false;
  }




}
