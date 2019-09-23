import { UsuarioProvider } from './../../providers/usuario/usuario';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from './../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lng: number;

  user: any = {};

  constructor(public navCtrl: NavController, private ubicacionProv: UbicacionProvider, private usuarioProvider: UsuarioProvider) {
    this.ubicacionProv.iniciarGeolocalizacion();
    this.ubicacionProv.inicializarTaxista();
    this.ubicacionProv.taxista.valueChanges().subscribe(data => {
      console.log(data);
      this.user = data;
    });
  }

  salir() {
    this.ubicacionProv.detenerUbicacion();
    this.usuarioProvider.borrarUsuario();
    this.navCtrl.setRoot(LoginPage);
  }
}
