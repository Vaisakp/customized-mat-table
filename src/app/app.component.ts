import { Component, ViewChild } from '@angular/core';
import { StudentService } from './services/student.service';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('allStudentsTable') allStudentsTable!: DynamicTableComponent;
  allStudentsList: any = [];
  selectedStudentsList: any = [];
  interViewDetails = {
    name: 'computer engineering dept',
    time: '10:00',
    date: '2024-10-22',
    maximumSlots: 8,
  };
  constructor(private studentService: StudentService) {}
  ngOnInit() {
    this.studentService.getAllStudents().subscribe((response: any) => {
      this.allStudentsList = response;
      this.studentService.getSelectedStudents().subscribe((response: any) => {
        this.selectedStudentsList = response;
        this.allStudentsList.forEach((student: any, index: any) => {
          this.allStudentsList[index].selected =
            this.selectedStudentsList.length + (index + 1) <=
            this.interViewDetails.maximumSlots
              ? true
              : false;
        });
      });
    });
  }
  addStudent() {
    const selectedStudents = this.allStudentsTable.dataSource.data.filter(
      (item: any) => item?.selected
    );
    this.selectedStudentsList = [
      ...this.selectedStudentsList,
      ...selectedStudents,
    ];
    this.allStudentsList = this.allStudentsTable.dataSource.data.filter(
      (item: any) => !item?.selected
    );
  }

  isButtonDisabled() {}
  removeStudentC(event: any) {
    this.selectedStudentsList = this.selectedStudentsList.filter(
      (item: any) => item?.id != event.id
    );
    this.allStudentsList.push({ ...event, selected: false });
  }
}
