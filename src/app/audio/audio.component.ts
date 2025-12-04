import { Component, OnDestroy, OnInit } from '@angular/core';
import Prism from 'prismjs';
import { IdiomaService } from '../services/idioma.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnDestroy {
  isRecording = false;

  idiomaActual: 'es' | 'en' = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Audio', copiado:'¡Copiado!' };
  private textosEn = { tituloComponente: 'Audio', copiado:'Copied!' };

  // Barras animadas
  animationsLeft: number[] = Array(20).fill(0);
  animationsRight: number[] = Array(20).fill(0);

  keySound = new Audio('assets/sounds/boton.mp3');
  private intervalSub!: Subscription;
  Math: any;

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit() {
    this.actualizarTextos(this.idiomaActual);
    this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma as 'es' | 'en';
      this.actualizarTextos(this.idiomaActual);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }

   // Genera la traslación X de cada línea
  generateAnimation(index: number, isRecording: boolean, isLeft: boolean) {
    if (!isRecording) return 0; // sin grabación, centrado

    const direction = isLeft ? 1 : -1; // izquierda o derecha
    const centerIndex = Math.floor(this.animationsLeft.length / 2);
    const spread = 3; // controla qué tan rápido decrece el efecto desde el centro
    const distance = Math.abs(index - centerIndex);

    // desplazamiento horizontal en px, usando una función exponencial
    const maxTranslation = 40; 
    const minTranslation = Math.random() * 5;
    const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + minTranslation;

    return direction * translation;
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    this.keySound.currentTime = 0;
    this.keySound.play().catch(() => {});

    const length = this.animationsLeft.length;
    const maxTranslation = 40;
    const spread = 3; 
    const updateInterval = 70;

    if (this.intervalSub) this.intervalSub.unsubscribe(); // limpiar antes

    if (this.isRecording) {
      this.intervalSub = interval(updateInterval).subscribe(() => {
        // Mitad izquierda: hacia la izquierda
        this.animationsLeft = this.animationsLeft.map((prev, i) => {
          const center = Math.floor(length / 2);
          const distance = Math.abs(i - center);
          const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + Math.random() * 30;
          return prev + (-translation - prev) * 0.5; // suavizado
        });

        // Mitad derecha: hacia la derecha
        this.animationsRight = this.animationsRight.map((prev, i) => {
          const center = Math.floor(length / 2);
          const distance = Math.abs(i - center);
          const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + Math.random() * 30;
          return prev + (translation - prev) * 0.5; // suavizado
        });
      });
    } else {
      // Animación de apagado suave
      this.intervalSub = interval(updateInterval).subscribe(() => {
        let allZero = true;

        this.animationsLeft = this.animationsLeft.map((prev) => {
          const next = prev + (0 - prev) * 0.6; // suavizado hacia 0
          if (Math.abs(next) > 0.5) allZero = false;
          return next;
        });

        this.animationsRight = this.animationsRight.map((prev) => {
          const next = prev + (0 - prev) * 0.6;
          if (Math.abs(next) > 0.5) allZero = false;
          return next;
        });

        if (allZero && this.intervalSub) {
          this.intervalSub.unsubscribe(); // detener cuando todas estén cerca de 0
        }
      });
    }
  }


  // ---- Código igual en todos los componentes ----
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  tecladoCode = `import { Component, OnDestroy, OnInit } from '@angular/core';
import Prism from 'prismjs';
import { IdiomaService } from '../services/idioma.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnDestroy {
  isRecording = false;

  idiomaActual: 'es' | 'en' = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Audio' };
  private textosEn = { tituloComponente: 'Audio' };

  // Barras animadas
  animationsLeft: number[] = Array(20).fill(0);
  animationsRight: number[] = Array(20).fill(0);

  keySound = new Audio('assets/sounds/boton.mp3');
  private intervalSub!: Subscription;
  Math: any;

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit() {
    this.actualizarTextos(this.idiomaActual);
    this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma as 'es' | 'en';
      this.actualizarTextos(this.idiomaActual);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }

   // Genera la traslación X de cada línea
  generateAnimation(index: number, isRecording: boolean, isLeft: boolean) {
    if (!isRecording) return 0; // sin grabación, centrado

    const direction = isLeft ? 1 : -1; // izquierda o derecha
    const centerIndex = Math.floor(this.animationsLeft.length / 2);
    const spread = 3; // controla qué tan rápido decrece el efecto desde el centro
    const distance = Math.abs(index - centerIndex);

    // desplazamiento horizontal en px, usando una función exponencial
    const maxTranslation = 40; 
    const minTranslation = Math.random() * 5;
    const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + minTranslation;

    return direction * translation;
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    this.keySound.currentTime = 0;
    this.keySound.play().catch(() => {});

    const length = this.animationsLeft.length;
    const maxTranslation = 40;
    const spread = 3; 
    const updateInterval = 70;

    if (this.intervalSub) this.intervalSub.unsubscribe(); // limpiar antes

    if (this.isRecording) {
      this.intervalSub = interval(updateInterval).subscribe(() => {
        // Mitad izquierda: hacia la izquierda
        this.animationsLeft = this.animationsLeft.map((prev, i) => {
          const center = Math.floor(length / 2);
          const distance = Math.abs(i - center);
          const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + Math.random() * 30;
          return prev + (-translation - prev) * 0.5; // suavizado
        });

        // Mitad derecha: hacia la derecha
        this.animationsRight = this.animationsRight.map((prev, i) => {
          const center = Math.floor(length / 2);
          const distance = Math.abs(i - center);
          const translation = maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) + Math.random() * 30;
          return prev + (translation - prev) * 0.5; // suavizado
        });
      });
    } else {
      // Animación de apagado suave
      this.intervalSub = interval(updateInterval).subscribe(() => {
        let allZero = true;

        this.animationsLeft = this.animationsLeft.map((prev) => {
          const next = prev + (0 - prev) * 0.6; // suavizado hacia 0
          if (Math.abs(next) > 0.5) allZero = false;
          return next;
        });

        this.animationsRight = this.animationsRight.map((prev) => {
          const next = prev + (0 - prev) * 0.6;
          if (Math.abs(next) > 0.5) allZero = false;
          return next;
        });

        if (allZero && this.intervalSub) {
          this.intervalSub.unsubscribe(); // detener cuando todas estén cerca de 0
        }
      });
    }
  }


  // ---- Código igual en todos los componentes ----
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  
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
