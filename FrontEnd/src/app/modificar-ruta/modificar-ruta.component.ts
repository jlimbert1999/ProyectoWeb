import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Ruta, RutasService } from '../SERVICIOS/rutas.service';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 

@Component({
  selector: 'app-modificar-ruta',
  templateUrl: './modificar-ruta.component.html',
  styleUrls: ['./modificar-ruta.component.css']
})
export class ModificarRutaComponent implements OnInit {
  ruta: Ruta={
    id_ruta:'',
    origen:'',
    destino:''
  };
  namePattern: any=/^[a-z\s]+$/
  createFormGroup(){

    return new FormGroup({

      origen: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.namePattern)]),

      destino:  new FormControl('', [Validators.required, Validators.minLength(3),  Validators.pattern(this.namePattern)]),
    })
  }
  registroForm: FormGroup;
  constructor(private RutasService:RutasService, private router:Router, private activaRoute:ActivatedRoute) {
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
    const id_entrada = <string>this.activaRoute.snapshot.params.id;
    console.log('ide de entrada'+ id_entrada);
    if(id_entrada){
      this.RutasService.getRuta(id_entrada).subscribe(
        res=>{
          let valores =JSON.stringify(res)
          let cadena=JSON.parse(valores)
          this.ruta.id_ruta=cadena[0].id_ruta
          this.ruta.origen=cadena[0].origen
          this.ruta.destino=cadena[0].destino
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
  
            title: 'Se Modifico la Ruta!',
  
            showConfirmButton: false,
  
            timer: 2000     
      })
      this.RutasService.editRuta(this.ruta.id_ruta, this.ruta).subscribe(
        res=>{
          console.log(res);
        },
        err=>console.log(err)
      );
      this.router.navigate(['/Mostrar_Rutas'])
    }else{
      Swal.fire({
        icon: 'error',
  
            title: 'Ingrese todos los campos requeridos',
  
            showConfirmButton: false,
  
            timer: 2000
        
      })
    }
    
  }
  get origen(){return this.registroForm.get('origen');}

  get destino(){return this.registroForm.get('destino');}
}
