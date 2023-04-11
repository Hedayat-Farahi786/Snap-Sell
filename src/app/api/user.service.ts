import { AlertsService } from './alerts.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userData: any = {};


  constructor(private http: HttpClient, private router: Router, private alertService: AlertsService) {}



  userLogin(data: any) {
    return this.http.post(environment.backendUrl + "login", { username: data.email.toLowerCase(), password: data.password });
  }

  userSignup(data: any) {
    let payload = { username: data.email.toLowerCase(), email: data.email.toLowerCase(), password: data.password, storeName: data.storeName, mainColor: "#ffffff", logo: "" }
    return this.http.post(environment.backendUrl + "signup", payload);
  }

  updateUser(data: any) {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.patch(environment.backendUrl + "user/" + this.getUserId(), data, { headers });
  }

  updatePassword(data: any){

    let payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }

    this.http.post(environment.backendUrl + "reset/" + this.getUserId(),  data).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err.error)
      }
    )
  }


  refreshUserData(){
    this.getUserData().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        this.alertService.displayErrorAlert("Error", err.error.message);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/login");
  }

  decodeToken(token: any) {
    return JSON.parse(
      decodeURIComponent(
        atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getUserId(){
    return this.decodeToken(this.getToken()).id;
  }



  getUserData() {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get(environment.backendUrl + "user/" + this.decodeToken(this.getToken()).id, { headers });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }


}
