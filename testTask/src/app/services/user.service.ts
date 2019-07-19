import { Injectable } from '@angular/core';
import data from './users.json';
import { Observable } from 'rxjs';
import { User } from '../models/user.model.js';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  /**
   * get users from JSON file
   * @returns {Observable}
   */
  getUsersList (): Observable<User[]> {
    return Observable.create(observer => {
      observer.next(data);
    })
  }
}
