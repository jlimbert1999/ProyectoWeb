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
  

  ListarAdmin:Admin[]=[];
  constructor(private ServAdminService:ServAdminService, private router:Router) { }

  ngOnInit(): void {
    this.listarAdmins()
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

  outLogin(){
    localStorage.clear()

  }

}
