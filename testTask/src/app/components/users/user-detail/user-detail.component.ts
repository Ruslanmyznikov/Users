import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {FormGroup, FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})


export class UserDetailComponent implements OnInit {
  users: User[];
  public user: User = new User();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isEditMode = false;
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
  });


  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
   }

  ngOnInit() {
    this.getUserData();
  }

  /**
   * find user by user._id
   */
  getUserData() {
    this.userService.getUsersList().subscribe(users => {
      this.users = users;
      this.user = JSON.parse(JSON.stringify(this.data))
      // Object.assign(, this.data)
      // console.log((this.user)
      this.userDetailEdit.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        balance: this.user.balance,
        age: this.user.age,
        address: this.user.address,
        tagsCtrl: this.user.tags,
        about: this.user.about,
      })
      this.allTags = this.user.tags;
    })
  }

  remove(tag: string): void {
    const index = this.allTags.indexOf(tag);

    if (index >= 0) {
      this.allTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allTags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  getUserPictureUrl() {
    return `url(${this.user.picture})`;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
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

  onSubmit() {
    let formData = this.userDetailEdit.value;
    console.log(formData)
    this.user.name = formData.name;
    this.user.email = formData.email;
    this.user.balance = formData.balance;
    this.user.address = formData.address;
    this.user.tags = formData.tagsCtrl;
    this.user.about = formData.about;
    this.isEditMode = false;
  }
}

