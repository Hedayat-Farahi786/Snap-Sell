import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private alertService: AlertsService) { }


  getAllOrders(){
    return this.http.get(environment.backendUrl + "order");
  }


  createOrder(data: any){
    return this.http.post(environment.backendUrl + "order", data);
  }




}
