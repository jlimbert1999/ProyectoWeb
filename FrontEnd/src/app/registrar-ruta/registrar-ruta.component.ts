import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ruta, RutasService } from '../SERVICIOS/rutas.service';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
@Component({
  selector: 'app-registrar-ruta',
  templateUrl: './registrar-ruta.component.html',
  styleUrls: ['./registrar-ruta.component.css']
})
export class RegistrarRutaComponent implements OnInit {
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
  constructor(private RutasService:RutasService, private router:Router) {
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
  }
  agregar(){
    if(this.registroForm.valid){
      this.RutasService.getRutas().subscribe(
        res=>{
          let valores=JSON.stringify(res)
          let cadena=JSON.parse(valores)
          let val=false
          //console.log('esss',cadena[2].nombreus)
          for(let i=0;i<cadena.length;i++){
            if(cadena[i].origen===this.ruta.origen && cadena[i].destino===this.ruta.destino){
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
            this.RutasService.addRuta(this.ruta).subscribe();
              Swal.fire({
              icon: 'success',
  
            title: 'Registro Exitoso!',
  
            showConfirmButton: false,
  
            timer: 2000
        
          })
      this.router.navigate(['/Mostrar_Rutas']);

          }

        })
      
    }
    else{
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