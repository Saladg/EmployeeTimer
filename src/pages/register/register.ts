import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, ModalController,
  NavParams, ToastController} from 'ionic-angular';
import {Observable } from 'rxjs/Rx';

import {EmployeesService} from '../../sprovider/empservice';
import {EmployeeModel } from '../../models/employee-model';
import {TimeInModel } from '../../models/time-in-model';
import {TimeOutModel } from '../../models/time-out-model';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})

export class RegisterPage implements OnInit {

  today: number = Date.now();

  observableEmployees: Observable<EmployeeModel[]>;
  observableTimeIn: Observable<TimeInModel[]>;
  observableTimeOut: Observable<TimeOutModel[]>;

  employees: EmployeeModel[];
  in_timings: TimeInModel[];
  // in_timings:any[]=[];
  out_timings: TimeOutModel[];

  errorMessage: String;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private employeesService: EmployeesService,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    //Initialize data
    this.employeesService.getBasicData();
    this.employeesService.getTimeIn();
    this.employeesService.getTimeOut();
  }

/*  ionViewDidLoad()
    this.employeesService.getBasicData();
    this.employeesService.getTimeIn();
    this.employeesService.getTimeOut();
  }*/

  ngOnInit(): void {

    // subscribe to observableEmployees
    this.observableEmployees = this.employeesService.getBasicData();
    this.observableEmployees.subscribe(result => this.employees = result,
      error => this.errorMessage = <any>error);
    // subscribe to observableTimeIn
    this.fetchTimeIns();

    // subscribe to observableTimeOut
    this.fetchTimeOuts();

    // update seconds in real-time
    setInterval(() => {
      this.today = Date.now();
    }, 1000)

  }

  fetchTimeIns() {
    this.employeesService.getTimeIn()
      .subscribe(result => this.in_timings = result,
      error => this.errorMessage = <any>error);
  }

  fetchTimeOuts() {
    this.employeesService.getTimeOut()
      .subscribe(result => this.out_timings = result,
      error => this.errorMessage = <any>error);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Please select your details..",
      duration: 3000
      // position:'middle'
    });
    toast.present();
  }

  logData() {
    console.log("IN-TIMINGS DATA: ", this.in_timings);
    console.log("OUT-TIMINGS DATA: ", this.out_timings);
  }

  onCheckIn(emp_id) {

    if (emp_id !== "") {
      let alert = this.alertCtrl.create({
        title: 'Confirm checkin',
        message: emp_id + ', Do you want to checkin?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel checkin: ', emp_id);
            }
          },
          {
            text: 'Yes',
            handler: () => {

              /*              for (let i = 0; i < this.in_timings.length; i++) {
                              let in_timing = this.in_timings[i];
                              while (in_timing)
              {*/
              let in_timing = this.in_timings.find(in_TimeObj => in_TimeObj.worker_timein_id === emp_id);
              while (in_timing)
                if (in_timing.worker_timein_id === emp_id && in_timing.check_status === true) {
                  let alert = this.alertCtrl.create({
                    title: 'Sorry,',
                    subTitle: 'You are already checked in!',
                    buttons: ['OK']
                  });
                  alert.present();
                  console.log("Employee already checked-in!");
                  break;
                }
                else if (in_timing.worker_timein_id === emp_id && in_timing.check_status === false) {
                  let checkInTime = new TimeInModel(in_timing.date, emp_id, in_timing.time_in, true);
                  this.employeesService.pushTimeIn(checkInTime)
                    .subscribe(checkInTime => {
                      // this.fetchTimeIns();
                    },
                    error => this.errorMessage = <any>error);
                  console.log("Successfully checked-in!");
                  break;
                }
                else {
                  console.log("All conditions exhausted!");
                  break;
                }

              // }
              // break;
              // }
            }
          }
        ]
      });
      alert.present();
    }
    else {
      this.presentToast();
    }
  }

  onCheckOut(emp_id) {
    if (emp_id !== "") {
      let alert = this.alertCtrl.create({
        title: 'Confirm checkout',
        message: emp_id + ', Do you want to checkout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel checkout: ', emp_id);
            }
          },
          {
            text: 'Yes',
            handler: () => {

              let out_timing = this.out_timings.find(out_TimeObj => out_TimeObj.worker_timeout_id === emp_id);
              while (out_timing)
                if (out_timing.worker_timeout_id === emp_id && out_timing.check_status === true) {
                  let alert = this.alertCtrl.create({
                    title: 'Sorry,',
                    subTitle: 'You are already checked out!',
                    buttons: ['OK']
                  });
                  alert.present();
                  console.log("Employee already checked-out!");
                  break;
                }
                else if (out_timing.worker_timeout_id === emp_id && out_timing.check_status === false) {
                  let checkOutTime = new TimeOutModel(out_timing.date, emp_id, out_timing.time_out, true);
                  this.employeesService.pushTimeOut(checkOutTime)
                    .subscribe(checkOutTime => {
                      // this.fetchTimeIns();
                    },
                    error => this.errorMessage = <any>error);
                  console.log("Successfully checked-out!");
                  break;
                }
                else {
                  console.log("All conditions exhausted!");
                  break;
                }
            }
          }
        ]
      });
      alert.present();
    }
    else {
      this.presentToast();
    }
  }
}
