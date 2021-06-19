import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService, Buses } from '../SERVICIOS/bus.service';
import Swal from 'sweetalert2';
import { CalenService } from '../SERVICIOS/calen.service';

@Component({
  selector: 'app-mostrar-horario',
  templateUrl: './mostrar-horario.component.html',
  styleUrls: ['./mostrar-horario.component.css']
})
export class MostrarHorarioComponent implements OnInit {
  BusListas: Buses[]=[];
  constructor(private BusService:BusService, private router:Router, private _Calen:CalenService) { }
  filterPost ='';
  ngOnInit(): void {
    this.listarBus();
    
  }
  listarBus()
  {
    this.BusService.getBuses().subscribe(
      res=>{
        console.log(res)
        this.BusListas=<any>res;
      },
      err=>console.log(err)
    );
  }
  eliminar(id:string)
  {
    Swal.fire({
      title: 'Esta seguro que desea eliminar el Bus?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,

      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.BusService.deleteBus(id).subscribe(
          res=>{
            console.log("bus eliminado");
            this.listarBus();
          },
          err=>console.log(err)
        );
        Swal.fire('Se elimino el Bus', '', 'success')
      }
    })
    
  }
  modificar(id:string){
    
    this.router.navigate(['/Mostrar_Horario/Modificar_Horario/'+id])
  }
  cambio(){
    this.router.navigate(['Registrar_Horario'])
    this._Calen.Carga(["calen"]);
  }
  

}