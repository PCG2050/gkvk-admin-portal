import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrainerDataService } from '../../shared/trainer-data-service';
// Define a type for Trainer Assignment for better type safety
interface TrainerAssignment {
  email: string;
  // institute: string; // Removed for filtering
  region: string;    // Kept for filtering
  units: string[];
}

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.html',
  styleUrl: './edit-trainer.css'
})
export class EditTrainerComponent implements OnInit {

  // Data for dropdowns
  // institutes = ['Institute A', 'Institute B', 'Institute C']; // Removed
  units = ['Unit X', 'Unit Y', 'Unit Z', 'Unit A', 'Unit B'];
  regions = ['North', 'South', 'East', 'West'];

  // Form fields for adding a new trainer
  newTrainerEmail = '';
  newTrainerUnits = '';
  // newTrainerInstitute = ''; // Removed for new trainer
  newTrainerRegion = '';    // Kept for new trainer

  // Filter selections
  selectedUnit = '';
  selectedRegion = '';

  // Data for trainer assignments
  trainerAssignments: TrainerAssignment[] = [];
  filteredAssignments: TrainerAssignment[] = [];

  // Reassign modal state
  showReassign = false;
  reassignTrainer: TrainerAssignment | null = null;
  reassignUnits: string[] = [];

  // Delete confirmation modal state
  showDeleteConfirm = false;
  trainerToDelete: TrainerAssignment | null = null;

  // Feedback message for user actions
  feedbackMessage: string | null = null;

  ngOnInit(): void {
    // Initialize with some dummy data (updated to remove 'institute')
    this.trainerAssignments = [
      { email: 'trainer1@example.com', region: 'North', units: ['Unit X', 'Unit Y'] },
      { email: 'trainer2@example.com', region: 'South', units: ['Unit Z'] },
      { email: 'trainer3@example.com', region: 'East', units: ['Unit X', 'Unit A'] },
      { email: 'trainer4@example.com', region: 'West', units: ['Unit B'] }
    ];
    this.filteredAssignments = [...this.trainerAssignments];
  }

  // Adds a new trainer to the assignments list
  addTrainer() {
    // Check if email is provided, at least one unit is selected,
    // and the trainer email does not already exist.
    if (
      this.newTrainerEmail &&
      this.newTrainerUnits &&
      this.newTrainerRegion &&    // Ensure region is selected
      !this.trainerAssignments.some(t => t.email.toLowerCase() === this.newTrainerEmail.toLowerCase())
    ) {
      const newTrainer: TrainerAssignment = {
        email: this.newTrainerEmail,
        region: this.newTrainerRegion,
        units: [this.newTrainerUnits]
      };
      this.trainerAssignments.push(newTrainer);
      this.onSearch(); // Re-apply filters to include the new trainer if it matches
      this.newTrainerEmail = '';
      this.newTrainerUnits = '';
      this.newTrainerRegion = '';
      this.setFeedbackMessage('Trainer added successfully!', 'success');
    } else {
      let message = 'Invalid input. Please ensure all fields are filled correctly.';
      if (this.trainerAssignments.some(t => t.email.toLowerCase() === this.newTrainerEmail.toLowerCase())) {
        message = 'Trainer with this email already exists.';
      }
      this.setFeedbackMessage(message, 'error');
    }
  }

  // Filters the trainer assignments based on selected criteria
  onSearch() {
    this.filteredAssignments = this.trainerAssignments.filter(trainer =>
      // Removed selectedInstitute filtering
      (!this.selectedUnit || trainer.units.includes(this.selectedUnit)) &&
      (!this.selectedRegion || trainer.region === this.selectedRegion)
    );
    this.setFeedbackMessage(`Found ${this.filteredAssignments.length} assignments.`, 'info');
  }

  // Resets all filter selections and displays all assignments
  onReset() {
    // Removed selectedInstitute reset
    this.selectedUnit = '';
    this.selectedRegion = '';
    this.filteredAssignments = [...this.trainerAssignments];
    this.setFeedbackMessage('Filters reset. Showing all assignments.', 'info');
  }

  // Opens the reassign modal with the selected trainer's data
  startReassign(trainer: TrainerAssignment) {
    console.log('Reassigning units for:', trainer);
    this.showReassign = true;
    this.reassignTrainer = trainer;
    this.reassignUnits = [...trainer.units]; // Pre-populate with current units
  }

  // Saves the reassigned units for the trainer
  saveReassignment() {
    if (this.reassignTrainer) {
      this.reassignTrainer.units = [...this.reassignUnits];
      this.setFeedbackMessage(`Units reassigned for ${this.reassignTrainer.email}.`, 'success');
    }
    this.showReassign = false;
    this.reassignTrainer = null;
    this.reassignUnits = [];
    this.onSearch(); // Re-apply filters in case reassignment affects current view
  }

  // Cancels the reassign operation
  cancelReassignment() {
    this.showReassign = false;
    this.reassignTrainer = null;
    this.reassignUnits = [];
    this.setFeedbackMessage('Reassignment cancelled.', 'info');
  }

  // Sets the trainer to be deleted and opens the confirmation modal
  confirmDelete(trainer: TrainerAssignment) {
    this.trainerToDelete = trainer;
    this.showDeleteConfirm = true;
  }

  // Deletes the confirmed trainer from the assignments list
  deleteTrainer() {
    if (this.trainerToDelete) {
      this.trainerAssignments = this.trainerAssignments.filter(
        t => t !== this.trainerToDelete
      );
      this.onSearch(); // Re-apply filters to update the displayed list
      this.setFeedbackMessage(`Trainer ${this.trainerToDelete.email} deleted successfully.`, 'success');
    }
    this.showDeleteConfirm = false;
    this.trainerToDelete = null;
  }

  // Cancels the delete operation
  cancelDelete() {
    this.showDeleteConfirm = false;
    this.trainerToDelete = null;
    this.setFeedbackMessage('Delete operation cancelled.', 'info');
  }

  // Placeholder for download report logic
  downloadReport() {
    this.setFeedbackMessage('Download Report clicked! (Implementation pending)', 'info');
    // In a real application, you would generate a CSV or PDF here
    // Example: Convert filteredAssignments to CSV and trigger download
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
