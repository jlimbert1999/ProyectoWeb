import { ServAdminService } from './../Services/serv-admin.service';
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
  ruta: Ruta={
    id_ruta:'',
    origen:'',
    destino:''
  };
  
  constructor(private BusService:BusService, private router:Router,private RutasService:RutasService, private _Calen:CalenService,  private Router:Router, private ServAdminService:ServAdminService) {
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
    this.listarRutas();
    this._Calen.Carga(["calen"]);
  }
  cancelar(){
    this.ServAdminService.valor=3
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/mostrar']);
    
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

  listaDestinoSinRep(){
    this.RutasService.getRutas().subscribe(
      res=>{
        let valores=JSON.stringify(res)
        let cadena=JSON.parse(valores)
        let dest:any=[] 
        for(let i=0;i<cadena.length;i++){
          const elemento = cadena[i].destino;
          if (!dest.includes(cadena[i].destino)) {
            dest.push(cadena[i].destino);
          }
        }
        this.RutasListas=dest

      },
      err=>console.log(err)

    );
  }
  listarRutas()
  {
    // this.RutasService.getRutas().subscribe(
    //   res=>{
    //     console.log(res)
    //     this.listaR()
    //     this.listaDestinoSinRep();
    //     // this.RutasListas=<any>res;
    //   },
    //   err=>console.log(err)
    // );
    this.listaR()
    this.listaDestinoSinRep();
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
    var arr1:any=[]
    if(this.registroForm.valid){
      let valorOrigen=(<HTMLInputElement>document.getElementById('selectOrigen')).value; 
      let valorDestino=(<HTMLInputElement>document.getElementById('selectDestino')).value;
      this.RutasService.getRutas().subscribe(
        res=>{ 
          let valores=JSON.stringify(res)
          let cadena=JSON.parse(valores)
          for(let i=0;i<cadena.length;i++){
            arr1[i]=cadena[i].origen+"|"+cadena[i].destino
          }
          let palabra=valorOrigen+"|"+valorDestino
          this.agregarARutas(arr1,palabra, valorOrigen, valorDestino)
        },
        err=>console.log(err)
      );
      let palabra=(valorOrigen+"|"+valorDestino);
      this.ServAdminService.valor=3
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/mostrar']);
      
      
     
      // this.RutasService.addRuta(this.ruta).subscribe();
      // this.BusService.getBuses().subscribe(
      //   res=>{
      //     let valores=JSON.stringify(res)
      //     let cadena=JSON.parse(valores)
      //     let val=false
      //     //console.log('esss',cadena[2].nombreus)
      //     for(let i=0;i<cadena.length;i++){
      //       if(cadena[i].nombrebus===this.buses.nombrebus){
      //         Swal.fire({
      //           icon: 'error',
      //           title: 'La Ruta ya Existe',
      //           showConfirmButton: false,
      //           timer: 2000
      //         })
      //         val=true
      //         break
      //       }
      //     }//
      //     if(val!=true){
      //       this.conparar();
      //     }
      //   }
      // )
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

agregarARutas(arr1:any,palabra:any, orig:any, dest:any){
  if(!arr1.includes(palabra)){
    this.ruta.origen=orig
    this.ruta.destino=dest
    this.RutasService.addRuta(this.ruta).subscribe()
    this.BusService.addBus(this.buses).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'Se agrego el viaje.',
      showConfirmButton: false,
      timer: 2000
    })  
    this.Router.navigate(['mostrar-horario'])  
  }
  else{
    this.BusService.addBus(this.buses).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'Se agrego el viaje.',
      showConfirmButton: false,
      timer: 2000
    })  
    this.Router.navigate(['mostrar-horario'])  
  }
  

}

