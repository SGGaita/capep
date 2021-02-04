import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private userData = new BehaviorSubject([]);
  sharedUser = this.userData.asObservable();

  constructor() { }

  nextUserID(user: []) {
    this.userData.next(user)
  }
}
