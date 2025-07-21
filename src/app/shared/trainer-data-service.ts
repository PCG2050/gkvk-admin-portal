import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrainerDataService {
  // Signals for reactive state (Angular 17+)
  trainerEmails = signal<string[]>([]);
  regions = signal<string[]>(['North', 'South', 'East', 'West']);
  units = signal<string[]>(['Unit X', 'Unit Y', 'Unit Z', 'Unit A', 'Unit B']);

  // You can add methods to update these lists if needed
  setTrainerEmails(emails: string[]) {
    this.trainerEmails.set(emails);
  }
  addTrainerEmail(email: string) {
    this.trainerEmails.update(list => [...list, email]);
  }
  // Similarly for regions and units...
}