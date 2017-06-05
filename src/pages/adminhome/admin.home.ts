import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController,
  ActionSheetController} from 'ionic-angular';
import {EmployeesService} from '../../sprovider/empservice';
import {EmployeeModel} from '../../models/employee-model';
import {Observable } from 'rxjs/Rx';
import {Http} from '@angular/http';

@Component({
  selector: 'admin-home-page',
  templateUrl: 'admin.home.html',
  styles: [`
        .button{
        margin:4%;
        background-color:#539ceb;
      }
      h3{
        color:#456321;
        margin:4%;
      }
  `]
})
export class AdminHomePage implements OnInit {

  today: number = Date.now();

  observableEmployees: Observable<EmployeeModel[]>;
  allEmployees: EmployeeModel[];
  errorMsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public empService: EmployeesService, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
    public http: Http) {

    //Initialize data
    this.empService.getBasicData();
  }

  ngOnInit(): void {

    this.observableEmployees = this.empService.getBasicData();
    this.observableEmployees.subscribe(result => this.allEmployees = result,
      error => this.errorMsg = <any>error);
    console.log(this.allEmployees);

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Please enter all the details correctly..",
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // removeEmployee(employee_id){

  //   this.empService.removeEmployee(employee_id);

  // }

  showOptions(employee_id, first_name, last_name) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What you can do..',
      buttons: [
        {
          text: 'Update employee',
          handler: () => {
            return this.updateEmployee(employee_id, first_name, last_name);
          }
        },
        {
          text: 'Remove employee',
          role: 'destructive',
          handler: () => {
            // this.removeEmployee(employee_id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }

      ]
    });
    actionSheet.present();
  }

  addEmployee() {

    let prompt = this.alertCtrl.create({
      title: 'Add new employee',
      message: "Enter employee details",
      inputs: [
        {
          name: 'employee_id',
          placeholder: 'Employee id'
        },

        {
          name: 'first_name',
          placeholder: 'First name'
        },
        {
          name: 'last_name',
          placeholder: 'Last name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data.employee_id !== "", data.first_name !== "", data.last_name !== "") {
              this.empService.pushTimeIn(data);
            }

            else {
              this.presentToast();
              this.addEmployee();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateEmployee(employee_id, first_name, last_name) {

    let prompt = this.alertCtrl.create({
      title: 'Edit employee',
      message: "Update employee details",
      inputs: [
        {
          name: 'employee_id',
          placeholder: 'Employee identity',
          value: employee_id
        },
        {
          name: 'first_name',
          placeholder: 'Last name',
          value: first_name
        },
        {
          name: 'last_name',
          placeholder: 'Last name',
          value: last_name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            // this.allEmployees.push(data.json());
            // return this.empService.editEmployee(data);

            // this.empService.empsData.update(employee_id,first_name,last_name);
          }
        }
      ]
    });
    prompt.present();
  }

}
