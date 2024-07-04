import { Routes } from '@angular/router';
import { NoticiasComponent } from './seccionNoticias/noticias.component';
import { JugadoresComponent } from './seccionJugadores/jugadores.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [  
  {
    path: '',
    component: InicioComponent,
    title: 'Polichess'
},
{
    path: 'Noticias',
    component: NoticiasComponent,
    title: 'Noticias'
},
{
    path: 'Jugadores',
    component: JugadoresComponent,
    title: 'Jugadores'
},
{
    path: 'Calendario',
    component: CalendarioComponent,
    title: 'Calendario'
}
  
];
