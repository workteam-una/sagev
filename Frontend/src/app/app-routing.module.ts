import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './SAGEV/pages/reserva/reserva.component';
import { LoginComponent } from './SAGEV/pages/login/login.component';
import { FormularioComponent } from './SAGEV/pages/formulario/formulario.component';
import { CitasFuncionarioComponent } from './SAGEV/pages/citas-funcionario/citas-funcionario.component';
import { CancelarComponent } from './SAGEV/pages/cancelar/cancelar.component';
import { AdministradorComponent } from './SAGEV/pages/administrador/administrador.component';

// A la ruta del administador se le agregó un código hash para que fuese más difícil acceder
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
    path: 'administrador/063d0217',
    component: AdministradorComponent
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
