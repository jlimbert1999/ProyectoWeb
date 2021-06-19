import { Router } from '@angular/router';
import { Admin, ServAdminService } from './../../Services/serv-admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  ListarAdmin:Admin[]=[];

  namePattern: any=/^[a-zA-Z\s]+$/
  nameusPattern: any=/^[a-zA-Z0-9_ ]+$/
  emailPattern: any=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  passPattern: any=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.namePattern)]),
      name2:  new FormControl('', [Validators.required, Validators.minLength(3),  Validators.pattern(this.namePattern)]),
      nameus:  new FormControl('',[Validators.required, Validators.minLength(5), Validators.pattern(this.nameusPattern)]),
      email:  new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password:  new FormControl('', [Validators.required, Validators.pattern(this.passPattern), Validators.minLength(5), Validators.maxLength(15)])

    })
  }
  registroForm: FormGroup;
  valor:boolean

  admin: Admin={
    id:'',
    nombre:'',
    apellido:'',
    nombreus:'',
    correo:'',
    password:''
  }
  
  constructor(private ServAdminService:ServAdminService, private router:Router) {
    this.registroForm=this.createFormGroup()
    this.valor=false
   }
  ngOnInit(): void {
  }
  agregar(){
    if(this.registroForm.valid){
      this.ServAdminService.getAdmins().subscribe(
        res=>{
          let valores=JSON.stringify(res)
          let cadena=JSON.parse(valores)
          let val=false
          console.log('esss',cadena[2].nombreus)
          for(let i=0;i<cadena.length;i++){
            if(cadena[i].nombreus==this.admin.nombreus||cadena[i].correo==this.admin.correo){
              Swal.fire({
                icon: 'error',
                title: 'El nombre de usuario o el correo ya existen',
                showConfirmButton: false,
                timer: 2000
              }) 
              val=true
              break
            }
          }//
          if(val!=true){
            //delete this.admin.id;
            this.ServAdminService.addAdmin(this.admin).subscribe();
            Swal.fire({
              icon: 'success',
              title: 'Registro realizado',
              showConfirmButton: false,
              timer: 3000
            }) 
            this.router.navigate(['/mostrar']) //inicio   


          }

        }) 
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ingrese los campos requeridos correctamente',
        showConfirmButton: false,
        timer: 2000
      }) 
    }

  }
  
  get name(){return this.registroForm.get('name');}
  get name2(){return this.registroForm.get('name2');}
  get nameus(){return this.registroForm.get('nameus');}
  get email(){return this.registroForm.get('email');}
  get password(){return this.registroForm.get('password');}

} 
