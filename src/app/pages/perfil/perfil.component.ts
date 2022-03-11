import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from '../../servicios/firebaseauth.service';
import { FirestorageService } from '../../servicios/firestorage.service';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    nombre: '',
    ubicacion: null,
  };

  newFile: any;

  uid = '';

  constructor(public menu: MenuController,
              public firebaseauthService: FirebaseauthService,
              public firestorageService: FirestorageService,
              public firestoreService: FirestoreService) {
                this.firebaseauthService.stateAuth().subscribe( res => {
                  console.log(res);
                  if (res !== null) {
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                 }
          });
              }

   async ngOnInit() {

    const uid = await this.firebaseauthService.getUid();
    console.log(uid);

   }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }


  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.cliente.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
 }

 async registrarse(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular
    };
   const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err =>{
     console.log('error->', err);
    });
   console.log(res);
   const uid = await this.firebaseauthService.getUid();
   this.cliente.uid = uid;
   this.guardarUser();
   console.log(uid);
 }

 async guardarUser() {
  const path = 'Clientes';
  const name = this.cliente.nombre;
  if(this.newFile !== undefined){
  const res = await this.firestorageService.uploadImage(this.newFile, path, name);
  this.cliente.foto = res;
}
  // eslint-disable-next-line @typescript-eslint/no-shadow
  this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
      console.log('guardado con exito');
  }).catch(   error => {
  });
}

 async salir(){
  //const uid = await this.firebaseauthService.getUid();
  //console.log(uid);
  this.firebaseauthService.logout();
 }

 getUserInfo(uid: string) {
  console.log('getUserInfo');
  const path = 'Clientes';
  this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
         if (res !== undefined) {
           this.cliente = res;
         }
  });
}

}
