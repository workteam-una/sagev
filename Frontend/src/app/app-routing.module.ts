import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './SAGEV/pages/reserva/reserva.component';
import { CancelarComponent } from './app/sagev/pages/cancelar/cancelar.component';
import { LoginComponent } from './SAGEV/pages/login/login.component';
import { FormularioComponent } from './SAGEV/pages/formulario/formulario.component';
import { CitasFuncionarioComponent } from './SAGEV/pages/citas-funcionario/citas-funcionario.component';

const routes: Routes = [
  
  {
    path: '',
    component: ReservaComponent,
    pathMatch: 'full'
  },
  {
    path: 'cancelar',
    component: CancelarComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'formulario/:id',
    component: FormularioComponent
  },
  {
    path: 'citasFunc',
    component: CitasFuncionarioComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
