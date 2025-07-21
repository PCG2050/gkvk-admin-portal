import { Component, Input, Output, EventEmitter, ElementRef, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css'
})
export class MultiSelect<T = any> {
  @Input() items: T[] = [];
  @Input() displayWith: (item: T) => string = (item: any) => item?.name ?? '';
  @Input() valueWith: (item: T) => any = (item: any) => item;
  @Input() extraWith?: (item: T) => string; // For email/role etc.

  @Input() selected: T[] = [];
  @Output() selectionChange = new EventEmitter<T[]>();

  isDropdownVisible = false;
  filteredItems: T[] = [];
  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.filteredItems = this.items;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  filterItems(event: Event) {
    const searchItem = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      this.displayWith(item).toLowerCase().includes(searchItem)
    );
  }

  toggleItem(item: T, event: MouseEvent) {
    event.stopPropagation();
    const idx = this.selected.indexOf(item);
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(item);
    }
    this.selectionChange.emit([...this.selected]);
  }

  removeItem(item: T, event: MouseEvent) {
    event.stopPropagation();
    const idx = this.selected.indexOf(item);
    if (idx > -1) {
      this.selected.splice(idx, 1);
      this.selectionChange.emit([...this.selected]);
    }
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  isSelected(item: T): boolean {
    return this.selected.includes(item);
  }
}