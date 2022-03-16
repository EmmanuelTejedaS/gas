import { Component, OnInit, Input } from '@angular/core';
import { ProductoPedido } from '../../models';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-itemcarrito',
  templateUrl: './itemcarrito.component.html',
  styleUrls: ['./itemcarrito.component.scss'],
})
export class ItemcarritoComponent implements OnInit {

  @Input() productoPedido: ProductoPedido;

  constructor(public carritoService: CarritoService) { }

  ngOnInit() {}

  addCarrito(){
    this.carritoService.addProducto(this.productoPedido.producto);
  }

  removeCarrito(){
    this.carritoService.removeProducto(this.productoPedido.producto);
  }

}
