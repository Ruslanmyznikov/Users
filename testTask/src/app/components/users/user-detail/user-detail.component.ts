import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})


export class UserDetailComponent implements OnInit {
  users: User[];
  user: User;
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      console.log(this.filteredTags)
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
      this.route.paramMap.subscribe(params => {
        this.user = this.users.find(val => (val._id === params.get('userId')));
        this.allTags = this.user.tags;
      });
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
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.allTags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.tagCtrl.setValue(null);
    }
  }
}

