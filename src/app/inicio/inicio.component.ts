import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {
  textoActual = '';
  private textos = ['Desarrollador Full Stack', 'Entusiasta de la tecnología'];
  private indiceTexto = 0;

  private velocidadEscribir = 30;
  private velocidadBorrar = 40;
  private pausaFinal = 2000;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    // Ejecuta el ciclo de escritura fuera de Angular para no bloquear la hidratación
    this.zone.runOutsideAngular(() => {
      this.iniciarCiclo();
    });
  }

  private iniciarCiclo(): void {
    const texto = this.textos[this.indiceTexto];
    this.escribir(texto, 0);
  }

  private escribir(texto: string, i: number): void {
    if (i <= texto.length) {
      // como estamos fuera de Angular, hay que forzar render solo cuando cambia texto
      this.zone.run(() => (this.textoActual = texto.slice(0, i)));
      setTimeout(() => this.escribir(texto, i + 1), this.velocidadEscribir);
    } else {
      setTimeout(() => this.borrar(texto, texto.length), this.pausaFinal);
    }
  }

  private borrar(texto: string, i: number): void {
    if (i > 0) {
      this.zone.run(() => (this.textoActual = texto.slice(0, i - 1)));
      setTimeout(() => this.borrar(texto, i - 1), this.velocidadBorrar);
    } else {
      this.indiceTexto = (this.indiceTexto + 1) % this.textos.length;
      this.iniciarCiclo();
    }
  }
}

