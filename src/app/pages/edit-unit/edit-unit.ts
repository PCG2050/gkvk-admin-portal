import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Define a type for Unit for better type safety
interface Unit {
  name: string;
  region: string;
}

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.html',
  styleUrl: './edit-unit.css'
})
export class EditUnitComponent implements OnInit {
 // Data for dropdowns
  regions = ['North', 'South', 'East', 'West', 'Central']; // Example regions

  // Form fields for adding a new unit
  newUnitName = '';
  newUnitRegion = '';

  // Filter selection
  selectedRegion = '';

  // Data for units
  units: Unit[] = [];
  filteredUnits: Unit[] = [];

  // Delete confirmation modal state
  showDeleteConfirm = false;
  unitToDelete: Unit | null = null;

  // Feedback message for user actions
  feedbackMessage: string | null = null;

  ngOnInit(): void {
    // Initialize with some dummy data for units
    this.units = [
      { name: 'Unit Alpha', region: 'North' },
      { name: 'Unit Beta', region: 'South' },
      { name: 'Unit Gamma', region: 'North' },
      { name: 'Unit Delta', region: 'East' },
      { name: 'Unit Epsilon', region: 'West' },
      { name: 'Unit Alpha', region: 'South' } // Example: Same unit name, different region
    ];
    this.filteredUnits = [...this.units]; // Initially display all units
  }

  // Adds a new unit to the list
  addUnit() {
    // Check if unit name and region are provided.
    // Uniqueness check: Ensure no existing unit has the SAME NAME AND SAME REGION.
    if (
      this.newUnitName &&
      this.newUnitRegion &&
      !this.units.some(u =>
        u.name.toLowerCase() === this.newUnitName.toLowerCase() &&
        u.region === this.newUnitRegion
      )
    ) {
      const newUnit: Unit = {
        name: this.newUnitName,
        region: this.newUnitRegion
      };
      this.units.push(newUnit);
      this.onSearch(); // Re-apply filters to include the new unit if it matches
      this.newUnitName = '';
      this.newUnitRegion = '';
      this.setFeedbackMessage('Unit added successfully!', 'success');
    } else {
      let message = 'Invalid input. Please ensure unit name and region are filled correctly.';
      if (this.newUnitName && this.newUnitRegion &&
          this.units.some(u =>
            u.name.toLowerCase() === this.newUnitName.toLowerCase() &&
            u.region === this.newUnitRegion
          )) {
        message = `Unit '${this.newUnitName}' in '${this.newUnitRegion}' already exists.`;
      }
      this.setFeedbackMessage(message, 'error');
    }
  }

  // Filters the units based on selected region
  onSearch() {
    this.filteredUnits = this.units.filter(unit =>
      (!this.selectedRegion || unit.region === this.selectedRegion)
    );
    this.setFeedbackMessage(`Found ${this.filteredUnits.length} units.`, 'info');
  }

  // Resets all filter selections and displays all units
  onReset() {
    this.selectedRegion = '';
    this.filteredUnits = [...this.units];
    this.setFeedbackMessage('Filters reset. Showing all units.', 'info');
  }

  // Sets the unit to be deleted and opens the confirmation modal
  confirmDelete(unit: Unit) {
    this.unitToDelete = unit;
    this.showDeleteConfirm = true;
  }

  // Deletes the confirmed unit from the list
  deleteUnit() {
    if (this.unitToDelete) {
      this.units = this.units.filter(
        u => u !== this.unitToDelete
      );
      this.onSearch(); // Re-apply filters to update the displayed list
      this.setFeedbackMessage(`Unit '${this.unitToDelete.name}' in '${this.unitToDelete.region}' deleted successfully.`, 'success');
    }
    this.showDeleteConfirm = false;
    this.unitToDelete = null;
  }

  // Cancels the delete operation
  cancelDelete() {
    this.showDeleteConfirm = false;
    this.unitToDelete = null;
    this.setFeedbackMessage('Delete operation cancelled.', 'info');
  }

  // Placeholder for download report logic
  downloadReport() {
    this.setFeedbackMessage('Download Report clicked! (Implementation pending)', 'info');
    // In a real application, you would generate a CSV or PDF here
    // Example: Convert filteredUnits to CSV and trigger download
  }

  // Helper to display feedback messages
  setFeedbackMessage(message: string, type: 'success' | 'error' | 'info') {
    this.feedbackMessage = message;
    // You could add logic here to display different styles based on 'type'
    // For example, by setting a CSS class on the feedback message element
    setTimeout(() => {
      this.feedbackMessage = null; // Clear message after some time
    }, 5000); // Message disappears after 5 seconds
  }
}