import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Noticia } from "../../models/noticia.model";


@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [ CommonModule,
    RouterModule],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {

  @Input() noticia!: Noticia;
  @Output() eventoModificar: EventEmitter<Noticia> = new EventEmitter<Noticia>();
  @Output() eventoEliminar: EventEmitter<Noticia> = new EventEmitter<Noticia>();

  public modificar(noticia: Noticia): void {
    this.eventoModificar.emit();
  }

  public eliminar(noticia: Noticia): void {
    this.eventoEliminar.emit();
  }

}
