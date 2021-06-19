import { Component, OnInit } from '@angular/core';
import { ServAdminService } from '../../Services/serv-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-datos-viajero',
  templateUrl: './datos-viajero.component.html',
  styleUrls: ['./datos-viajero.component.css']
})
export class DatosViajeroComponent implements OnInit {
  datos={
    nombre:'',
    apellido:'',
    telefono:'',
    cantidad:'',
    correo:'',
    ci:'',
    fecha:''
  }
  constructor(private ServAdminService:ServAdminService) { }

  ngOnInit(): void {
  }
  enviarCorreo(){
    this.ServAdminService.enviarCorreo(this.datos).subscribe()
    Swal.fire({
      icon: 'success',
      title: 'Gracias por comprar',
      showConfirmButton: false,
      timer: 2000
    })  
    localStorage.setItem('viaje', JSON.stringify(this.datos))
  }

}
