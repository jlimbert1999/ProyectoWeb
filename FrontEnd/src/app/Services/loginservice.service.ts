import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  url='/api';

  constructor(private http: HttpClient, private JwtHelperService:JwtHelperService) { }

  private URL='http://localhost:4200/api';
  //autentificar 
  login(admin:any){
    return this.http.post(`${this.URL}/singin`, admin);
  }

  isAuth():boolean{
    const token:any=localStorage.getItem('token');
    if(this.JwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    console.log(localStorage.getItem('token'))
    return true
    
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
