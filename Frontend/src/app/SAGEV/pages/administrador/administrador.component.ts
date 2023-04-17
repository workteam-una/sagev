import { Departamento } from '../../modelo/departamento';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  formModalArea: any
  formModalDpto: any
  formModalAgrFunc: any
  formModalPswrdFunc: any

  funcionarioForm!: FormGroup
  enviar = false;

  departamentos: Departamento[] = []
  nuevoFuncionario: Funcionario = new Funcionario

  @Input() fechaInicio: Date 
  @Input() fechaFinal: Date
  // @Input() confirmarBusqueda: boolean = false;

  constructor(private formBuilder: FormBuilder,private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getDepartamentos()
    .subscribe(dataDep => {
      this.departamentos = dataDep
    })

    //Validaciones del formulario
    this.funcionarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidouno: ['', Validators.required],
      apellidodos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });

  }

  //Ejecuta las validaciones
  validaciones(): boolean {
    this.enviar = true;
    // El formulario es invalido
    if (this.funcionarioForm.invalid) {
      console.log("mal")
        return false;
    }
    else{
      console.log("bien")
      // El formulario esta bien
    console.log('SIS!! :-)\n\n' + JSON.stringify(this.funcionarioForm.value, null, 7));
      return true;
    } 
}

  //Limpia el formulario
  resetForm() : void {
    this.enviar = false;
    this.funcionarioForm.reset();
  }

  // un get del formulario
  get f() { return this.funcionarioForm.controls; }

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

  //Pop up cambiar contrasena a funcionario

  openModal() {
    this.formModalPswrdFunc.showPswrdFunc();
   }

   showModalPswrdFunc = -1;

   showPswrdFunc(indexPswrdFunc){
    this.showModalPswrdFunc = indexPswrdFunc;
  }

  closePswrdFunc(){
    this.resetForm()
    this.showModalPswrdFunc = -1;
  }

  guardarFuncionario(func: Funcionario): void{
    // Las validaciones estan mal
    //if(!this.validaciones()){
    //  return
    //}
    this.service.guardarFuncionario(func)
    .subscribe(data =>{
      alert("Se agregó el funcionario con éxito")
      // Se debe actualizar la página para evitar sacar dos citas iguales
      //window.location.reload()
      //this.router.navigate(["listar"]);
    })
    this.resetForm()
  }

  setDepaFuncionario(numDepa: string){
    this.nuevoFuncionario.numDepartamento = Number(numDepa)
  }

  mostrarFuncionario(): void{
    console.log(this.nuevoFuncionario.idFuncionario)
    console.log(this.nuevoFuncionario.nombre)
    console.log(this.nuevoFuncionario.apellido1)
    console.log(this.nuevoFuncionario.apellido2)
    console.log(this.nuevoFuncionario.correo)
    console.log(this.nuevoFuncionario.contrasenna)
    console.log(this.nuevoFuncionario.numDepartamento)
  }

  // // Cambia el estado del botón a True
  // confirmarBusquedaFiltros() : void {
  //   this.confirmarBusqueda = true;
  // }
}
