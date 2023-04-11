import { Component } from '@angular/core';
import { AlertsService } from './api/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snapsell';


  constructor(public alertsService: AlertsService){}


}
