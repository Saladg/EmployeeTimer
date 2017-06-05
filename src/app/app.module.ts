import {NgModule, ErrorHandler } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {HttpModule } from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import {IonicStorageModule } from '@ionic/storage';
import {MyApp} from './app.component';
import {AdminLoginPage} from '../pages/adminlogin/admin.login';
import {RegisterPage} from '../pages/register/register';
import {AdminHomePage} from '../pages/adminhome/admin.home';
import {AuthService} from '../sprovider/authservice';
import {EmployeesService} from '../sprovider/empservice';
import {StatusBar } from '@ionic-native/status-bar';
import {SplashScreen } from '@ionic-native/splash-screen';

/*// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';


// AF2 Settings
export const firebaseConfig = {

};
*/

@NgModule({
  declarations: [
    MyApp,
    AdminLoginPage,
    RegisterPage,
    AdminHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdminLoginPage,
    RegisterPage,
    AdminHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    EmployeesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
