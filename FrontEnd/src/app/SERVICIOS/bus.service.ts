import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  url='/apis/buses'
  constructor(private http:HttpClient) { }

  //get rutas
  getBuses()
  {
    return this.http.get(this.url);
  }
  //get un ruta
  getBus(id:string){ //sin ?
    return this.http.get(this.url+'/'+id);
  }

  //agregar ruta
  addBus(buses:Buses){
    return this.http.post(this.url, buses);
  }

  //eliminar ruta
  deleteBus(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar ruta
  editBus(id:string, buses:Buses){
    return this.http.put(this.url+'/'+id, buses);
  }
}
export interface Buses{
  id_bus:string;
  origenbus?: string;
  destinobus?:string;
  fecha?: string;
  hora?:string;
  nombrebus?: string;
  tipobus?:string;
  precio?: string;
}
