import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMiComponent {

  tabSeleccionado: string = ''; // tab inicial

  cambiarTab(tab: string) {
    this.tabSeleccionado = tab;
  }

  seccion: string = 'frontend'; //tabs de tecnoilogias (por defecto sale primero siempre frontend)

  seleccionar(seccion: string) {
    this.seccion = seccion;
  }

}
