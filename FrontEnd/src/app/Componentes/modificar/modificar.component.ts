import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Admin, ServAdminService } from './../../Services/serv-admin.service';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
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


  admin: Admin={
    id:'',
    nombre:'',
    apellido:'',
    nombreus:'',
    correo:'',
    password:''
  };
  constructor(private ServAdminService:ServAdminService, private router:Router, private activeRoute:ActivatedRoute) { 
    this.registroForm=this.createFormGroup()
  }
  ngOnInit(): void {
    const id_e=<string>this.activeRoute.snapshot.params.id;//recuperamo id de app-routing.modules
    // console.log('id de entrada: '+id_e)
    if(id_e){
      this.ServAdminService.getAdmin(id_e).subscribe(
        res=>{
          let valores=JSON.stringify(res)
          //ERROR CORREGIDO
          let cadead=JSON.parse(valores)
          this.admin.id=cadead[0].id
          this.admin.nombre=cadead[0].nombre
          this.admin.apellido=cadead[0].apellido
          this.admin.nombreus=cadead[0].nombreus
          this.admin.correo=cadead[0].correo
          this.admin.password=cadead[0].password
        },
        err=>console.log(err)
      );
    } 
  }
  modificar(){
    if(this.registroForm.valid){
      this.ServAdminService.editAdmin(this.admin.id, this.admin).subscribe(
        res=>{
          console.log(res);
        },
        err=>console.log(err)
      );
      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados!',
        showConfirmButton: false,
        timer: 2000
      }) 
      this.router.navigate(['/mostrar']);  //inicio
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
