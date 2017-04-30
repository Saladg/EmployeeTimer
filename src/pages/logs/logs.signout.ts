import { Component } from '@angular/core';

@Component({
  selector: 'signin-page',
  templateUrl: 'logs.signout.html'
})
export class SignOutPage {

searchQuery: string = '';
  empsId: string[];

  constructor() {
    this.initializeEmployees();
  }

  initializeEmployees() {
    this.empsId = [
      'AA-01',
      'AA-02',
      'AA-03',
      'AC-01',
      'AC-02',
      'AC-03'
    ];
  }

  getEmployees(ev: any) {
    // Reset employees
    this.initializeEmployees();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.empsId = this.empsId.filter((empId) => {
        return (empId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}