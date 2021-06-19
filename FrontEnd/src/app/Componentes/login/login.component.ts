import { Router } from '@angular/router';
import { LoginserviceService } from './../../Services/loginservice.service';
import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  admin={
    nombreus:'',
    password:''
  }
  constructor(private LoginserviceService:LoginserviceService, private Router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.LoginserviceService.login(this.admin).subscribe((res:any)=>{
      localStorage.setItem('token', res.token)
      if(res.token===undefined)
      {
        Swal.fire({
          icon: 'error',
          title: 'Nombre de Usuario y/o Contraseña incorrectos',
          showConfirmButton: false,
          timer: 2000
        }) 
        var i=[]
        if(!localStorage.getItem('ver')){
          i.push('1')
          localStorage.setItem('ver', i.toString())
        }
        else{
          var cont=localStorage.getItem('ver')!
          // console.log('ess'+cont.length)
          if(cont.length>3){
            Swal.fire({
              icon: 'error',
              title: 'Bloqueado por 3 min',
              text: 'Intento iniciar sesion demasiadas veces.',
              showConfirmButton: false,
              timer: 3000
            })      
            setTimeout(function(){localStorage.removeItem('ver')},9000)     
          }
          else{
            i.push('1')
            var aux=localStorage.getItem('ver')!
            i.push(aux)
            localStorage.setItem('ver', i.toString())
          }      
        }        
      }
      if(this.LoginserviceService.isAuth()==true)
      {
        Swal.fire({
          icon: 'success',
          title: 'Login Correcto!',
          showConfirmButton: false,
          timer: 2000
        })  
        this.Router.navigate(['inicio'])  
        
      }    
      
    })
    

  }
  

  

}
