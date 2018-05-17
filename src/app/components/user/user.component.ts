import { DialogComponent } from './../add-food/add-food.component';
import { User } from './../../classes/user';
import { UserService } from './../../services/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  user = <User>{};
  displayedColumns = ['select', 'email', 'lastName', 'firstName', 'disabled', 'permission'];
  dataSource = new MatTableDataSource();
  selectedCheckbox = [];
  selectedId = [];
  haveSelection = false;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: User, filter: string) => data.email.indexOf(filter) !== -1;
    this.userService.getUserList().subscribe(data => {
      this.dataSource.data = data;
    });
  }



  cellCheckToggle(row, index) {
    this.user = row;
    this.haveSelection = false;
    this.selectedId[index] = row.id;
    for (const i in this.selectedCheckbox) {
      if (this.selectedCheckbox[i]) {
        this.haveSelection = true;
      }
    }
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateUser() {
    for (const i in this.selectedCheckbox) {
      if (this.selectedCheckbox[i]) {
          this.userService.updateUser(this.dataSource.data[i]);
          this.selectedCheckbox[i] = false;
      }
    }
    this.openDialog('Cập nhật thành công');
    this.haveSelection = false;
  }

  openDialog(message) {
    this.dialog.open(DialogComponent, {
        data: message
    });
  }

}
