import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../../servicios/firebaseauth.service';
import { Subscription } from 'rxjs';
import { Pedido } from '../../models';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss'],
})
export class MispedidosComponent implements OnInit, OnDestroy {

  nuevosSuscriber: Subscription;
  culmidadosSuscriber: Subscription;
  pedidos: Pedido[] = [];

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public firebaseauthService: FirebaseauthService) { }

  ngOnInit() {
    this.getPedidosNuevos();
  }

  ngOnDestroy() {
    if (this.nuevosSuscriber) {
       this.nuevosSuscriber.unsubscribe();
    }
    if (this.culmidadosSuscriber) {
       this.culmidadosSuscriber.unsubscribe();
    }
 }


  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
    }

    changeSegment(ev: any) {
       console.log('changeSegment()', ev.detail.value);
       const opc = ev.detail.value;
       if (opc === 'entregados') {
        this.getPedidosCulminados();
       }
       if (opc === 'nuevos') {
            this.getPedidosNuevos();
      }
    }

   async getPedidosNuevos(){
    console.log('getPedidosNuevos()');
    const uid = await this.firebaseauthService.getUid();
    const path = 'Clientes/' + uid + '/pedidos/';
    this.nuevosSuscriber = this.firestoreService.getCollectionQuery<Pedido>(path, 'estado', '==', 'enviado').subscribe( res =>  {
      if (res.length) {
        console.log('getPedidosNuevos() -> res ', res);
        this.pedidos = res;
  }
    });
   }

   async getPedidosCulminados(){
    console.log('getPedidosEntregados()');
    const uid = await this.firebaseauthService.getUid();
    const path = 'Clientes/' + uid + '/pedidos/';
    this. culmidadosSuscriber = this.firestoreService.getCollectionQuery<Pedido>(path, 'estado', '==', 'entregado').subscribe( res =>  {
      if (res.length) {
        console.log('getPedidosEntregados() -> res ', res);
        this.pedidos = res;
  }
    });
   }


}
