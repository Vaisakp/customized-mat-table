import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}

  getAllStudents() {
    return of([
      { id: 1, name: 'Grace', age: 20, gender: 'Female' },
      { id: 2, name: 'Alice', age: 23, gender: 'Female' },
      { id: 3, name: 'Bob', age: 21, gender: 'Male' },
      { id: 4, name: 'John', age: 18, gender: 'Male' },
      { id: 5, name: 'Hannah', age: 19, gender: 'Female' },
      { id: 6, name: 'Charlie', age: 25, gender: 'Male' },
    ]);
  }

  getSelectedStudents() {
    return of([
      { id: 7, name: 'David', age: 24, gender: 'Male' },
      { id: 8, name: 'Ivy', age: 22, gender: 'Female' },
      { id: 9, name: 'Jack', age: 20, gender: 'Male' },
      { id: 10, name: 'Eve', age: 21, gender: 'Female' },
    ]);
  }
}
