import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

}
