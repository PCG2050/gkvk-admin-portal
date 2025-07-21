import { Component ,input,output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-left-sidebar',  
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
    label: 'Unit heads',
  },
  {
    routeLink: 'Edit-Units',
    icon: 'fa fa-cubes',
    label: 'Units',
  },
  {
  routeLink: 'records',
  icon: 'fa fa-file-alt', // or any icon you prefer
  label: 'Records',
  },
    {
      routeLink:'signout',
      icon:'bi bi-box-arrow-right',
      label:'Sign Out',
    }
  ];
   showSignOutConfirm = false;
  constructor(private router: Router) {}


  onSignOutClick(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior
    this.showSignOutConfirm = true;
  }

  confirmSignOut() {
    sessionStorage.clear();
    this.showSignOutConfirm = false;
    this.router.navigateByUrl('/login',{replaceUrl: true});
  }

  cancelSignOut() {
    this.showSignOutConfirm = false;
  }
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
