import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './SAGEV/pages/reserva/reserva.component';
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
