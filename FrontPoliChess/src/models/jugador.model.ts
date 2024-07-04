
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object with the appropriate song keys.';
export interface Jugador {
    id: number;
    nombre: string;
    apellido: string;
    añoDeNacimiento: number;
    elo: number;
    

  }
    
  function new_(
    id?: number,
    nombre?: string,
    apellido?:string,
    añoDeNacimiento?:number,
    elo?:number,
   
  ): Jugador {
    return {
      id: (id ?? -1),
      nombre: (nombre ?? ''),
      apellido: (apellido ?? ""),
      añoDeNacimiento: (añoDeNacimiento ?? -1),
      elo: (elo ?? -1),
      
    }
  }
  
  function from(param: object): Jugador {
    if (!isJugador(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as Jugador;
    return new_(p.id,p.nombre,p.apellido,p.añoDeNacimiento,p.elo);
  }
  
  function isJugador(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'id' in arg && typeof arg.id === 'number' && 
      'nombre' in arg && typeof arg.nombre === 'string' && 
      'apellido' in arg && typeof arg.apellido === 'string' &&
      'añoDeNacimiento' in arg && typeof arg.añoDeNacimiento === 'number' &&
      'elo' in arg && typeof arg.elo === 'number' 
    );
  }
  
  function toJSON(jugador: Jugador) {
    return {
      "noticia": {
        "id": jugador.id,
        "nombre": jugador.nombre,
        "apellido": jugador.apellido,
        "añoDeNacimiento": jugador.añoDeNacimiento,
        "elo":jugador.elo,
      }
    }
  }
  
  export default {
    new: new_,
    from,
    isJugador,
    toJSON
  } as const;