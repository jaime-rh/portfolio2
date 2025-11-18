import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdiomaService } from '../services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit, OnDestroy {

  idiomaActual: string = 'es';
  subscription!: Subscription;

  tabSeleccionado: string = 'experiencia'; // Tab por defecto
  seccion: string = 'frontend';  // Sección de tecnologías por defecto

  textos: any = {}; // Se llenará según el idioma

  private textosEs = {
    titulo: 'Sobre mí',
    descripcion: `Cuento con experiencia en desarrollo web, aplicaciones multiplataforma, 
                  gestión de proyectos tecnológicos y diseño gráfico. Apasionado por la 
                  resolución de problemas y la creación de soluciones eficientes.`,
    experiencia: 'Experiencia',
    educacion: 'Educación',
    tecnologias: 'Tecnologías',
    proyectos: 'Proyectos',
    frontend: 'Frontend',
    backend: 'Backend',
    bd: 'Bases de Datos',
    frameworks: 'Frameworks',
    herramientas: 'Herramientas y Otros',
    descripcionProyectoFilmogram: "Aplicación web full-stack tipo red social de películas desarrollada con React, Node.js y MySQL.",
    descripcionProyectoBooknest: "Aplicación web full-stack red social de libros desarrollada con React, Node.js y MySQL.",
    experienciaDetalle: [
      // Ejemplo
      { empresa: 'Empresa A', titulo: 'Desarrollador Full Stack', periodo: 'Marzo 2025 - Junio 2025', descripcion: 'Fueron mis primeras prácticas como Desarrollador Web Full-Stack, donde aprendí muchísimo. Trabajé con PHP, APIs, librerías... En el propio sistema de la empresa y también trabajé con Wordpress.' },
      { empresa2: 'Empresa B', titulo2: 'Especialista Técnico', periodo2: 'Marzo 2023 - Junio 2023', descripcion2: 'Fuí encargado de diagnosticar, reparar y mantener electrodomésticos del hogar, garantizando un servicio eficiente, seguro y centrado en la satisfacción del cliente.' }
    ],
    educacionDetalle: [
      { 
        titulo: 'Grado Superior Desarrollo de Aplicaciones Web (DAW)', 
        institucion: 'IES San Juan de la Cruz', 
        periodo: 'Septiembre 2023 - Junio 2025', 
        descripcion: 'Formación especializada en creación y mantenimiento de aplicaciones y sitios web, con conocimientos en programación front-end y back-end, bases de datos, integración de APIs y buenas prácticas de desarrollo. Durante el grado desarrollé proyectos completos que combinan creatividad, funcionalidad y eficiencia tecnológica.' 
      },
      { 
        titulo: 'Grado Medio Telecomunicaciones', 
        institucion: 'IES Julio Verne', 
        periodo: 'Septiembre 2021 - Junio 2023', 
        descripcion: 'Formación centrada en instalación, mantenimiento y gestión de sistemas de telecomunicaciones y equipos audiovisuales. Durante el grado adquirí conocimientos en redes, transmisión de datos, configuración de dispositivos y producción audiovisual, desarrollando habilidades técnicas y creativas para proyectos multimedia y de comunicación.' 
      }
    ],
  };

  private textosEn = {
    titulo: 'About Me',
    descripcion: `I have experience in web development, cross-platform applications,
                  technology project management, and graphic design. Passionate about
                  problem-solving and creating efficient solutions.`,
    experiencia: 'Experience',
    educacion: 'Education',
    tecnologias: 'Technologies',
    proyectos: 'Projects',
    frontend: 'Frontend',
    backend: 'Backend',
    bd: 'Databases',
    frameworks: 'Frameworks',
    herramientas: 'Tools and Others',
    descripcionProyectoFilmogram: "Full-stack web application of the social network type for movies developed with React, Node.js and MySQL.",
    descripcionProyectoBooknest: "Full-stack web application for a social network of books developed with React, Node.js and MySQL.",
    experienciaDetalle: [
      { empresa1: 'Company A', titulo: 'Full Stack Developer', periodo: 'March 2025 - June 2025', descripcion: "It was my first internship as a Full-Stack Web Developer, where I learned a tremendous amount. I worked with PHP, APIs, libraries... on the company's own system and also with WordPress." },
      { empresa2: 'Company B', titulo2: 'Technical Specialist', periodo2: 'March 2023 - June 2023', descripcion2: 'I was responsible for diagnosing, repairing, and maintaining household appliances, ensuring efficient, safe, and customer-focused service.' }
    ],
    educacionDetalle: [
      { 
        titulo: 'Advanced Degree in Web Application Development (DAW)', 
        institucion: 'IES San Juan de la Cruz', 
        periodo: 'September 2023 - June 2025', 
        descripcion: 'Specialized training in the creation and maintenance of applications and websites, with knowledge of front-end and back-end programming, databases, API integration, and best development practices. During my degree, I developed complete projects that combined creativity, functionality, and technological efficiency.' 
      },
      { 
        titulo: 'Intermediate Degree Telecommunications', 
        institucion: 'IES Julio Verne', 
        periodo: 'September 2021 - June 2023', 
        descripcion: 'Training focused on the installation, maintenance, and management of telecommunications systems and audiovisual equipment. During my degree, I acquired knowledge in networks, data transmission, device configuration, and audiovisual production, developing technical and creative skills for multimedia and communication projects.' 
      }
    ],
  };

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit() {
    // Inicializamos el idioma actual
    this.actualizarTextos(this.idiomaActual);

    // Suscribirse a cambios de idioma
    this.subscription = this.idiomaService.idioma$.subscribe(idioma => {
      this.idiomaActual = idioma;
      this.actualizarTextos(idioma);
    });
  }

  actualizarTextos(idioma: string) {
    this.textos = idioma === 'es' ? this.textosEs : this.textosEn;
  }

  cambiarTab(tab: string) {
    this.tabSeleccionado = tab;
  }

  seleccionar(seccion: string) {
    this.seccion = seccion;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
