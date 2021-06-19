import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService, Buses } from '../SERVICIOS/bus.service';
import { Ruta, RutasService } from '../SERVICIOS/rutas.service';
import { CalenService } from '../SERVICIOS/calen.service';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
@Component({
  selector: 'app-registro-horario',
  templateUrl: './registro-horario.component.html',
  styleUrls: ['./registro-horario.component.css'],
  
})
export class RegistroHorarioComponent implements OnInit {
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
  namePattern: any=/^[a-z\s]+$/
  namePatter: any=/^[a-zA-Z\s0-9]+$/
  createFormGroup(){

    return new FormGroup({

      origenbus: new FormControl('', [Validators.required,  Validators.pattern(this.namePattern)]),

      destinobus:  new FormControl('', [Validators.required,   Validators.pattern(this.namePattern)]),
      fecha: new FormControl('', [Validators.required]),

      hora:  new FormControl('', [Validators.required]),
      nombrebus:  new FormControl('', [Validators.required, Validators.minLength(3),  Validators.pattern(this.namePatter)]),
      tipo:  new FormControl('', [Validators.required]),
      precio:  new FormControl('', [Validators.required, Validators.min(50),  Validators.max(250)]),
    })

  }
  registroForm: FormGroup;
  RutasListas: Ruta[]=[];
  RutasL: Ruta[]=[];
  filterPost ='';
  constructor(private BusService:BusService, private router:Router,private RutasService:RutasService, private _Calen:CalenService) {
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
    this.listarRutas();
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
  conparar(){
    this.BusService.addBus(this.buses).subscribe();
      Swal.fire({
        icon: 'success',
  
        title: 'Registro Exitoso!',
  
        showConfirmButton: false,
  
        timer: 2000
      })
      Swal.fire({
        
        title: 'Desea registrar nuevo bus en la misma hora y la misma ruta?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: `Si`,
  
        denyButtonText: `No`,
      }).then((result) =>{
        if (result.isConfirmed) {
            this.buses.tipobus=" ";
            this.buses.nombrebus=" ";
            this.buses.precio=" ";
        }else{
          Swal.fire({
            title: 'Desea registrar nuevo bus en la misma ruta en otro dia?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: `Si`,
      
            denyButtonText: `No`,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.buses.fecha=" ";
              this.buses.hora=" ";
              this.buses.tipobus=" ";
              this.buses.nombrebus=" ";
              this.buses.precio=" ";
            }else
            {
              this.router.navigate(['/Mostrar_Horario']);
            }
          })
        }
      })
  }
  agregar(){
    if(this.registroForm.valid){
      this.BusService.getBuses().subscribe(
        res=>{
          let valores=JSON.stringify(res)
          let cadena=JSON.parse(valores)
          let val=false
          //console.log('esss',cadena[2].nombreus)
          for(let i=0;i<cadena.length;i++){
            if(cadena[i].nombrebus===this.buses.nombrebus){
              Swal.fire({
                icon: 'error',
                title: 'La Ruta ya Existe',
                showConfirmButton: false,
                timer: 2000
              })
              val=true
              break
            }
          }//
          if(val!=true){
            this.conparar();
          }
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ingrese todos los campos requeridos',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  refrescar(): void {
    window.location.reload();
}
get origenbus(){return this.registroForm.get('origenbus');}

  get destinobus(){return this.registroForm.get('destinobus');}
  get fecha(){return this.registroForm.get('fecha');}

  get hora(){return this.registroForm.get('hora');}
  get nombrebus(){return this.registroForm.get('nombrebus');}

  get tipo(){return this.registroForm.get('tipo');}
  get precio(){return this.registroForm.get('precio');}

  
}

