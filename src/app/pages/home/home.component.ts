/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../servicios/firestore.service';
import { Producto } from 'src/app/models';
import { FirestorageService } from '../../servicios/firestorage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private path = 'productos/';

  productos: Producto[] = [];

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService) {

                this.loadProductos();

   }

  ngOnInit() {
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  loadProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(   res => {
      this.productos = res;
      //console.log('productos', res);
    });
}

}
