import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderFuncionarioComponent } from './header-funcionario/header-funcionario.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderFuncionarioComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    HeaderFuncionarioComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
