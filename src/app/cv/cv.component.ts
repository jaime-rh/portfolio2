import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent {
  idiomaActual: 'es' | 'en' = 'es';

  pdfFilePath: string = 'assets/pdf/cv-jaime-romero-hernandez.pdf';

  // Variable segura para el object
  pdfFileSafe!: SafeResourceUrl;

  textos: Record<'es' | 'en', { descargar: string }> = {
    es: { descargar: 'Descargar CV' },
    en: { descargar: 'Download CV' }
  };

  constructor(
    private idiomaService: IdiomaService,
    private sanitizer: DomSanitizer
  ) {
    this.actualizarPDF(this.pdfFilePath);

    // Suscribirse a cambios de idioma
    this.idiomaService.idioma$.subscribe((idioma) => {
      this.idiomaActual = idioma as 'es' | 'en';
      const ruta = this.idiomaActual === 'es'
        ? 'assets/pdf/cv-jaime-romero-hernandez.pdf'
        : 'assets/pdf/cv-jaime-romero-hernandez-en.pdf';
      this.actualizarPDF(ruta);
    });
  }

  actualizarPDF(ruta: string) {
    this.pdfFilePath = ruta;
    // Marcar URL como segura
    this.pdfFileSafe = this.sanitizer.bypassSecurityTrustResourceUrl(ruta);
  }
}
