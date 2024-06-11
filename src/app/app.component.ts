import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RouterLink } from '@angular/router';

import { NoticiasComponent } from './noticias/noticias.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { CalendarioComponent } from './calendario/calendario.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InicioComponent,RouterLink,NoticiasComponent,JugadoresComponent,CalendarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'libreria';
 
  
  ngOnInit() {
    this.initializeNavbarToggle();
    this.initializeProfilePopup();
    this.initializeFormToggle();
  }

  initializeNavbarToggle() {
    const navbarToggle = document.getElementById('navbar-toggle') as HTMLElement;
    const navbarMenu = document.getElementById('navbar-menu') as HTMLElement;

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('navbar-menu-visible');
      });
    }
  }

  initializeProfilePopup() {
    const profileIcon = document.getElementById('navbar-profile') as HTMLElement;
    const popup = document.getElementById('popup') as HTMLElement;
    const popupClose = document.getElementById('popup-close') as HTMLElement;

    if (profileIcon && popup) {
      profileIcon.addEventListener('click', () => {
        popup.style.display = 'block';
      });

      if (popupClose) {
        popupClose.addEventListener('click', () => {
          popup.style.display = 'none';
        });
      }

      window.addEventListener('click', (event) => {
        if (event.target === popup) {
          popup.style.display = 'none';
        }
      });
    }
  }

  initializeFormToggle() {
    const toLoginButton = document.getElementById('to-login') as HTMLElement;
    const toRegisterButton = document.getElementById('to-register') as HTMLElement;
    const registerForm = document.getElementById('register-form') as HTMLFormElement;
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const popupTitle = document.getElementById('popup-title') as HTMLElement;

    if (toLoginButton && toRegisterButton && registerForm && loginForm && popupTitle) {
      toLoginButton.addEventListener('click', () => {
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        popupTitle.textContent = 'Iniciar sesión';
      });

      toRegisterButton.addEventListener('click', () => {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        popupTitle.textContent = 'Registrarse';
      });
    }
  }
}
