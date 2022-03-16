import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../servicios/firestore.service';
import { Pedido } from '../../models';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {


  pedido: Pedido;

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public carritoService: CarritoService) {

                this.initCarrito();
                this.loadPedido();

}

ngOnInit() {
}

openMenu(){
console.log('open menu');
this.menu.toggle('principal');
}

loadPedido(){
      this.carritoService.getCarrito().subscribe(  res => {
        this.pedido =  res;
      });
}

initCarrito(){
  this.pedido ={
    id: '',
    cliente: null,
    productos: [],
    precioTotal: null,
    estado: 'enviado',
    fecha: new Date(),
    valoracion: null,
  };
}

}
