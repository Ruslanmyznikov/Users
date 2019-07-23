import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {FormGroup, FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { editUser, createUser, killUser } from 'src/app/store/actions/user.actions';
import { State } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { PersistantService } from 'src/app/services/persistant.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  users: User[];
  user: User = new User();
  isEditMode = false;
  isCreateMode = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('tagsInput', {static: false}) tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  tagCtrl = new FormControl();

  userDetailEdit = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    balance: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    tagsCtrl: new FormControl(''),
    about: new FormControl(''),
    company: new FormControl(''),
    eyeColor: new FormControl(''),
    registered: new FormControl(''),
  });


  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, isCreateMode: boolean, table: any, tableSort: any, tablePaginator: any}, 
    private store: Store<State>,
    private persistanceService: PersistantService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      this.isCreateMode = this.data.isCreateMode;
   }

  ngOnInit() {
    this.getUserData();
  }

  /**
   * find user by user._id
   */
  getUserData() {
    this.user = JSON.parse(JSON.stringify(this.data.user))
    this.userDetailEdit.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      balance: this.user.balance,
      age: this.user.age,
      address: this.user.address,
      tagsCtrl: this.user.tags,
      about: this.user.about,
      company: this.user.company,
      eyeColor: this.user.eyeColor,
      registered:  this.user.registered,
    })
    this.allTags = this.user.tags;
  }


  /**
   * get url for user picture
   */
  getUserPictureUrl() {
    return `url(${this.user.picture})`;
  }

  /**
   * Add value of input into select options for next times
   * @param event {MatChipInputEvent}
   */
  addOptions(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.allTags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }
      this.tagCtrl.setValue(null);
    }
  }

  /**
   * remove tag from select options
   * @param tag {string}
   */
  removeTag(tag: string): void {
    const index = this.allTags.indexOf(tag);

    if (index >= 0) {
      this.allTags.splice(index, 1);
    }
  }

  /**
   * select tag
   * @param event {MatAutocompleteSelectedEvent}
   */
  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.allTags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  /**
   * filter for tags
   * @param value {string}
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  killUser(user: User) {
    this.store.dispatch(killUser(this.user))
    this.updateTable();
  }

  /**
   * update table
   * close popup
   */
  updateTable() {
    this.store.select(state => state.users).subscribe(data => {
      this.persistanceService.set('usersData', data)
      this.data.table.dataSource = new MatTableDataSource(data.users);
      this.data.table.dataSource.paginator = this.data.tablePaginator;
      this.data.table.dataSource.sort = this.data.tableSort;
      this.data.table.renderRows();
    })
    this.dialogRef.close();
  }

  onSubmit() {
    let formData = this.userDetailEdit.value;
    this.user.name = formData.name;
    this.user.email = formData.email;
    this.user.balance = formData.balance;
    this.user.address = formData.address;
    this.user.tags = formData.tagsCtrl;
    this.user.about = formData.about;
    this.user.company = formData.company;
    this.user.eyeColor = formData.eyeColor;
    this.user.registered = formData.registered;
    this.isEditMode && this.store.dispatch(editUser(this.user))
    this.isCreateMode && this.store.dispatch(createUser(this.user))
    this.updateTable();
  }


}

