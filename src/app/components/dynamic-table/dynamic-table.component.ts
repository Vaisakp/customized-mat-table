import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent {
  @Output() removeStudent: EventEmitter<any> = new EventEmitter();
  @Input() tableData: any;
  @Input() itemsCanbeSelected = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() displayedColumns: string[] = [];
  dataSource: any;
  isSelectAll: boolean = true;
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  removeItem(event: any) {
    this.removeStudent.emit(event);
  }

  isAllCheckBoxDisabled(student: any) {
    return this.dataSource.data.filter((item: any) => item.selected).length <
      this.itemsCanbeSelected
      ? false
      : student?.selected
      ? false
      : true;
  }

  selectAllStudents(event: any) {
    if (event?.checked) {
      let currentSelectedCount = this.dataSource?.data?.filter(
        (item: any) => item?.selected
      ).length;
      for (let index = 0; index < this.dataSource?.data?.length; index++) {
        if (currentSelectedCount < this.itemsCanbeSelected) {
          if (!this.dataSource?.data[index].selected) {
            this.dataSource.data[index].selected = true;
            currentSelectedCount++;
          }
        } else {
          break;
        }
      }
    } else {
      this.dataSource.data.forEach((item: any, index: any) => {
        this.dataSource.data[index].selected = false;
      });
    }
  }

  isAllSelected() {
    return (
      this.dataSource.data.filter((item: any) => item.selected).length >=
      this.itemsCanbeSelected
    );
  }
}
