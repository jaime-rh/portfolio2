import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // ruta por defecto
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre-mi', component: SobreMiComponent },
];
