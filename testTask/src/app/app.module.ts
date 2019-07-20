import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatListModule, MatTableModule, 
  MatPaginatorModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatBadgeModule, MatIconModule, MatAutocompleteModule, } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatToolbarModule, MatButtonModule, MatDividerModule, MatListModule, 
    MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
    MatSortModule, MatCardModule, MatChipsModule, MatBadgeModule, MatIconModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
