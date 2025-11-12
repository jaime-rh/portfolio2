import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BackgroundParticlesComponent } from "./background-particles/background-particles.component";
import { InicioComponent } from "./inicio/inicio.component";
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BackgroundParticlesComponent, InicioComponent, SobreMiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio2';
}
