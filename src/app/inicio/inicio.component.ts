import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

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

    private velocidadEscribir = 100;
    private velocidadBorrar = 50;
    private pausaFinal = 1500;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.cicloTextos(0);
    }

    private cicloTextos(indiceTexto: number): void {
      const textoActual = this.textos[indiceTexto];
      let indiceLetra = textoActual.length;

      // Borrar el texto letra por letra
      const borrar = () => {
        if (indiceLetra >= 0) {
          this.textoActual = textoActual.slice(0, indiceLetra--);
          this.cdr.detectChanges();
          setTimeout(borrar, this.velocidadBorrar);
        } else {
          escribir(0);
        }
      };

      // Escribir el siguiente texto letra por letra
      const escribir = (i: number) => {
        const siguienteTexto = this.textos[(indiceTexto + 1) % this.textos.length];
        if (i <= siguienteTexto.length) {
          this.textoActual = siguienteTexto.slice(0, i);
          this.cdr.detectChanges();
          setTimeout(() => escribir(i + 1), this.velocidadEscribir);
        } else {
          setTimeout(() => this.cicloTextos((indiceTexto + 1) % this.textos.length), this.pausaFinal);
        }
      };

      borrar(); // iniciar borrado
    }
}


