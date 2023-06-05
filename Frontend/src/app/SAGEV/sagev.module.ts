import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { CancelarComponent } from './pages/cancelar/cancelar.component';
import { ReservaTablaComponent } from './components/reserva-tabla/reserva-tabla.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { LoginComponent } from './pages/login/login.component';
import { CitasFuncionarioComponent } from './pages/citas-funcionario/citas-funcionario.component';
import { CitasFuncionarioTablaComponent } from './components/citas-funcionario-tabla/citas-funcionario-tabla.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelarTablaComponent } from './components/cancelar-tabla/cancelar-tabla.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { AdministradorTablaComponent } from './components/administrador-tabla/administrador-tabla.component';

@NgModule({
  declarations: [
    ReservaComponent,
    ReservaTablaComponent,
    FormularioComponent,
    LoginComponent,
    CitasFuncionarioComponent,
    CitasFuncionarioTablaComponent,
    CancelarComponent,
    CancelarTablaComponent,
    AdministradorComponent,
    AdministradorTablaComponent
  ],
  exports: [
    ReservaComponent,
    ReservaTablaComponent,
    FormularioComponent,
    LoginComponent,
    CitasFuncionarioComponent,
    CitasFuncionarioTablaComponent,
    CancelarComponent,
    CancelarTablaComponent,
    AdministradorComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: []
})
export class SAGEVModule { }
