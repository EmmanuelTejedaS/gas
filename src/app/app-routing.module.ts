import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseauthService } from './servicios/firebaseauth.service';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

//const uidAdmin = 'UwDgg5grfeWxvKVfqpuImy7UPTF3';
//const isAdmin = () => map( (user: any) => !!user && user.uid === uidAdmin);
//const isAdmin2 = (next: any) => map( (user: any) => !!user && 'UwDgg5grfeWxvKVfqpuImy7UPTF3' === user.uid);
// , ...canActivate(isAdmin)


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'set-productos', component: SetProductosComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'mis-pedidos', component: MispedidosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [ AngularFireAuthModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
