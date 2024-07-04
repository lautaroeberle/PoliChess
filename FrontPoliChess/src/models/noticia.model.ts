
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object with the appropriate song keys.';
export interface Noticia {
    id: number;
    titulo: string;
    epigrafe:string;
    entradilla:string;
    cuerpo:string;
    autor: string;

  }
    
  function new_(
  
    titulo?: string,
    epigrafe?:string,
    entradilla?:string,
    cuerpo?:string,
    autor?:string,
    id?: number, 
  ): Noticia {
    return {
      id: (id ?? -1),
      titulo: (titulo ?? ''),
      epigrafe: (epigrafe ?? ""),
      entradilla: (entradilla ?? ""),
      cuerpo: (cuerpo ?? ""),
      autor: (autor ?? "")
    }
  }
  
  function from(param: object): Noticia {
    if (!isNoticia(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as Noticia;
    return new_(p.id,p.titulo,p.epigrafe,p.entradilla,p.cuerpo,p.autor);
  }
  
  function isNoticia(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'id' in arg && typeof arg.id === 'number' && 
      'titulo' in arg && typeof arg.titulo === 'string' && 
      'epigrafe' in arg && typeof arg.epigrafe === 'string' &&
      'entradilla' in arg && typeof arg.entradilla === 'string' &&
      'cuerpo' in arg && typeof arg.cuerpo === 'string' &&
      'autor' in arg && typeof arg.autor === 'string' 
    );
  }
  
  function toJSON(noticia: Noticia) {
    return {
      "noticia": {
        "id": noticia.id,
        "titulo": noticia.titulo,
        "epigrafe": noticia.epigrafe,
        "entradilla": noticia.entradilla,
        "cuerpo":noticia.cuerpo,
        "autor": noticia.autor
      }
    }
  }
  
  export default {
    new: new_,
    from,
    isNoticia,
    toJSON
  } as const;