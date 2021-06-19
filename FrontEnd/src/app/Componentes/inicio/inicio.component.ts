import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { BusService, Buses } from '../../SERVICIOS/bus.service';
import { Router } from '@angular/router';
import { RutasService,Ruta } from '../../SERVICIOS/rutas.service';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
import { ClienteServicioService } from '../../Services/cliente-servicio.service';
import { CalenService } from '../../SERVICIOS/calen.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
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

  
  
  createFormGroup(){

    return new FormGroup({

      origenbus: new FormControl('', [Validators.required]),

      destinobus:  new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      cantidad:new FormControl('', [Validators.required]),
    
    })

  }
  registroForm: FormGroup;
  RutasListas: Ruta[]=[];
  RutasL: Ruta[]=[];
  BusListas: Buses[]=[];
  filterPost ='';
  constructor(private BusService:BusService, private router:Router,private RutasService:RutasService,private _Calen:CalenService, private ClienteServicioService:ClienteServicioService) { 
    this.registroForm=this.createFormGroup()
    
  }

  ngOnInit(): void {
    this.listarRutas();
    //this.listarBus();
    this._Calen.Carga(["calen"]);
  }
  listaR(){

    this.RutasService.getRutas().subscribe(

      res=>{

        /////////////////////////////

        let valores=JSON.stringify(res)

        let cadena=JSON.parse(valores)

        let dest:any=[] 

        for(let i=0;i<cadena.length;i++){

          const elemento = cadena[i].origen;

          if (!dest.includes(cadena[i].origen)) {

            dest.push(cadena[i].origen);

          }

        }

        this.RutasL=dest

      },

      err=>console.log(err)

    );

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
  
  listarRutas()
  {
   
    this.RutasService.getRutas().subscribe(
      res=>{
        console.log(res)
        this.listaR()
        this.RutasListas=<any>res;
      },
      err=>console.log(err)
    );
  }
  enviardatos(){
    
      localStorage.setItem('viaje', JSON.stringify(this.datosviaje)) 
    
    
  }
  get origenbus(){return this.registroForm.get('origenbus');}

  get destinobus(){return this.registroForm.get('destinobus');}
  get fecha(){return this.registroForm.get('fecha');}
}

