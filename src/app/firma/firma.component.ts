import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-firma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.css'
})
export class FirmaComponent implements OnInit, OnDestroy {

    // Soporte de idioma
      idiomaActual: string = 'es';
      textos: any = {};
      subscription!: Subscription;
      showToast = false;
      firmaImagen: string | null = null;
    
      private textosEs = { tituloComponente: 'Firma', copiado:'¡Copiado!', borrar:'Borrar', confirmar:'Confirmar', firma:'Firma', confirmada: 'confirmada' };
      private textosEn = { tituloComponente: 'Signature', copiado:'Copied!', borrar:'Clear', confirmar:'Confirm', firma:'Confirmed', confirmada: 'signature' };
    
      @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
      private ctx!: CanvasRenderingContext2D;
      private drawing = false;

      ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        this.resizeCanvas();
        this.prepareCanvas();
      }

      // 🔧 Mantener resolución al tamaño del div
      @HostListener('window:resize')
      resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        const parent = canvas.parentElement!;

        canvas.width = parent.clientWidth;
        canvas.height = 250; // altura fija (puedes cambiarla)

        this.prepareCanvas();
      }

      // Ajustes de lápiz
      prepareCanvas() {
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = '#F85F5F';
      }

      getPosition(event: any) {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();

        if (event.touches) {
          event = event.touches[0];
        }

        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }

      startDrawing(event: MouseEvent | TouchEvent) {
        this.drawing = true;
        const pos = this.getPosition(event);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
      }

      draw(event: MouseEvent | TouchEvent) {
        if (!this.drawing) return;
        event.preventDefault();
        const pos = this.getPosition(event);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      }

      stopDrawing() {
        this.drawing = false;
        this.ctx.closePath();
      }

      clear() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      confirm() {
      const canvas = this.canvasRef.nativeElement;

      // Guardar la firma como imagen (base64)
      this.firmaImagen = canvas.toDataURL("image/png");

      // Mostrar toast
      this.showToast = true;

      // Ocultar después de 3 segundos
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }

    // ---- Código igual en todos los componentes ----
    showCode = false;
    highlightedCode: string = '';
    copied = false;
    tecladoCode = `import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-firma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.css'
})
export class FirmaComponent implements OnInit, OnDestroy {

    // Soporte de idioma
      idiomaActual: string = 'es';
      textos: any = {};
      subscription!: Subscription;
      showToast = false;
      firmaImagen: string | null = null;
    
      private textosEs = { tituloComponente: 'Firma', copiado:'¡Copiado!', borrar:'Borrar', confirmar:'Confirmar', firma:'Firma', confirmada: 'confirmada' };
      private textosEn = { tituloComponente: 'Signature', copiado:'Copied!', borrar:'Clear', confirmar:'Confirm', firma:'Confirmed', confirmada: 'signature' };
    
      @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
      private ctx!: CanvasRenderingContext2D;
      private drawing = false;

      ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        this.resizeCanvas();
        this.prepareCanvas();
      }

      // Mantener resolución al tamaño del div
      @HostListener('window:resize')
      resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        const parent = canvas.parentElement!;

        canvas.width = parent.clientWidth;
        canvas.height = 250; // altura fija (puedes cambiarla)

        this.prepareCanvas();
      }

      // Ajustes de lápiz
      prepareCanvas() {
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = '#F85F5F';
      }

      getPosition(event: any) {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();

        if (event.touches) {
          event = event.touches[0];
        }

        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }

      startDrawing(event: MouseEvent | TouchEvent) {
        this.drawing = true;
        const pos = this.getPosition(event);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
      }

      draw(event: MouseEvent | TouchEvent) {
        if (!this.drawing) return;
        event.preventDefault();
        const pos = this.getPosition(event);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      }

      stopDrawing() {
        this.drawing = false;
        this.ctx.closePath();
      }

      clear() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      confirm() {
      const canvas = this.canvasRef.nativeElement;

      // Guardar la firma como imagen (base64)
      this.firmaImagen = canvas.toDataURL("image/png");

      // Mostrar toast
      this.showToast = true;

      // Ocultar después de 3 segundos
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }

    // ---- Código igual en todos los componentes ----
    showCode = false;
    highlightedCode: string = '';
    copied = false;
    tecladoCode = //código mostrado;

    // constructor(private idiomaService: IdiomaService) {}
    
    ngOnInit() {
      // Inicializa idioma
      this.actualizarTextos(this.idiomaActual);
      this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
        this.idiomaActual = idioma;
        this.actualizarTextos(idioma);
      });
    }
    
    ngOnDestroy() {
      // Limpiar subscription
      if (this.subscription) this.subscription.unsubscribe();
    }
    
    actualizarTextos(idioma: string) {
      this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
    }
    
    onCodeClick() {
      this.showCode = !this.showCode;
      if (this.showCode) {
        this.highlightedCode = Prism.highlight(
          this.tecladoCode,
          Prism.languages['typescript'],
          'typescript'
        );
      }
    }
    
    copyCode() {
      navigator.clipboard.writeText(this.tecladoCode).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500);
      }).catch(err => console.error('Error al copiar:', err));
    }
  }`;
  
    constructor(private idiomaService: IdiomaService) {}
  
    ngOnInit() {
      // Inicializa idioma
      this.actualizarTextos(this.idiomaActual);
      this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
        this.idiomaActual = idioma;
        this.actualizarTextos(idioma);
      });
    }
  
    ngOnDestroy() {
      // Limpiar subscription
      if (this.subscription) this.subscription.unsubscribe();
    }
  
    actualizarTextos(idioma: string) {
      this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
    }
  
    onCodeClick() {
      this.showCode = !this.showCode;
      if (this.showCode) {
        this.highlightedCode = Prism.highlight(
          this.tecladoCode,
          Prism.languages['typescript'],
          'typescript'
        );
      }
    }
  
    copyCode() {
      navigator.clipboard.writeText(this.tecladoCode).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500);
      }).catch(err => console.error('Error al copiar:', err));
    }

}
