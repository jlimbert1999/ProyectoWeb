import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Buses, BusService } from '../SERVICIOS/bus.service';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 

@Component({
  selector: 'app-modificar-horario',
  templateUrl: './modificar-horario.component.html',
  styleUrls: ['./modificar-horario.component.css']
})
export class ModificarHorarioComponent implements OnInit {
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

      

      hora:  new FormControl('', [Validators.required]),
      nombrebus:  new FormControl('', [Validators.required, Validators.minLength(3),  Validators.pattern(this.namePatter)]),
      
      precio:  new FormControl('', [Validators.required, Validators.min(50),  Validators.max(250)]),
    })

  }
  registroForm: FormGroup;
  constructor(private BusService:BusService, private router:Router, private activaRoute:ActivatedRoute) {
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
    const id_entrada = <string>this.activaRoute.snapshot.params.id;
    console.log('ide de entrada'+ id_entrada);
    if(id_entrada){
      this.BusService.getBus(id_entrada).subscribe(
        res=>{
          let valores =JSON.stringify(res)
          let cadena=JSON.parse(valores)
          this.buses.id_bus=cadena[0].id_bus
          this.buses.origenbus=cadena[0].origenbus
          this.buses.destinobus=cadena[0].destinobus
          this.buses.fecha=cadena[0].fecha
          this.buses.hora=cadena[0].hora
          this.buses.nombrebus=cadena[0].nombrebus
          this.buses.tipobus=cadena[0].tipobus
          this.buses.precio=cadena[0].precio
        },
        err=>console.log(err)
      );
    }
  }
  modificar()
  {
    if(this.registroForm.valid){
      Swal.fire({
        icon: 'success',
  
            title: 'Se Modifico el bus!',
  
            showConfirmButton: false,
  
            timer: 2000     
      })
      this.BusService.editBus(this.buses.id_bus, this.buses).subscribe(
        res=>{
          console.log(res);
        },
        err=>console.log(err)
      );
      this.router.navigate(['/Mostrar_Horario'])

    }else{
      Swal.fire({
        icon: 'error',
  
            title: 'Ingrese todos los campos requeridos',
  
            showConfirmButton: false,
  
            timer: 2000
      })
    }
  }

  get hora(){return this.registroForm.get('hora');}
  get nombrebus(){return this.registroForm.get('nombrebus');}

  get precio(){return this.registroForm.get('precio');}


}
