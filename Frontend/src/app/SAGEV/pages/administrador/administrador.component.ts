import { Departamento } from '../../modelo/departamento';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../modelo/area';

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

  idfunc: string
  contra1: string
  contra2: string //Esto es de inteligencia cuestionable
  funcionariopojo: Funcionario = new Funcionario() //Este es un modelo que me sirve para poder hacer put si problemas

  funcionarios: Funcionario[] = []

  areas: Area[] = []
  departamentos: Departamento[] = []
  nuevoFuncionario: Funcionario = new Funcionario
  nuevaArea: Area = new Area
  nuevoDepa: Departamento = new Departamento

  @Input() fechaInicio: Date 
  @Input() fechaFinal: Date
  // @Input() confirmarBusqueda: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getFuncionarios()
    this.getAreas()
    this.getDepartamentos()

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

  openModalArea() : void {
    this.formModalArea.showArea();
   }

   getAreas() : void {
   this.service.getAreas()
    .subscribe(dataArea => {
      this.areas = dataArea
    })
  }

  guardarAreas(a: Area) : void {
    if (this.validarNumeroArea(a.numArea)) {
      alert("El número de área digitado ya está en uso")
      return
    }
    this.service.guardarArea(a)
    .subscribe(data => {
      alert("Se agregó el área con éxito")
    })
  }

  guardarDepartamento(d: Departamento) : void {
    if (this.validarNumeroDepartamento(d.numDepartamento)) {
      alert("El número de departamento digitado ya está en uso")
      return
    }
    this.service.guardarDepartamentos(d)
    .subscribe(data => {
      alert("Se agregó el departamento con éxito")
    })
  }

  validarNumeroArea(numArea: number) : boolean {
    console.log(numArea)
    let numAreaDuplicado = false
    this.areas.forEach(a => {
      console.log(a.numArea)
      // Este parseo a la variable numArea es necesario para que funcione, pero no debería de serlo
      if(a.numArea === Number(numArea)) {
        numAreaDuplicado = true
      }
    })
    return numAreaDuplicado
  }

  getDepartamentos(): void {
    this.service.getDepartamentos()
    .subscribe(dataDep => {
      this.departamentos = dataDep
    })
  }

  getFuncionarios(): void {
    this.service.getFuncionarios()
    .subscribe(dataFunc => {
      this.funcionarios = dataFunc
    })
  }

  validarNumeroDepartamento(numDepa: number) : boolean {
    let numDepaDuplicado = false
    this.departamentos.forEach(d => {
            // Este parseo a la variable numArea es necesario para que funcione, pero no debería de serlo
      if(d.numDepartamento === Number(numDepa)) {
        numDepaDuplicado = true
      }
    })
    return numDepaDuplicado
  }

   showModalArea: number = -1;

   showArea(indexArea) : void {
    this.showModalArea = indexArea;
  }

  closeArea() : void {
    this.showModalArea = -1;
  }

  //Pop up agregar nuevo departamento

  openModalDpto() : void {
    this.formModalDpto.showDpto();
   }

   showModalDpto = -1;

   showDpto(indexDpto) : void {
    this.showModalDpto = indexDpto;
  }

  closeDpto() : void {
    this.showModalDpto = -1;
  }

  //Pop up agregar nuevo funcionario

  openModalAgrFunc() : void {
    this.formModalAgrFunc.showAgrFunc();
   }

   showModalAgrFunc = -1;

   showAgrFunc(indexAgrFunc) : void {
    this.showModalAgrFunc = indexAgrFunc;
  }

  closeAgrFunc() : void {
    this.showModalAgrFunc = -1;
  }

  //Pop up cambiar contrasena a funcionario

  openModal() : void {
    this.formModalPswrdFunc.showPswrdFunc();
   }

   showModalPswrdFunc = -1;

   showPswrdFunc(indexPswrdFunc) : void {
    this.showModalPswrdFunc = indexPswrdFunc;
  }

  closePswrdFunc() : void {
    this.resetForm()
    this.showModalPswrdFunc = -1;
  }

  guardarFuncionario(func: Funcionario): void {
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

  setDepaFuncionario(numDepa: string) : void {
    this.nuevoFuncionario.numDepartamento = Number(numDepa)
  }

  setAreaDepa(numArea: string) : void {
    this.nuevoDepa.numArea = Number(numArea)
  }

  setIdFunc(id: string): void {
    this.idfunc = id
  }


  cambiarContra(): void{
    if(this.contra1 === null || this.contra2 === null){
      alert("Hay constraseñas en blanco")
      return
    }
    if(this.contra1 != this.contra2){
      alert("Las contraseñas son diferentes")
      return
    }
    else{
      //Empaquetanod el funcionario modelo para enviarlo por put
      this.funcionariopojo.idFuncionario = this.idfunc
      this.funcionariopojo.contrasenna = this.contra1
      this.service.cambiarContraFunc(this.funcionariopojo)
      .subscribe(data => {
        alert("Se cambio la contraseña con exito!")
      })
      this.closePswrdFunc()
    }

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
