import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IdiomaService } from '../services/idioma.service';
import { CommonModule } from '@angular/common'; // Importar si se usa *ngIf u otros pipes

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule], // Se requiere para *ngIf si lo usas
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit { // 👈 Implementar OnInit

  idiomaActual: 'es' | 'en' = 'es';
  pdfUrl!: SafeResourceUrl;
  pdfFilePath!: string;

  textos = {
    es: { descargar: 'Descargar CV' },
    en: { descargar: 'Download CV' }
  };

  constructor(
    private sanitizer: DomSanitizer,
    private idiomaService: IdiomaService
  ) {}

  ngOnInit() {
    // 1. Ejecutar la lógica de cambio de idioma al inicio (para la inicialización)
    // 2. Ejecutarla en cada cambio de idioma
    
    // Suscribirse a cambios de idioma
    this.idiomaService.idioma$.subscribe((idioma) => {
      this.idiomaActual = idioma as 'es' | 'en';

      // Definir la ruta sin sanitizar
      const rawPath =
        this.idiomaActual === 'es'
          ? 'assets/pdf/CV-Jaime-Romero-Hernández.pdf'
          : 'assets/pdf/CV-Jaime-Romero-Hernández-EN.pdf';

      // 🚨 IMPORTANTE: Asignar la ruta simple para el enlace de descarga (<a>)
      this.pdfFilePath = rawPath;
      
      // 🔒 IMPORTANTE: Sanear la ruta para el iframe ([src])
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawPath);
    });
  }
}