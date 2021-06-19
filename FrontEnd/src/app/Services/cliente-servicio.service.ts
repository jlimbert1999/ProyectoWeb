import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {
 
  constructor() { }

  recuperar(destino:any){
    return destino
  }
}
