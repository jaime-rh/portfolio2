import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { CVComponent } from './cv/cv.component';
import { ComponentesComponent } from './componentes/componentes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // ruta por defecto
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre-mi', component: SobreMiComponent },
  { path: 'CV', component: CVComponent },
  { path: 'componentes', component: ComponentesComponent },
];
