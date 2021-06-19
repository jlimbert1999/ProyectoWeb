import { DatosViajeroComponent } from './Componentes/datos-viajero/datos-viajero.component';
import { ModificarHorarioComponent } from './modificar-horario/modificar-horario.component';
import { ModificarRutaComponent } from './modificar-ruta/modificar-ruta.component';
import { RegistroHorarioComponent } from './registro-horario/registro-horario.component';
import { MostrarRutasComponent } from './mostrar-rutas/mostrar-rutas.component';
import { RegistrarRutaComponent } from './registrar-ruta/registrar-ruta.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './Componentes/login/login.component';
import { MostrarComponent } from './Componentes/mostrar/mostrar.component';
import { ModificarComponent } from './Componentes/modificar/modificar.component';
import { AgregarComponent } from './Componentes/agregar/agregar.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarHorarioComponent } from './mostrar-horario/mostrar-horario.component';
import { SeleccionarViajeComponent } from './seleccionar-viaje/seleccionar-viaje.component';

const routes: Routes = [  //asignamos las rutas
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component: InicioComponent},
  {path:'add', component: AgregarComponent},
  {path:'edit/:id', component: ModificarComponent},
  {path:'mostrar', component: MostrarComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:"Registrar_Ruta", component:RegistrarRutaComponent},
  {path:"Mostrar_Rutas", component:MostrarRutasComponent},
  {path:"Registrar_Horario", component:RegistroHorarioComponent},
  {path:"Mostrar_Horario", component:MostrarHorarioComponent},
  {path:"Mostrar_Rutas/Modificar_Ruta/:id",component:ModificarRutaComponent},
  {path:"Mostrar_Horario/Modificar_Horario/:id", component:ModificarHorarioComponent},
  {path:"Seleccionar_viaje", component:SeleccionarViajeComponent},
  {path:"datos-viajero", component:DatosViajeroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