//evento seleccion de origen y ruta
elegitRutaSinRep(){
  let valores=JSON.stringify(this.RutasListas)
  let cadena=JSON.parse(valores)
  let valorOrigen=(<HTMLInputElement>document.getElementById('selectOrigen')).value
  var dest:any=[] 
  for(let i=0;i<cadena.length;i++){
    if (valorOrigen!==cadena[i]) {
      dest.push(cadena[i]);
    } 
  }
  this.RutasListas=dest
}
reloadDestinos(){
  this.listaDestinoSinRep();
}


//METODOS PARA AGREGAR NEUVOS ORIGENE Y DESTINOS
public async addNewOrigen(){ //AGREGAR ORIGEN SI NO EXISTE
  const { value: formValues } = await Swal.fire({
    title: 'Ingrese el Nuevo Origen',
    html:
      '<input id="swal-input1" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `Aceptar`,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      let valorOrigen=(<HTMLInputElement>document.getElementById('swal-input1')).value;
      let valores=JSON.stringify(this.RutasL)
      let cadena=JSON.parse(valores)   
      if (cadena.includes(valorOrigen) ){//condicion para evitar repetidos
        Swal.fire({
          icon: 'error',
          title: 'El destino ya existe',
          showConfirmButton: false,
          timer: 2000
        })      
      } 
      else{
        var sel = document.getElementById('selectOrigen');
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(valorOrigen) );
        opt.value = valorOrigen; 
        sel!.appendChild(opt); 
      }
      this.ruta.origen=valorOrigen;
    }
  })
  // const { value: formValues } = await Swal.fire({
  //   title: 'Ingrese el Nuevo Origen',
  //   html:
  //     '<input id="swal-input1" class="swal2-input">' +
  //     '<input id="swal-input2" class="swal2-input">',
  //   focusConfirm: false,
  //   showCancelButton: true,
  //   confirmButtonText: `Aceptar`,
  //   cancelButtonText: 'Cancelar',
  //   preConfirm: () => {
  //     let valorOrigen=(<HTMLInputElement>document.getElementById('swal-input1')).value;
  //     let valorDestino=(<HTMLInputElement>document.getElementById('swal-input2')).value
  //     var sel1 = document.getElementById('selectOrigen');
  //     var sel2 = document.getElementById('selectDestino');
  //     var opt1 = document.createElement('option');
  //     var opt2 = document.createElement('option');
  //     opt1.appendChild( document.createTextNode(valorOrigen) );
  //     opt2.appendChild( document.createTextNode(valorDestino) );
  //     opt1.value = valorOrigen; 
  //     opt2.value = valorDestino; 
  //     sel1!.appendChild(opt1); 
  //     sel2!.appendChild(opt2); 
  //     this.ruta.origen=valorOrigen;
  //     this.ruta.destino=valorDestino;
  //   }
  // })
  

}

public async addNewDestino(){ //AGREGAR DESTINI SI NO EXISTE
  const { value: formValues } = await Swal.fire({
    title: 'Ingrese el Nuevo Destino',
    html:
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `Aceptar`,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      let valorDestino=(<HTMLInputElement>document.getElementById('swal-input2')).value
      let valores=JSON.stringify(this.RutasListas)
      let cadena=JSON.parse(valores)   
      if (cadena.includes(valorDestino) ){ //condicion para evitar repetidos
        Swal.fire({
          icon: 'error',
          title: 'El destino ya existe',
          showConfirmButton: false,
          timer: 2000
        })      
      } 
      else{
        var sel = document.getElementById('selectDestino');
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(valorDestino) );
        opt.value = valorDestino; 
        sel!.appendChild(opt); 
        this.ruta.destino=valorDestino;

      }
      

    }
  })
  

}



get origenbus(){return this.registroForm.get('origenbus');}
  get destinobus(){return this.registroForm.get('destinobus');}
  get fecha(){return this.registroForm.get('fecha');}
  get hora(){return this.registroForm.get('hora');}
  get nombrebus(){return this.registroForm.get('nombrebus');}
  get tipo(){return this.registroForm.get('tipo');}
  get precio(){return this.registroForm.get('precio');}
}


