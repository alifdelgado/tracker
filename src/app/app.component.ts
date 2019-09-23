import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from './../providers/usuario/usuario';

import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private usuarioProvider: UsuarioProvider) {
    platform.ready().then(() => {
      this.usuarioProvider.cargarStorage().then(existe => {
        statusBar.styleDefault();
        splashScreen.hide();

        if(existe) {
          this.rootPage = HomePage
        }else{
          this.rootPage = LoginPage;
        }
      });
    });
  }
}
