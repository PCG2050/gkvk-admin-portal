import { Component,HostListener,OnInit,signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { LeftSidebar } from './left-sidebar/left-sidebar';
import { Main } from './main/main';

@Component({
  selector: 'app-layout',
  imports: [LeftSidebar,Main],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if(this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

 changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
  this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
}

}
