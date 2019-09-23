import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { UsuarioProvider } from './../usuario/usuario';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Injectable()
export class UbicacionProvider {
  taxista: AngularFirestoreDocument<any>;
  private watch: Subscription;
  constructor(private afdb: AngularFirestore, private geolocation: Geolocation, private usuarioProvider: UsuarioProvider) {
    // this.taxista = this.afdb.doc(`/usuarios/${this.usuarioProvider.clave}`);
  }

  inicializarTaxista() {
    this.taxista = this.afdb.doc(`/usuarios/${this.usuarioProvider.clave}`);
  }

  iniciarGeolocalizacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.taxista.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        clave: this.usuarioProvider.clave
      });
      this.watch = this.geolocation.watchPosition().subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
        this.taxista.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          clave: this.usuarioProvider.clave
        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  detenerUbicacion() {
    try{
      this.watch.unsubscribe();
    }catch(e){
      console.log(JSON.stringify(e));
    }
  }
}
