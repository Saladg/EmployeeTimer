import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {AdminHomePage} from '../adminhome/admin.home';
import {RegisterPage} from '../register/register';
import {AuthService} from '../../sprovider/authservice'

@Component({
  selector: 'admin-login-page',
  templateUrl: 'admin.login.html',
  styles:[`

      #btnHome{
      font-size:14px;
      color:#488aff;
      background-color:transparent;
}
  
  `]
})

export class AdminLoginPage {

  loading: Loading;
  constructor(public navCtrl:NavController, public navParams: NavParams, private auth: AuthService, 
  private alertCtrl: AlertController, private loadingCtrl: LoadingController){

   
  }

public myForm=new FormGroup({
           username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(10)]),
           password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)])
});

    ngOnInit() 
      {

      }

onSubmitAdmin(){
      
    this.showLoading()

    this.auth.login(this.myForm.value).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.push(AdminHomePage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

    onHome(){

      this.navCtrl.push(RegisterPage);
    }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
