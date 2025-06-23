import { Component ,input,output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar {
   isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink:'dashboard',
      icon:'fa fa-home',
      label:'Dashboard',
    },   
    
  {
    routeLink: 'Edit-Trainers',
    icon: 'fa fa-users',
    label: 'Trainers',
  },
  {
    routeLink: 'Edit-Units',
    icon: 'fa fa-cubes',
    label: 'Units',
  },
    {
      routeLink:'signout',
      icon:'bi bi-box-arrow-right',
      label:'Sign Out',
    }
  ];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
