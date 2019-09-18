import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput() {
    this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Login',
          handler: data => {
            console.log(data);
            this.verificarUsuario(data.username);
          }
        }
      ]
    }).present();
  }

  ingresar() {

  }

  verificarUsuario(clave: string) {
    let loading = this.loadingCtrl.create({
      content: 'Verificando'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
