import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {HomePage} from '../home/home'

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage {

  constructor(public navCtrl:NavController){}

public myForm=new FormGroup({
           username: new FormControl('',Validators.required),
           password: new FormControl('',Validators.required)
});

    ngOnInit() 
      {

      }

    onSubmit(){
      this.navCtrl.push(HomePage);
      console.log("Username and password: ",this.myForm.value);

      }
}
