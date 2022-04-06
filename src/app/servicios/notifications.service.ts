import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    private router: Router,
    private http: HttpClient) {
      this.stateUser();
      //this.inicializar();
    }




  stateUser() {
    this.firebaseauthService.stateAuth().subscribe( res => {
      console.log(res);
      if (res !== null) {
         this.inicializar();
      }
    });

  }

  inicializar() {

    if (this.platform.is('capacitor')) {


      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }

      });
      PushNotifications.addListener('registration', (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      });
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));
        },
      );
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        },
      );



 } else {
   console.log('PushNotifications.requestPermission() -> no es movil');
 }

  }



  addListeners(){
  }

  guadarToken(token: any){
  }

}
