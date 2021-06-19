import { LoginserviceService } from './../Services/loginservice.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'; //importamos para las rutas

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginserviceService:LoginserviceService, private router:Router){}

  canActivate():boolean{
    if(!this.LoginserviceService.isAuth()){
      this.router.navigate(['login'])
      return false;
    }
    
    return true;
  }
  
}
