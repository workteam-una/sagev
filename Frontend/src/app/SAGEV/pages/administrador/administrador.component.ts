import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  formModalArea: any
  formModalDpto: any
  formModalAgrFunc: any
  formModalModFunc: any
  formModalPswrdFunc: any

  constructor() { }

  ngOnInit(): void {
  }

  //Pop up agregar nueva area

  openModalArea() {
    this.formModalArea.showArea();
   }

   showModalArea = -1;

   showArea(indexArea){
    this.showModalArea = indexArea;
  }

  closeArea(){
    this.showModalArea = -1;
  }

  //Pop up agregar nuevo departamento

  openModalDpto() {
    this.formModalDpto.showDpto();
   }

   showModalDpto = -1;

   showDpto(indexDpto){
    this.showModalDpto = indexDpto;
  }

  closeDpto(){
    this.showModalDpto = -1;
  }

  //Pop up agregar nuevo funcionario

  openModalAgrFunc() {
    this.formModalAgrFunc.showAgrFunc();
   }

   showModalAgrFunc = -1;

   showAgrFunc(indexAgrFunc){
    this.showModalAgrFunc = indexAgrFunc;
  }

  closeAgrFunc(){
    this.showModalAgrFunc = -1;
  }

  //Pop up modificar funcionario a cargo

  openModalModFunc() {
    this.formModalModFunc.showModFunc();
   }

   showModalModFunc = -1;

   showModFunc(indexModFunc){
    this.showModalModFunc = indexModFunc;
  }

  closeModFunc(){
    this.showModalModFunc = -1;
  }

  //Pop up cambiar contrasena a funcionario

  openModal() {
    this.formModalPswrdFunc.showPswrdFunc();
   }

   showModalPswrdFunc = -1;

   showPswrdFunc(indexPswrdFunc){
    this.showModalPswrdFunc = indexPswrdFunc;
  }

  closePswrdFunc(){
    this.showModalPswrdFunc = -1;
  }

  

}
