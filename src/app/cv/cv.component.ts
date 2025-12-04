import { Component, OnInit } from '@angular/core';
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
export class CVComponent implements OnInit {
  idiomaActual: 'es' | 'en' = 'es';

  pdfFilePath: string = 'assets/pdf/cv-jaime-romero-hernandez.pdf';
  pdfFileSafe!: SafeResourceUrl;

  pdfImages: string[] = [];
  isMobile: boolean = false;

  textos: Record<'es' | 'en', { descargar: string }> = {
    es: { descargar: 'Descargar CV' },
    en: { descargar: 'Download CV' }
  };

  constructor(
    private idiomaService: IdiomaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Solo ejecutamos window si existe (navegador)
    if (typeof window !== 'undefined') {
      this.detectDevice();
    }

    this.actualizarPDF(this.pdfFilePath);
    this.actualizarImagenes();

    this.idiomaService.idioma$.subscribe((idioma) => {
      this.idiomaActual = idioma as 'es' | 'en';

      const ruta = this.idiomaActual === 'es'
        ? 'assets/pdf/cv-jaime-romero-hernandez.pdf'
        : 'assets/pdf/cv-jaime-romero-hernandez-en.pdf';
      this.actualizarPDF(ruta);

      this.actualizarImagenes();
    });
  }

  actualizarPDF(ruta: string) {
    this.pdfFilePath = ruta;
    this.pdfFileSafe = this.sanitizer.bypassSecurityTrustResourceUrl(ruta);
  }

  actualizarImagenes() {
    if (this.isMobile) {
      this.pdfImages = this.idiomaActual === 'es'
        ? [
            'assets/img/cv-esp-1.png',
            'assets/img/cv-esp-2.png'
          ]
        : [
            'assets/img/cv-en-1.png',
            'assets/img/cv-en-2.png'
          ];
    } else {
      this.pdfImages = [];
    }
  }

  detectDevice() {
    this.isMobile = window.innerWidth <= 1024;
  }
}
