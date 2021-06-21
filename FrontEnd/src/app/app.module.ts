import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { AgregarComponent } from './Componentes/agregar/agregar.component';
import { ModificarComponent } from './Componentes/modificar/modificar.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MostrarComponent } from './Componentes/mostrar/mostrar.component';
import { LoginComponent } from './Componentes/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ModificarHorarioComponent } from './modificar-horario/modificar-horario.component';
import { ModificarRutaComponent } from './modificar-ruta/modificar-ruta.component';
import { MostrarHorarioComponent } from './mostrar-horario/mostrar-horario.component';
import { MostrarRutasComponent } from './mostrar-rutas/mostrar-rutas.component';
import { RegistrarRutaComponent } from './registrar-ruta/registrar-ruta.component';
import { RegistroHorarioComponent } from './registro-horario/registro-horario.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FiltercalendarioPipe } from './pipes/filtercalendario.pipe';
import { FilterdestinosPipe } from './pipes/filterdestinos.pipe';
import { FilterclientdestinosPipe } from './pipes/filterclientdestinos.pipe';
import { SeleccionarViajeComponent } from './seleccionar-viaje/seleccionar-viaje.component';
import { DatosViajeroComponent } from './Componentes/datos-viajero/datos-viajero.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AgregarComponent,
    ModificarComponent,
    MostrarComponent,
    LoginComponent,
    ModificarHorarioComponent,
    ModificarRutaComponent,
    MostrarHorarioComponent,
    MostrarRutasComponent,
    RegistrarRutaComponent,
    RegistroHorarioComponent,
    FilterPipe,
    FiltercalendarioPipe,
    FilterdestinosPipe,
    FilterclientdestinosPipe,
    SeleccionarViajeComponent,
    DatosViajeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule //para validaciones
    
  ],
  providers: [
    {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService //sericio para decodificar tokken
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
