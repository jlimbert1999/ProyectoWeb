import { Component, OnInit, Input } from '@angular/core';
import { BusService, Buses} from '../SERVICIOS/bus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService, Ruta } from '../SERVICIOS/rutas.service';
import { ClienteServicioService } from '../Services/cliente-servicio.service';

@Component({
  selector: 'app-seleccionar-viaje',
  templateUrl: './seleccionar-viaje.component.html',
  styleUrls: ['./seleccionar-viaje.component.css']
})
export class SeleccionarViajeComponent implements OnInit {
  datosviaje={
    origenbus:'',
    destinobus:'',
    fecha:''
  };
  buses: Buses={
    id_bus:'',
    origenbus:'',
    destinobus:'',
    fecha:'',
    hora:'',
    nombrebus:'',
    tipobus:'',
    precio:''
  };
  BusListas: Buses[]=[];
  RutasListas: Ruta[]=[];
  RutasL: Ruta[]=[];

  constructor(private BusService:BusService, private router:Router,private activaRoute:ActivatedRoute,private RutasService:RutasService, private ClienteServicioService:ClienteServicioService) { }
  filterPost ='';
  filterPost1 ='';
  filterPost2 ='';
  ngOnInit(): void {
    this.listarBus();
    this.recuperar();
    
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
  recuperar(){
    let auxvar=localStorage.getItem('viaje')

    let aux=JSON.parse(auxvar!)

    this.datosviaje=aux
  }
  sendtoRegisterTicket(){
    this.router.navigate(['datos-viajero']);
  }
}
