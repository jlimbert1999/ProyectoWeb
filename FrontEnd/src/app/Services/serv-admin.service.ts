import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ServAdminService {
  url='/api';

  constructor( private http: HttpClient) { }

  getAdmins(){
    return this.http.get(this.url);
  }

  //get un admin
  getAdmin(id:string){ //sin ?
    return this.http.get(this.url+'/'+id);
  }

  //get agregar equipo
  addAdmin(admin:Admin){
    return this.http.post(this.url, admin);
  }

  //eliminar admin
  deleteAdmin(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar admin
  editAdmin(id:string, admin:Admin){
    return this.http.put(this.url+'/'+id, admin);
  }

  enviarCorreo(datos:any){
    return this.http.post(this.url+'/send-email', datos);
  }

  
}

export interface Admin{
  id:string;
  nombre?:string;
  apellido?:string;
  nombreus:string;
  correo?:string;
  password:string;
}
