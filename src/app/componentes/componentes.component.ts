import { Component } from '@angular/core';
import { TeclasComponent } from "../teclas/teclas.component";
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';
import { AudioComponent } from "../audio/audio.component";
import { FirmaComponent } from "../firma/firma.component";

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [TeclasComponent, AudioComponent, FirmaComponent],
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css'] 
})
export class ComponentesComponent {
  idiomaActual: string = 'es';
  textos: any = {}; // Se llenará según el idioma
  subscription!: Subscription;

  private textosEs = {
    tituloComponentes: 'Mis Componentes',
  }

  private textosEn = {
    tituloComponentes: 'My Components',
  }

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit() {
    // Inicializamos el idioma actual
    this.actualizarTextos(this.idiomaActual);

    // Suscribirse a cambios de idioma
    this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma;
      this.actualizarTextos(idioma);
    });
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }
}
