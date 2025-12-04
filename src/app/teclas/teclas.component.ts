import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teclas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teclas.component.html',
  styleUrls: ['./teclas.component.css']
})
export class TeclasComponent implements OnInit, OnDestroy {

  // Soporte de idioma
  idiomaActual: string = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Teclas', copiado:'¡Copiado!' };
  private textosEn = { tituloComponente: 'Keys', copiado:'Copied!' };

  // Teclado y estado de teclas
  keys = [
    [null, 'W', null],
    ['A', 'S', 'D']
  ];
  pressed: { [key: string]: boolean } = {};

  // Código
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  tecladoCode = 
`import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teclas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teclas.component.html',
  styleUrls: ['./teclas.component.css']
})
export class TeclasComponent implements OnInit, OnDestroy {

  // Soporte de idioma
  idiomaActual: string = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Teclas' };
  private textosEn = { tituloComponente: 'Keys' };

  // Teclado y estado de teclas
  keys = [
    [null, 'W', null],
    ['A', 'S', 'D']
  ];
  pressed: { [key: string]: boolean } = {};

  // Código
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  tecladoCode = //código mostrado
  
  // Sonido de tecla
  keySound = new Audio('assets/sounds/tecla.mp3');

  constructor(private idiomaService: IdiomaService) {
    // Event listeners de teclado
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

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

  onKeyDown(event: KeyboardEvent) {
    if (this.showCode) return; // no sonar si se muestra el código
    const key = event.key.toUpperCase();
    if (['A', 'W', 'S', 'D'].includes(key)) {
      this.pressed[key] = true;
      this.playKeySound();
    }
  }

  onKeyUp(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (['A', 'W', 'S', 'D'].includes(key)) {
      this.pressed[key] = false;
    }
  }

  togglePress(key: string, isDown: boolean) {
    this.pressed[key] = isDown;

    if (!this.showCode && isDown) {
      this.playKeySound();
    }
  }

  // Mejor activación de sonido en móviles
  playKeySound() {
    // Si el audio no ha sido activado por la interacción del usuario,
    // se necesita "unlock" para evitar retrasos
    this.keySound.pause();
    this.keySound.currentTime = 0;
    this.keySound.play().catch(() => {
      // fallback: crear un nuevo Audio por si el anterior está bloqueado
      const sound = new Audio('assets/sounds/tecla.mp3');
      sound.play();
    });
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

  // Sonido de tecla
  keySound = new Audio('assets/sounds/tecla.mp3');

  constructor(private idiomaService: IdiomaService) {
    // Event listeners de teclado
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

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

  onKeyDown(event: KeyboardEvent) {
    if (this.showCode) return; // no sonar si se muestra el código
    const key = event.key.toUpperCase();
    if (['A', 'W', 'S', 'D'].includes(key)) {
      this.pressed[key] = true;
      this.playKeySound();
    }
  }

  onKeyUp(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (['A', 'W', 'S', 'D'].includes(key)) {
      this.pressed[key] = false;
    }
  }

  togglePress(key: string, isDown: boolean) {
    this.pressed[key] = isDown;

    if (!this.showCode && isDown) {
      this.playKeySound();
    }
  }

  // Mejor activación de sonido en móviles
  playKeySound() {
    // Si el audio no ha sido activado por la interacción del usuario,
    // se necesita "unlock" para evitar retrasos
    this.keySound.pause();
    this.keySound.currentTime = 0;
    this.keySound.play().catch(() => {
      // fallback: crear un nuevo Audio por si el anterior está bloqueado
      const sound = new Audio('assets/sounds/tecla.mp3');
      sound.play();
    });
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
