import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Store } from '@ngrx/store';
import { setUsers } from 'src/app/store/actions/user.actions';
import { State } from 'src/app/store/reducers';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PersistantService } from 'src/app/services/persistant.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['_id', 'name', 'company', 'eyeColor'];
  users: User[];
  constructor(
    private userService: UserService, 
    private store: Store<State>, 
    public dialog: MatDialog,
    private persistanceService: PersistantService
    ) { 
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('table', {static: true}) table: MatTable<Element>;

  ngOnInit() {
    if (this.persistanceService.get('usersData')) {
      this.bootstarapTable(this.persistanceService.get('usersData').users);
    } else {
      this.userService.getUsersList().subscribe((usersArray: User[]) => {
        this.persistanceService.set('usersData', usersArray);
        this.bootstarapTable(usersArray);
      });
    }
  }

  bootstarapTable(usersArray) {
    this.users = usersArray;
    this.initTable();
    this.store.dispatch(setUsers({users: [...usersArray]}));
  }

  openDialog(user: User, isCreateUser: boolean = false): void {
    !user && (user = new User());
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '980px',
      data: {user: user, isCreateMode: isCreateUser, table: this.table, tableSort: this.sort, tablePaginator: this.paginator}
    });
  }

  /**
   * filter by string value
   * @param filterValue {string}
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
