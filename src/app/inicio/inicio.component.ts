import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  textoActual = '';
  idiomaActual: string = 'es';

  textos: any = {}; // Textos fijos según idioma

  private textosFijos: Record<string, any> = {
    es: { fondo: 'Hola', soy: 'Soy ', misRedes: 'Mis redes' },
    en: { fondo: 'Hello', soy: "I'm ", misRedes: 'My networks' }
  };

  private textosDinamicos: Record<string, string[]> = {
    es: ['Desarrollador Full Stack', 'Entusiasta de la tecnología'],
    en: ['Full Stack Developer', 'Tech Enthusiast']
  };

  private indiceTexto = 0;
  private velocidadEscribir = 30;
  private velocidadBorrar = 40;
  private pausaFinal = 2000;
  private timeoutId: any;

  constructor(private zone: NgZone, private idiomaService: IdiomaService) {}

  ngOnInit(): void {
    // Suscribirse al idioma
    this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma;
      this.textos = this.textosFijos[idioma];
      this.indiceTexto = 0;
      this.iniciarCiclo();
    });

    // Iniciar ciclo de texto
    this.zone.runOutsideAngular(() => {
      this.textos = this.textosFijos[this.idiomaActual];
      this.iniciarCiclo();
    });
  }

  private iniciarCiclo(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    const textos = this.textosDinamicos[this.idiomaActual];
    const texto = textos[this.indiceTexto];
    this.escribir(texto, 0);
  }

  private escribir(texto: string, i: number): void {
    if (i <= texto.length) {
      this.zone.run(() => (this.textoActual = texto.slice(0, i)));
      this.timeoutId = setTimeout(() => this.escribir(texto, i + 1), this.velocidadEscribir);
    } else {
      this.timeoutId = setTimeout(() => this.borrar(texto, texto.length), this.pausaFinal);
    }
  }

  private borrar(texto: string, i: number): void {
    if (i > 0) {
      this.zone.run(() => (this.textoActual = texto.slice(0, i - 1)));
      this.timeoutId = setTimeout(() => this.borrar(texto, i - 1), this.velocidadBorrar);
    } else {
      const textos = this.textosDinamicos[this.idiomaActual];
      this.indiceTexto = (this.indiceTexto + 1) % textos.length;
      this.iniciarCiclo();
    }
  }
}
