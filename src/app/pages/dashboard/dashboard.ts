import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  numberOfTrainers: number = 0;
  numberOfUnits: number = 0;
  constructor() {}
  ngOnInit(): void {
    // Initialize the dashboard data here
    this.fetchDashboardData();
  }
   fetchDashboardData(): void {
    // Simulate fetching data from a service/backend
    setTimeout(() => {
      this.numberOfTrainers = 5; // Example data
      this.numberOfUnits = 6;     // Example data
    }, 500); // Simulate network delay
  }
  
  // You can add methods and properties specific to the dashboard here
  // For example, fetching data, handling user interactions, etc.

}
