
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NoticiaComponent } from '../noticia/noticia.component';
import noticiaModel, { Noticia } from '../../models/noticia.model';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [ CommonModule,NoticiaComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
 
  protected noticias: Noticia[] = [];
  protected resultados: Noticia[] = [];
  public noticiaService = inject(NoticiaService);
  public filtroIngresado: boolean = false;
  public blur: boolean = false;
  public agregando: boolean = false;
  public modificando: boolean = false;
  public eliminando: boolean = false;
  public noticiaActual: Noticia = {
    id: -1,
    titulo: "",
    autor: "",
    epigrafe: "",
    entradilla: "",
    cuerpo: ""
  };
  

  constructor() {
    this.actualizarDatos();
  }

  public actualizarDatos(): void {
    this.noticiaService.obtenerNoticias().subscribe((jsonNoticias: any) => {
      this.noticias = this.jsonToArregloNoticia(jsonNoticias);
      this.resultados = this.noticias;
    });
  }

  public jsonToArregloNoticia(jsonNoticias: any): Noticia[] {
    let noticias: Noticia[] = [];
    for(let i = 0; i < jsonNoticias.noticias.length; i++) {
      let noticia: Noticia = noticiaModel.new();
      noticia.id = jsonNoticias.noticias[i].id;
      noticia.titulo = jsonNoticias.noticias[i].titulo;
      noticia.autor = jsonNoticias.noticias[i].autor;
      noticia.epigrafe = jsonNoticias.noticias[i].epigrafe;
      noticia.entradilla = jsonNoticias.noticias[i].entradilla;
      noticia.cuerpo = jsonNoticias.noticias[i].cuerpo;
      noticias.push(noticia);
    }
    return noticias;
  }

  public onSubmit(e: { preventDefault: () => void; }, input: string): void {
    if(e) {
      e.preventDefault();
    }
    this.filtrarResultados(input);
  }

  public filtrarResultados(input: string): void {
    if(!input) {
      this.resultados = this.noticias;
      return;
    } else {
      this.filtroIngresado = true;
      this.resultados = this.noticias.filter(noticiaActual =>
        noticiaActual?.titulo.toLowerCase().includes(input.toLowerCase())
      );
    }
  }

  public eliminarFiltro(): void {
    (<HTMLInputElement>document.getElementById("filter")).value = '';
    this.resultados = this.noticias;
    this.filtroIngresado = false;
  }

  public agregar() {
    this.blur = true;
    this.agregando = true;
  }

  public modificar(noticia: Noticia): void {
    this.blur = true;
    this.modificando = true;
    this.noticiaActual = noticia;
  }

  public eliminar(noticia: Noticia): void {
    this.blur = true;
    this.eliminando = true;
    this.noticiaActual = noticia;
  }

  public resultadoAccion(resultado: string) {
    
    this.blur = false;
    this.agregando = false;
    this.modificando = false;
    this.eliminando = false;

    if(resultado === 'agregar') {

      this.noticiaService.agregarNoticia(noticiaModel.new(
        (<HTMLInputElement>document.getElementById("addedName")).value,
        (<HTMLInputElement>document.getElementById("addedArtist")).value,
        (<HTMLInputElement>document.getElementById("addedAlbum")).value,
        ((<HTMLInputElement>document.getElementById("addedMinutes")).value),
        ((<HTMLInputElement>document.getElementById("addedSeconds")).value)
      )).subscribe(() => {
        this.actualizarDatos();
      });

    } else if(resultado === 'modificar') {

      let nuevaNoticia = noticiaModel.new(
        (<HTMLInputElement>document.getElementById("newName")).value,
        (<HTMLInputElement>document.getElementById("newArtist")).value,
        (<HTMLInputElement>document.getElementById("newAlbum")).value,
        ((<HTMLInputElement>document.getElementById("newMinutes")).value),
        ((<HTMLInputElement>document.getElementById("newSeconds")).value),
        this.noticiaActual.id
      );

      if(nuevaNoticia.titulo === "") nuevaNoticia.titulo = this.noticiaActual.titulo;
      if(nuevaNoticia.autor === "") nuevaNoticia.autor = this.noticiaActual.autor;
      if(nuevaNoticia.epigrafe === "") nuevaNoticia.epigrafe = this.noticiaActual.epigrafe;
      if(nuevaNoticia.entradilla === "") nuevaNoticia.entradilla = this.noticiaActual.entradilla;
      if(nuevaNoticia.cuerpo === "") nuevaNoticia.cuerpo = this.noticiaActual.cuerpo;

      this.noticiaService.modificarNoticia(nuevaNoticia).subscribe(() => {
        this.actualizarDatos();
      });

    } else if(resultado === 'eliminar') {
      this.noticiaService.eliminarNoticia(this.noticiaActual.id).subscribe(() => {
        this.actualizarDatos();
      });
    }

  }
}

