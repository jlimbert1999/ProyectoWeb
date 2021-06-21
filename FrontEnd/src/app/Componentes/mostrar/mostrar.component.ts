import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; //importamos para las rutas
import { Admin, ServAdminService } from './../../Services/serv-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  
  opcion:number

  ListarAdmin:Admin[]=[];
  constructor(private ServAdminService:ServAdminService, private router:Router) {
    this.opcion=-1;
   }

  ngOnInit(): void {
    this.listarAdmins()
    this.opcion=this.ServAdminService.valor
  }
  listarAdmins(){
    this.ServAdminService.getAdmins().subscribe(
      res=>{
        console.log(res)
        this.ListarAdmin=<any>res;
      },
      err=>console.log(err)
    );
  }
  eliminar(id:string){
    Swal.fire({
      title: 'Esta seguro que desea eliminar al Administrador?',
      showDenyButton: true,
      icon: 'warning',
      //showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ServAdminService.deleteAdmin(id).subscribe(
          res=>{
            console.log("Admin eliminado")
            this.listarAdmins()
          },
          err=>{
            console.log(err)
          }
        )
        Swal.fire('Administrador eliminado', '', 'success')
      }
    })
    
  }
  modificar(id:string){
    this.router.navigate(['/edit/'+id])
  }
  seleccion1(){
    this.opcion=1
    // let ops=(<HTMLInputElement>document.getElementById()); 
    // let select=ops.id
    // if(select=="op1"){
    //   this.opcion=1;
    // }
  }
  seleccion2(){
    this.opcion=2
    // let ops=(<HTMLInputElement>document.getElementById(id)); 
    // let select=ops.id
    // if(select=="op1"){
    //   this.opcion=1;
    // }
  }
  seleccion3(){
    this.opcion=3

  }
  seleccion4(){
    this.opcion=4
  }

  

  outLogin(){
    localStorage.clear()
    this.router.navigate(["login"])

  }

}
