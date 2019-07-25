import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatListModule, MatTableModule, 
  MatPaginatorModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatBadgeModule, 
  MatIconModule, MatAutocompleteModule, MatNativeDateModule, } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule, MatButtonModule, MatDividerModule, MatListModule, 
    MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
    MatSortModule, MatCardModule, MatChipsModule, MatBadgeModule, MatIconModule,
    MatAutocompleteModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
