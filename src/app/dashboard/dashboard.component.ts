import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart, { ArcElement, DoughnutController, Tooltip } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  today: any = this.datePipe.transform(new Date(), 'EEEE, d MMMM yyyy');


  tableData = [
    {
      customerName: 'Hedayat Farahi',
      menu: 'Spicy seasoned seafood noodles',
      total: 125,
      status: 'Completed'
    },
    {
      customerName: 'Sarah Johnson',
      menu: 'Grilled chicken with mashed potatoes',
      total: 75,
      status: 'In Progress'
    },
    {
      customerName: 'Robert Lee',
      menu: 'Vegetable stir-fry with tofu',
      total: 90,
      status: 'Completed'
    },
    {
      customerName: 'Tina Patel',
      menu: 'Beef and broccoli stir-fry',
      total: 85,
      status: 'Completed'
    },
    {
      customerName: 'Avery Thompson',
      menu: 'Pesto pasta with grilled shrimp',
      total: 110,
      status: 'In Progress'
    },
    {
      customerName: 'Erica Chen',
      menu: 'Teriyaki chicken rice bowl',
      total: 95,
      status: 'Completed'
    },
    {
      customerName: 'David Kim',
      menu: 'Lobster ravioli with garlic bread',
      total: 150,
      status: 'Completed'
    },
    {
      customerName: 'Juan Rodriguez',
      menu: 'Carne asada tacos with rice and beans',
      total: 70,
      status: 'In Progress'
    },
    {
      customerName: 'Emily Nguyen',
      menu: 'Pho with beef and vegetables',
      total: 80,
      status: 'Completed'
    },
    {
      customerName: 'Michael Patel',
      menu: 'Butter chicken with naan bread',
      total: 95,
      status: 'In Progress'
    }
  ];

  hexColors = [
    '#16A085',
    '#27AE60',
    '#2980B9',
    '#8E44AD',
    '#2C3E50',
    '#F1C40F',
    '#E67E22',
    '#C0392B',
    '#696969',
    '#778899',
  ];


  mostOrderd = [
    {
      image: '../../assets/dishes/image_0.png',
      title: 'Spicy seasoned seafood noodles',
      amount: 200
    },
    {
      image: '../../assets/dishes/image_1.png',
      title: 'Salted pasta with mushroom sauce',
      amount: 120
    },
    {
      image: '../../assets/dishes/image_2.png',
      title: 'Beef dumpling in hot and sour soup',
      amount: 80
    },
  ]
  
  


  constructor() { }

  ngOnInit(): void {
    Chart.register(DoughnutController, Tooltip, ArcElement);
    const data = {
      // labels: ['Dine In', 'To Go', 'Delivery'],
      datasets: [
        {
          data: [34.1297, 20.8191, 45.0512],
          backgroundColor: ['#FF7CA3', '#FFB572', '#65B0F6'],
          borderWidth: 0,
        },
      ],
    };

    const myChart = new Chart('myChart', {
      type: 'doughnut',
      data: data,
      options: {
        cutout: '70%',
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          // title: {
          //   display: true,
          //   text: 'Restaurant Customers',
          // },
        },
      },
    });
  }
  


  randomColor = () => this.hexColors[Math.floor(Math.random() * this.hexColors.length)];


  randomAvatar(){
    return "../../assets/users/" + Math.floor(Math.random() * 5) + ".png";
  }

  getInitials(name: string) {
    // Split the name into an array of words
    const words = name.split(" ");
    
    // Loop through the words and grab the first letter of each
    const initials = words.map(word => word.charAt(0));
    
    // Join the initials together into a string and return it
    return initials.join("").toUpperCase();
  }

}
