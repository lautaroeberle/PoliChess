import jugadorModel, { Jugador } from "../../models/jugador.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {
  
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public obtenerJugadores() {
    return this.http.get(this.baseUrl);
  }

  public agregarJugador(jugador: Jugador) {
    return this.http.post(this.baseUrl, jugadorModel.toJSON(jugador));
  }

  public modificarJugador(jugador: Jugador) {
    return this.http.put(this.baseUrl, jugadorModel.toJSON(jugador));
  }

  public eliminarJugador(id: number) {
    return this.http.delete(`${ this.baseUrl }/${ id }`);
  }

}