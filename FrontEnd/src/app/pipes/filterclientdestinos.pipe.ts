import { Pipe, PipeTransform,  } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Pipe({
  name: 'filterclientdestinos'
  
})

export class FilterclientdestinosPipe implements PipeTransform {
  datosviaje={
    origenbus:'',
    destinobus:'',
    fecha:''
  };  
  constructor(private router:Router){}
  transform(value: any, arg: any, arg1:any, arg2:any):any{
    this.recuperar();
   arg=this.datosviaje.origenbus;
   arg1=this.datosviaje.destinobus;
   arg2=this.datosviaje.fecha;
    
    const resultadoPotsf=[];
      for(const postf of value){
        if(postf.origenbus===arg && postf.destinobus=== arg1 && postf.fecha=== arg2){
          resultadoPotsf.push(postf);
        }      
        
    }
     
    return resultadoPotsf;
  }
  recuperar(){
    let auxvar=localStorage.getItem('viaje')

    let aux=JSON.parse(auxvar!)

    this.datosviaje=aux
  }

}
