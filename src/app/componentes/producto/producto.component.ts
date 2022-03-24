import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from '../../models';
import { CarritoService } from '../../servicios/carrito.service';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;

  constructor(public carritoService: CarritoService,
              public modalController: ModalController) { }

  ngOnInit() {
    //console.log('el producto es', this.producto);
  }

  addCarrito(){
    this.carritoService.addProducto(this.producto);
  }

  async openModal() {
    console.log('this.producto', this.producto);
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      componentProps: {producto: this.producto}
    });
    return await modal.present();
  }

}
