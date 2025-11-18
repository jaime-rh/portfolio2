import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent {
  idiomaActual: 'es' | 'en' = 'es';
  pdfFilePath: string = 'assets/CV/CV-Jaime-Romero-Hernández.pdf';
  pdfUrl: SafeResourceUrl;

  textos = {
    es: { descargar: 'Descargar CV' },
    en: { descargar: 'Download CV' }
  };

  constructor(private sanitizer: DomSanitizer, private idiomaService: IdiomaService) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfFilePath);

    // Suscribirse a cambios de idioma con type assertion
    this.idiomaService.idioma$.subscribe((idioma) => {
      // Forzamos el tipo a 'es' | 'en'
      this.idiomaActual = idioma as 'es' | 'en';

      // Cambiar ruta del PDF según idioma
      if (this.idiomaActual === 'es') {
        this.pdfFilePath = 'assets/CV/CV-Jaime-Romero-Hernández.pdf';
      } else {
        this.pdfFilePath = 'assets/CV/CV-Jaime-Romero-Hernández-EN.pdf';
      }

      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfFilePath);
    });
  }
}
