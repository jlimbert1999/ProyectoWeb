import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RutasService {
  url='/apis/rutas'
  constructor(private http: HttpClient) { }

  //get rutas
  getRutas()
  {
    return this.http.get(this.url);
  }
  //get un ruta
  getRuta(id:string){ //sin ?
    return this.http.get(this.url+'/'+id);
  }

  //agregar ruta
  addRuta(ruta:Ruta){
    return this.http.post(this.url, ruta);
  }

  //eliminar ruta
  deleteRuta(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar ruta
  editRuta(id:string, ruta:Ruta){
    return this.http.put(this.url+'/'+id, ruta);
  }
}
export interface Ruta{
  id_ruta:string;
  origen?: string;
  destino?:string;
}

