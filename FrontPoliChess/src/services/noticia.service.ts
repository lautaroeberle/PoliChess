import jugadorModel, { Noticia } from "../../models/noticia.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import noticiaModel from "../../models/noticia.model";

@Injectable({
  providedIn: 'root'
})

export class NoticiaService {
  
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public obtenerNoticias() {
    return this.http.get(this.baseUrl);
  }

  public agregarNoticia(noticia: Noticia) {
    return this.http.post(this.baseUrl, noticiaModel.toJSON(noticia));
  }

  public modificarNoticia(noticia: Noticia) {
    return this.http.put(this.baseUrl, noticiaModel.toJSON(noticia));
  }

  public eliminarNoticia(id: number) {
    return this.http.delete(`${ this.baseUrl }/${ id }`);
  }

}