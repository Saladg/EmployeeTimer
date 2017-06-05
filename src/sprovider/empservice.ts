import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http, Response } from '@angular/http';
import {Observable } from 'rxjs/Rx';
import {EmployeeModel} from '../models/employee-model';
import {TimeInModel} from '../models/time-in-model';
import {TimeOutModel} from '../models/time-out-model';
// import { AngularFireDatabase} from 'angularfire2/database';

@Injectable()

export class EmployeesService {

  empApiUrl = 'http://***********/api/employees';

  /*empApiUrl='https://***********.firebaseio.com';
  timeInUrl = 'https://***********.firebaseio.com/in_timings';
  timeOutUrl = 'https://**********.firebaseio.com/out_timings';
  */

  constructor(private http: Http) {

    //Initialize data
    this.getBasicData();
    this.getTimeIn();
    this.getTimeOut();

  }

  getBasicData(): Observable<EmployeeModel[]> {
    return this.http.get(this.empApiUrl + '/id')
      // return this.http.get(this.empApiUrl+'/id')
      .map(res => <EmployeeModel[]>res.json())
      //.map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  getTimeIn(): Observable<TimeInModel[]> {
    return this.http.get(this.empApiUrl + '/time-in')
      //  return this.http.get(this.timeInUrl+'/.json')
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  getTimeOut(): Observable<TimeOutModel[]> {
    return this.http.get(this.empApiUrl + '/time-out')
      //  return this.http.get(this.timeOutUrl+'/.json')
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  pushTimeIn(timing: TimeInModel): Observable<TimeInModel> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.empApiUrl + '/time-in/', timing, options)
      // return this.http.post(this.timeInUrl+'/.json', timing, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  pushTimeOut(timing: TimeOutModel): Observable<TimeOutModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.empApiUrl + '/time-out/', timing, options)
      // return this.http.post(this.timeOutUrl+'/.json', timing, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
