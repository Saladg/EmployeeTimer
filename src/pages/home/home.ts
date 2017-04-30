import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SignInPage} from '../logs/logs.signin';
import {SignOutPage} from '../logs/logs.signout';

@Component({
  selector: 'home-page',
  // templateUrl: 'home.html',
  template:`

<ion-header>
    <ion-navbar>
      <ion-title>HomePage</ion-title>
    </ion-navbar>
</ion-header>

<ion-content padding>

<ion-img img src="../assets/imgs/logo.png" width="100%" height="25%"> </ion-img><br><br>

<h3>{{ today | date:'medium' }} </h3>
<br><br>

  <form>
<h3>
      <button ion-button (click)="onSignIn()"><ion-icon name="person"></ion-icon>&nbsp;&nbsp;&nbsp;Sign-In</button>
      <button ion-button (click) = "onSignOut()"><ion-icon name="person"></ion-icon>&nbsp;&nbsp;&nbsp;Sign-Out</button>
</h3>   
  </form>

</ion-content>

  `,
  styles:[`
      .button{
        margin:2%;
      }
      h3{
        color:#456321;
      }
  `]
})
export class HomePage {

  today: number = Date.now();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSignIn(){
    this.navCtrl.push(SignInPage);
  }
  onSignOut(){
    this.navCtrl.push(SignOutPage);
  }
}
