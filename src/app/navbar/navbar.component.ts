import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IdiomaService } from '../services/idioma.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Traducciones {
  inicio: string;
  sobreMi: string;
  cv: string;
  componentes: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuAbierto = false;

toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
}

  idiomaActual: string = 'es';
  textos: Traducciones = { inicio: '', sobreMi: '', cv: '', componentes: '' }; // inicialización segura

  // Definimos traducciones como readonly para TypeScript
  readonly traducciones: Record<string, Traducciones> = {
    es: { inicio: 'Inicio', sobreMi: 'Sobre mí', cv: 'CV', componentes: 'Componentes' },
    en: { inicio: 'Home', sobreMi: 'About Me', cv: 'CV', componentes: 'Components' }
  };

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit(): void {
      // Subscribirse al idioma y actualizar textos
      this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma;
      this.textos = this.traducciones[idioma]; // ahora TypeScript reconoce que siempre existe
    });
  }

  toggleIdioma(): void {
    const nuevo = this.idiomaActual === 'es' ? 'en' : 'es';
    this.idiomaService.cambiarIdioma(nuevo);
  }
}
