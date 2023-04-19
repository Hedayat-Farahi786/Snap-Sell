import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private alertService: AlertsService) { }


  getAllCustomers(){
    return this.http.get(environment.backendUrl + "customer");
  }


  createCustomer(data: any){
    return this.http.post(environment.backendUrl + "customer", data);
  }



}
