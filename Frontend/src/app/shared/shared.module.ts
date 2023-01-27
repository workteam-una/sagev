import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderFuncionarioComponent } from './header-funcionario/header-funcionario.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderFuncionarioComponent
  ],
  exports: [
    HeaderComponent,
    HeaderFuncionarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
