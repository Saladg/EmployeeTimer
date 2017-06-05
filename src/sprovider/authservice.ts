import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Admin {

  constructor(private username, private password) {
    this.username = username;
    this.password = password;
  }
}
 
@Injectable()
export class AuthService {
  currentAdmin: Admin;
 
  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } 
    else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.username === "admin" && credentials.password === "pass");
        this.currentAdmin = new Admin('admin', 'password');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentAdmin = null;
      observer.next(true);
      observer.complete();
    });
  }
}
