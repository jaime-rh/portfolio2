import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-background-particles',
  template: `<div id="particles-js" class="particles-background"></div>`,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      height: calc(100vh - 100px); /* resto de la pantalla */
      top: 100px; /* altura del navbar */
      z-index: -1;
    }
    #particles-js {
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  `],
  standalone: true
})
export class BackgroundParticlesComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const particlesJS = (window as any).particlesJS;
    if (!particlesJS) {
      console.error('particlesJS no está definido. Revisa angular.json scripts.');
      return;
    }

    console.log('Inicializando partículas…');

    particlesJS('particles-js', {
      particles: {
        number: { value: 156, density: { enable: false, value_area: 789.1476416322727 } },
        color: { value: '#ffffff' },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 6 },
          image: { src: 'img/github.svg', width: 100, height: 100 }
        },
        opacity: {
          value: 0.78125616521595,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 2.5,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: { enable: true, distance: 150, color: '#a71010', opacity: 0.4, width: 1 },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 110, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }
}
