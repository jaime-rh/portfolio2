// src/app/services/idioma.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  // Observable para que los componentes puedan suscribirse
  private idiomaSubject = new BehaviorSubject<string>('es');
  idioma$ = this.idiomaSubject.asObservable();

  cambiarIdioma(nuevoIdioma: string) {
    this.idiomaSubject.next(nuevoIdioma);
  }

  obtenerIdioma(): string {
    return this.idiomaSubject.value;
  }
}
