import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MultiSelect } from '../../shared/multi-select/multi-select';
// Define a type for a generic record entry
interface RecordEntry {
  id: number;
  date: Date;
  type: 'Unit' | 'Trainer'; // Distinguishes between unit-related or trainer-related records
  unitName?: string;         // Optional: relevant for 'Unit' type records
  region?: string;           // Optional: relevant for both 'Unit' and 'Trainer' type records
  trainerEmail?: string;     // Optional: relevant for 'Trainer' type records
  description: string;       // A brief description of the record
  value?: number;            // Optional: a numerical value associated with the record (e.g., count, score)
}

@Component({
  imports: [CommonModule, FormsModule, RouterModule, MultiSelect],
  standalone: true,
  selector: 'app-records',
  templateUrl: './records.html',
  styleUrl: './records.css'
})
export class Records implements OnInit {

  // Data for dropdowns
  regions = ['North', 'South', 'East', 'West', 'Central', 'No Region']; // Added 'No Region'
  dateFilterTypes = ['Daily', 'Monthly', 'Quarterly', 'Annually'];
  entityTypes = ['All', 'Units', 'Trainers'];
  
  //load selected units and trainers from the entitytype and trainers dropdowns
  selectedTrainers: string[] =[]; // This will hold the selected trainers       
  selectedUnits: string[] =[];// This will hold the selected units
  // Dummy data for trainers and units (could be fetched from a service)
  units: string[] = ['Unit Alpha', 'Unit Beta', 'Unit Gamma', 'Unit Delta', 'Unit Zeta', 'Unit Eta', 'Unit X', 'Unit Y', 'Unit Z', 'Unit A'];
  trainers: string[] = ['trainer1@example.com', 'trainer2@example.com', 'trainer3@example.com', 'trainer4@example.com'];  

  // Filter selections
  selectedDateFilterType: string = 'Annually'; // Default to Annually
  selectedYear: number = new Date().getFullYear(); // Default to current year
  selectedMonth: number = new Date().getMonth() + 1; // Default to current month (1-12)
  selectedQuarter: number = Math.floor((new Date().getMonth() / 3)) + 1; // Default to current quarter (1-4)
  selectedDate: string = new Date().toISOString().substring(0, 10); // Default to current date (YYYY-MM-DD)
  selectedRegion: string = ''; // Default to all regions
  selectedEntityType: string = 'All'; // Default to all entity types

  // Data for records
  allRecords: RecordEntry[] = [];
  filteredRecords: RecordEntry[] = [];

  // Feedback message for user actions
  feedbackMessage: string | null = null;

  ngOnInit(): void {
    this.generateDummyRecords();
    this.onSearch(); // Apply initial filters
  }

