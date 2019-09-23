import { HomePage } from './../home/home';
import { UsuarioProvider } from './../../providers/usuario/usuario';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private usuarioProvider: UsuarioProvider) { }

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
            this.verificarUsuario(data.username);
          }
        }
      ]
    }).present();
  }

  ingresar() {
    this.navCtrl.setRoot(HomePage);
  }

  verificarUsuario(clave: string) {
    let loading = this.loadingCtrl.create({
      content: 'Verificando'
    });

    loading.present();
    this.usuarioProvider.verificaUsuario(clave).then(existe => {
      loading.dismiss();
      if(existe) {
        this.slides.lockSwipes(false);
        this.slides.freeMode = true;
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        this.slides.freeMode = false;
      }else {
        this.alertCtrl.create({
          title: 'Usuario incorrecto',
          subTitle: 'Hable con el administrador o pruebe de nuevo',
          buttons: ['Aceptar']
        }).present();
      }
    });
  }
}
