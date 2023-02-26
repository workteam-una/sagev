import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { CancelarComponent } from './pages/cancelar/cancelar.component';
import { ReservaTablaComponent } from './components/reserva-tabla/reserva-tabla.component';
import { ServiceService } from '../Service/service.service';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { LoginComponent } from './pages/login/login.component';
import { CitasFuncionarioComponent } from './pages/citas-funcionario/citas-funcionario.component';
import { CitasFuncionarioTablaComponent } from './components/citas-funcionario-tabla/citas-funcionario-tabla.component';
import { CitasFuncionarioPopupComponent } from './components/citas-funcionario-popup/citas-funcionario-popup.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReservaComponent,
    CancelarComponent,
    ReservaTablaComponent,
    FormularioComponent,
    LoginComponent,
    CitasFuncionarioComponent,
    CitasFuncionarioTablaComponent,
    CitasFuncionarioPopupComponent,
    CancelarComponent
  ],
  exports: [
    ReservaComponent,
    CancelarComponent,
    ReservaTablaComponent,
    FormularioComponent,
    LoginComponent,
    CitasFuncionarioComponent,
    CitasFuncionarioTablaComponent,
    CitasFuncionarioPopupComponent,
    CancelarComponent
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