  //
  // Generates dummy record data
  generateDummyRecords(): void {
    const currentYear = new Date().getFullYear();
    this.allRecords = [
      // Unit Records - North Region
      { id: 1, date: new Date(currentYear, 0, 15), type: 'Unit', unitName: 'Unit Alpha', region: 'North', description: 'Unit Alpha sessions completed', value: 120 },
      { id: 2, date: new Date(currentYear, 1, 20), type: 'Unit', unitName: 'Unit Beta', region: 'North', description: 'Unit Beta progress report', value: 85 },
      { id: 3, date: new Date(currentYear, 2, 5), type: 'Unit', unitName: 'Unit Alpha', region: 'North', description: 'Unit Alpha new enrollments', value: 30 },

      // Unit Records - South Region
      { id: 4, date: new Date(currentYear, 3, 10), type: 'Unit', unitName: 'Unit Gamma', region: 'South', description: 'Unit Gamma Q2 performance', value: 210 },
      { id: 5, date: new Date(currentYear, 4, 25), type: 'Unit', unitName: 'Unit Delta', region: 'South', description: 'Unit Delta resource usage', value: 55 },

      // Unit Records - No Region
      { id: 6, date: new Date(currentYear, 5, 1), type: 'Unit', unitName: 'Unit Zeta', region: 'No Region', description: 'Unit Zeta general update', value: 90 },
      { id: 7, date: new Date(currentYear, 6, 12), type: 'Unit', unitName: 'Unit Eta', region: 'No Region', description: 'Unit Eta maintenance log', value: 15 },

      // Trainer Records - North Region
      { id: 8, date: new Date(currentYear, 0, 25), type: 'Trainer', trainerEmail: 'trainer1@example.com', region: 'North', description: 'Trainer1 Q1 sessions delivered', value: 45 },
      { id: 9, date: new Date(currentYear, 1, 10), type: 'Trainer', trainerEmail: 'trainer2@example.com', region: 'North', description: 'Trainer2 feedback collected', value: 20 },

      // Trainer Records - South Region
      { id: 10, date: new Date(currentYear, 3, 20), type: 'Trainer', trainerEmail: 'trainer3@example.com', region: 'South', description: 'Trainer3 Q2 training hours', value: 60 },

      // Trainer Records - No Region (if applicable, e.g., for general admin trainers)
      { id: 11, date: new Date(currentYear, 7, 1), type: 'Trainer', trainerEmail: 'trainer4@example.com', region: 'No Region', description: 'Trainer4 general admin tasks', value: 5 },

      // Records for previous year
      { id: 12, date: new Date(currentYear - 1, 11, 1), type: 'Unit', unitName: 'Unit Alpha', region: 'North', description: 'Unit Alpha year-end review', value: 400 },
      { id: 13, date: new Date(currentYear - 1, 10, 15), type: 'Trainer', trainerEmail: 'trainer1@example.com', region: 'North', description: 'Trainer1 annual performance', value: 250 },

      // Records for different quarters
      { id: 14, date: new Date(currentYear, 0, 1), type: 'Unit', unitName: 'Unit X', region: 'East', description: 'Unit X Q1 start', value: 0 }, // Q1
      { id: 15, date: new Date(currentYear, 3, 1), type: 'Unit', unitName: 'Unit Y', region: 'West', description: 'Unit Y Q2 start', value: 0 }, // Q2
      { id: 16, date: new Date(currentYear, 6, 1), type: 'Unit', unitName: 'Unit Z', region: 'Central', description: 'Unit Z Q3 start', value: 0 }, // Q3
      { id: 17, date: new Date(currentYear, 9, 1), type: 'Unit', unitName: 'Unit A', region: 'North', description: 'Unit A Q4 start', value: 0 }, // Q4
    ];
    // Sort records by date descending for display
    this.allRecords.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Filters the records based on selected criteria
onSearch(): void {
  let tempFilteredRecords = [...this.allRecords];

  // 1. Filter by Entity Type
  if (this.selectedEntityType !== 'All') {
    tempFilteredRecords = tempFilteredRecords.filter(record =>
      record.type === this.selectedEntityType
    );
  }

  // 2. Filter by Region
  if (this.selectedRegion) {
    tempFilteredRecords = tempFilteredRecords.filter(record => {
      if (this.selectedRegion === 'No Region') {
        return record.region === 'No Region' || !record.region;
      }
      return record.region === this.selectedRegion;
    });
  }

  // 3. Filter by Date Range
  tempFilteredRecords = tempFilteredRecords.filter(record => {
    const recordDate = record.date;
    const recordYear = recordDate.getFullYear();
    const recordMonth = recordDate.getMonth() + 1; // 1-12
    const recordQuarter = Math.floor((recordDate.getMonth() / 3)) + 1; // 1-4

    switch (this.selectedDateFilterType) {
      case 'Daily':
        const filterDate = new Date(this.selectedDate);
        return recordDate.toDateString() === filterDate.toDateString();
      case 'Monthly':
        return recordYear === this.selectedYear && recordMonth === this.selectedMonth;
      case 'Quarterly':
        return recordYear === this.selectedYear && recordQuarter === this.selectedQuarter;
      case 'Annually':
        return recordYear === this.selectedYear;
      default:
        return true; // No date filter applied
    }
  });

  // 4. Filter by Units and Trainers
  this.filteredRecords = tempFilteredRecords.filter(record =>
    (
      this.selectedEntityType !== 'Trainers' ||
      !this.selectedTrainers.length ||
      record.trainerEmail !== undefined && this.selectedTrainers.includes(record.trainerEmail)
    ) &&
    (
      this.selectedEntityType !== 'Units' ||
      !this.selectedUnits.length ||
      record.unitName !== undefined && this.selectedUnits.includes(record.unitName)
    )
  );

  this.setFeedbackMessage(`Found ${this.filteredRecords.length} records.`, 'info');
}



  // Resets all filter selections and displays all records
  onReset(): void {
    this.selectedDateFilterType = 'Annually';
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedQuarter = Math.floor((new Date().getMonth() / 3)) + 1;
    this.selectedDate = new Date().toISOString().substring(0, 10);
    this.selectedRegion = '';
    this.selectedEntityType = 'All';
    this.filteredRecords = [...this.allRecords];
    this.setFeedbackMessage('Filters reset. Showing all records.', 'info');
  }

  // Downloads the filtered records as a CSV report
  downloadReport(): void {
    if (this.filteredRecords.length === 0) {
      this.setFeedbackMessage('No records to download. Please apply filters first.', 'info');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Unit Name', 'Region', 'Trainer Email', 'Description', 'Value'];
    const csvRows = [];

    // Add headers to CSV
    csvRows.push(headers.join(','));

    // Add data rows to CSV
    this.filteredRecords.forEach(record => {
      const row = [
        record.id,
        record.date.toLocaleDateString(), // Format date for CSV
        record.type,
        record.unitName || '', // Use empty string for undefined/null
        record.region || '',
        record.trainerEmail || '',
        record.description,
        record.value !== undefined && record.value !== null ? record.value : '' // Handle optional value
      ].map(item => {
        // Escape commas and wrap in quotes if necessary
        const stringItem = String(item);
        if (stringItem.includes(',') || stringItem.includes('"') || stringItem.includes('\n')) {
          return `"${stringItem.replace(/"/g, '""')}"`; // Escape double quotes
        }
        return stringItem;
      });
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection for download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'records_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the URL object
      this.setFeedbackMessage('Report downloaded successfully!', 'success');
    } else {
      this.setFeedbackMessage('Your browser does not support downloading files directly.', 'error');
    }
  }

  // Helper to display feedback messages
  setFeedbackMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.feedbackMessage = message;
    // You could add logic here to display different styles based on 'type'
    // For example, by setting a CSS class on the feedback message element
    setTimeout(() => {
      this.feedbackMessage = null; // Clear message after some time
    }, 5000); // Message disappears after 5 seconds
  }

  // Helper to get quarter from month (already present)
  getQuarter(month: number): number {
    return Math.floor((month - 1) / 3) + 1;
  }
}
