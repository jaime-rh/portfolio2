import { Component, ElementRef, HostListener, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdiomaService } from '../services/idioma.service';
import Prism from 'prismjs';
import { CommonModule } from '@angular/common';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-animado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animado.component.html',
  styleUrls: ['./animado.component.css']
})
export class AnimadoComponent implements OnInit, AfterViewInit, OnDestroy {

  // ----------------- Idioma -----------------
  idiomaActual: string = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Modelo 3D', copiado: '¡Copiado!' };
  private textosEn = { tituloComponente: 'Model 3D', copiado: 'Copied!' };

  // ----------------- Canvas -----------------
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  // THREE.js
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationFrameId: any;

  // ----------------- Mostrar código -----------------
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  tecladoCode = `import { Component, ElementRef, HostListener, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdiomaService } from '../services/idioma.service';
import Prism from 'prismjs';
import { CommonModule } from '@angular/common';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-animado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animado.component.html',
  styleUrls: ['./animado.component.css']
})
export class AnimadoComponent implements OnInit, AfterViewInit, OnDestroy {

  // ----------------- Idioma -----------------
  idiomaActual: string = 'es';
  textos: any = {};
  subscription!: Subscription;

  private textosEs = { tituloComponente: 'Modelo 3D', copiado: '¡Copiado!' };
  private textosEn = { tituloComponente: 'Model 3D', copiado: 'Copied!' };

  // ----------------- Canvas -----------------
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  // THREE.js
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationFrameId: any;

  // ----------------- Mostrar código -----------------
  showCode = false;
  highlightedCode: string = '';
  copied = false;
  tecladoCode = //código mostrado;
  constructor(private idiomaService: IdiomaService) {}

  ngAfterViewInit() {
    this.init3D();
  }

  ngOnInit() {
    this.actualizarTextos(this.idiomaActual);
    this.subscription = this.idiomaService.idioma$.subscribe((idioma: string) => {
      this.idiomaActual = idioma;
      this.actualizarTextos(idioma);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    cancelAnimationFrame(this.animationFrameId);
    if (this.controls) this.controls.dispose();
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }

  // ----------------- THREE.JS -----------------
  init3D() {
    const width = this.canvasContainer.nativeElement.offsetWidth;
    const height = this.canvasContainer.nativeElement.offsetHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0E0C12');

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 10, 7);
    this.scene.add(dir);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // movimiento más suave
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.target.set(0, 0, 0); // mirar hacia el centro

    // Loader GLB
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);

        // ----------------- Girar horizontal y centrar base -----------------
        model.rotation.y = -Math.PI * 2; //horizontal

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();

        model.position.y -= 0.1 * size; //bajar un poco el objeto

        this.scene.add(model);

        // ----------------- Posicionar cámara -----------------
        this.camera.position.set(1, size * 0.22, size * 0.67);
        this.controls.update();

        // ----------------- Animación -----------------
        const animate = () => {
          this.animationFrameId = requestAnimationFrame(animate);
          this.controls.update(); // necesario para damping
          this.renderer.render(this.scene, this.camera);
        };
        animate();
      },
      undefined,
      (err) => console.error("Error cargando GLB:", err)
    );
  }

  // ----------------- Responsive -----------------
  @HostListener('window:resize')
  onWindowResize() {
    if (!this.renderer || !this.camera) return;
    const width = this.canvasContainer.nativeElement.offsetWidth;
    const height = this.canvasContainer.nativeElement.offsetHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ----------------- Código -----------------
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
    });
  }
}
`;

  constructor(private idiomaService: IdiomaService) {}

  ngAfterViewInit() {
    this.init3D();
  }

  ngOnInit() {
    this.actualizarTextos(this.idiomaActual);
    this.subscription = this.idiomaService.idioma$.subscribe((idioma: string) => {
      this.idiomaActual = idioma;
      this.actualizarTextos(idioma);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    cancelAnimationFrame(this.animationFrameId);
    if (this.controls) this.controls.dispose();
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }

  // ----------------- THREE.JS -----------------
  init3D() {
    const width = this.canvasContainer.nativeElement.offsetWidth;
    const height = this.canvasContainer.nativeElement.offsetHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0E0C12');

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 10, 7);
    this.scene.add(dir);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // movimiento más suave
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.target.set(0, 0, 0); // mirar hacia el centro

    // Loader GLB
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);

        // ----------------- Girar horizontal y centrar base -----------------
        model.rotation.y = -Math.PI * 2; //horizontal

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();

        model.position.y -= 0.1 * size; //bajar un poco el objeto

        this.scene.add(model);

        // ----------------- Posicionar cámara -----------------
        this.camera.position.set(1, size * 0.22, size * 0.8);
        this.controls.update();

        // ----------------- Animación -----------------
        const animate = () => {
          this.animationFrameId = requestAnimationFrame(animate);
          this.controls.update(); // necesario para damping
          this.renderer.render(this.scene, this.camera);
        };
        animate();
      },
      undefined,
      (err) => console.error("Error cargando GLB:", err)
    );
  }

  // ----------------- Responsive -----------------
  @HostListener('window:resize')
  onWindowResize() {
    if (!this.renderer || !this.camera) return;
    const width = this.canvasContainer.nativeElement.offsetWidth;
    const height = this.canvasContainer.nativeElement.offsetHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ----------------- Código -----------------
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
    });
  }
}
