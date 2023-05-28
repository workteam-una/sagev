import { Departamento } from '../../modelo/departamento';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../modelo/area';
import Swal from 'sweetalert2';

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

  showModalArea: number = -1;
  showModalDpto = -1;
  showModalAgrFunc = -1;
  showModalPswrdFunc = -1;

  idFunc: string
  contra1: string
  contra2: string //Esto se puede hacer mejor
  funcionarioPojo: Funcionario = new Funcionario() //Este es un modelo que me sirve para poder hacer put si problemas

  funcionarios: Funcionario[] = []

  areas: Area[] = []
  departamentos: Departamento[] = []
  nuevoFuncionario: Funcionario = new Funcionario()
  nuevaArea: Area = new Area
  nuevoDepa: Departamento = new Departamento

  @Input() fechaInicio: Date 
  @Input() fechaFinal: Date
  // @Input() confirmarBusqueda: boolean = false;

  //Declaracion de todos los formularios
  //NFF: Nuevo Funcionario Formulario
  funcionarioForm!: FormGroup
  enviarNFF = false;
  //NAF: Nueva Area Formulario
  areaForm!: FormGroup
  enviarNAF = false;
  //NAF: Nueva Departamento Formulario
  departamentoForm!: FormGroup
  enviarNDF = false;
  //CCF: Cambiar Constraseña Formulario
  cambiarcontraForm!: FormGroup
  enviarCCF = false;



  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getFuncionarios()
    this.getAreas()
    this.getDepartamentos()

    //Validaciones del formulario nuevo funcionario
    this.funcionarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidouno: ['', Validators.required],
      apellidodos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      departamento: ['', Validators.required],
      suplente: ['', Validators.required]
    });
    //Validaciones del formulario nueva area
    this.areaForm = this.formBuilder.group({
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    //Validaciones del formulario nueva area
    this.departamentoForm = this.formBuilder.group({
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    //Validaciones del formulario crear nueva contraseña
    this.cambiarcontraForm = this.formBuilder.group({
      idfuncionario: ['', Validators.required],
      contrauno: ['', Validators.required],
      contrados: ['', Validators.required]
    })
  }

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
    if(!this.validacionesNAF()){
      return
    }
    this.cargarNuevaArea()
    console.log(this.nuevaArea)
    if (this.validarNumeroArea(a.numArea)) {
      Swal.fire({
        title: 'Error al agregar nueva área',
        text: 'El número de área digitado ya está en uso',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    this.service.guardarArea(a)
    .subscribe(data => {
      Swal.fire({
        title: '¡Área agregada con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
    })
    this.resetFormNAF()
    this.closeArea()
  }

  guardarDepartamento(d: Departamento) : void {
    if(!this.validacionesNDF()){
      return
    }
    this.cargarNuevoDepartamento()
    if (this.validarNumeroDepartamento(d.numDepartamento)) {
      Swal.fire({
        title: 'Error al agregar nueva departamento',
        text: 'El número de departamento digitado ya está en uso',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    this.service.guardarDepartamentos(d)
    .subscribe(data => {
      Swal.fire({
        title: '¡Departamento agregado con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
    })
    this.resetFormNDF()
    this.closeDpto()
  }

  guardarFuncionario(): void {
    if(!this.validacionesNFF()) {
     return
    }
  this.cargarNuevoFuncionario()
  console.log(this.nuevoFuncionario)
  // if (this.nuevoFuncionario.numDepartamento === 0) {
  //   Swal.fire({
  //     title: 'Error al agregar funcionario',
  //     text: '¡Ingrese un número de departamento válido!',
  //     icon: 'error',
  //     confirmButtonText: 'Aceptar',
  //     confirmButtonColor: '#3085d6',
  //   })
  //   return
  // }
  // if (this.nuevoFuncionario.suplente === "") {
  //   Swal.fire({
  //     title: 'Error al agregar funcionario',
  //     text: '¡Debe seleccionar si el funcionario va a ser suplente o no!',
  //     icon: 'error',
  //     confirmButtonText: 'Aceptar',
  //     confirmButtonColor: '#3085d6',
  //   })
  //   return
  // }
  this.service.guardarFuncionario(this.nuevoFuncionario)
  .subscribe(data =>{
    Swal.fire({
      title: '¡Funcionario agregado con éxito!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.reload()
    })
  })
  this.resetFormNFF()
  this.closeAgrFunc()
}

  validarNumeroArea(numArea: number) : boolean {
    console.log(numArea)
    let numAreaDuplicado = false
    this.areas.forEach(a => {
      // console.log(a.numArea)
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

  cambiarContra(): void{
    if(!this.validacionesCCF()){
      return
    }
    this.cargarContras()
    if(this.contra1 != this.contra2){
      Swal.fire({
        title: 'Error al modificar la contraseña',
        text: 'Las contraseñas ingresadas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    else{
      // Cargando al funcionario con el id y contraseña ya validadas para permitir el cambio
      this.cargarFuncionarioContraNueva()
      this.service.cambiarContraFunc(this.funcionarioPojo)
      .subscribe(data => {
        Swal.fire({
          title: '¡Contraseña modificada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
      })
      this.resetFormCCF()
      this.closePswrdFunc()
    }

  }

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
   
  showPswrdFunc(indexPswrdFunc) : void {
    this.showModalPswrdFunc = indexPswrdFunc;
  }

  closePswrdFunc() : void {
    this.resetFormNFF()
    this.showModalPswrdFunc = -1;
  }

  setDepaFuncionario(numDepa: string) : void {
    this.nuevoFuncionario.numDepartamento = Number(numDepa)
  }

  setAreaDepa(numArea: string) : void {
    this.nuevoDepa.numArea = Number(numArea)
  }

  // setIdFunc(id: string): void {
  //   this.idfunc = id
  // }

  // // Cambia el estado del botón a True
  // confirmarBusquedaFiltros() : void {
  //   this.confirmarBusqueda = true;
  // }

  //Apartir de aqui solo hay validaciones de formualrios
  
  // un get del formulario NFF
  get f() { return this.funcionarioForm.controls; }

  //Ejecuta las validaciones de NFF
  validacionesNFF(): boolean {
    this.enviarNFF = true;
    // El formulario es invalido
    if (this.funcionarioForm.invalid) {
      //console.log('mal\n\n' + JSON.stringify(this.funcionarioForm.value, null, 7));
        return false;
    }
    else{
      //console.log("bien")
      // El formulario esta bien
    //console.log('SIS!! :-)\n\n' + JSON.stringify(this.funcionarioForm.value, null, 7));
      return true;
    } 
  }

   //Limpia el formulario NFF
   resetFormNFF() : void {
    this.enviarNFF = false;
    this.funcionarioForm.reset();
  }

  cargarNuevoFuncionario() : void {
    // Departamento
    this.nuevoFuncionario.numDepartamento = this.funcionarioForm.get('departamento')?.value;
    // Nombre
    this.nuevoFuncionario.nombre = this.funcionarioForm.get('nombre')?.value;
    // Apellido 1
    this.nuevoFuncionario.apellido1 = this.funcionarioForm.get('apellidouno')?.value;
    // Apellido 2
    this.nuevoFuncionario.apellido2 =  this.funcionarioForm.get('apellidodos')?.value;
    // ID(cedula)
    this.nuevoFuncionario.idFuncionario =  this.funcionarioForm.get('cedula')?.value;
    // Email
    this.nuevoFuncionario.correo =  this.funcionarioForm.get('email')?.value;
    // Clave
    this.nuevoFuncionario.contrasenna = this.funcionarioForm.get('clave')?.value;
    // Suplente
    this.nuevoFuncionario.suplente = this.funcionarioForm.get('suplente')?.value;
  }

  // un get del formulario NAF
  get naf() { return this.areaForm.controls; }

  //Ejecuta las validaciones de NAF
  validacionesNAF(): boolean {
    this.enviarNAF = true;
    // El formulario es invalido
    if (this.areaForm.invalid) {
      console.log('mal\n\n' + JSON.stringify(this.areaForm.value, null, 3));
        return false;
    }
    else{
      //console.log("bien")
      // El formulario esta bien
    console.log('bien\n\n' + JSON.stringify(this.areaForm.value, null, 3));
      return true;
    } 
  }
  //Limpia el formulario NAF
  resetFormNAF() : void {
    this.enviarNAF = false;
    this.areaForm.reset();
  }

  cargarNuevaArea() : void {
    //Numero
    this.nuevaArea.numArea = this.areaForm.get('numero')?.value;
    //Nombre
    this.nuevaArea.nombre = this.areaForm.get('nombre')?.value;
    //Descripcion
    this.nuevaArea.descripcion = this.areaForm.get('descripcion')?.value;
  }

  // un get del formulario NDF
  get ndf() { return this.departamentoForm.controls; }

  //Ejecuta las validaciones de NDF
  validacionesNDF(): boolean {
    this.enviarNDF = true;
    // El formulario es invalido
    if (this.departamentoForm.invalid) {
      console.log('mal\n\n' + JSON.stringify(this.departamentoForm.value, null, 3));
        return false;
    }
    else{
      //console.log("bien")
      // El formulario esta bien
    console.log('bien\n\n' + JSON.stringify(this.departamentoForm.value, null, 3));
      return true;
    } 
  }

  //Limpia el formulario NDF
  resetFormNDF() : void {
    this.enviarNDF = false;
    this.departamentoForm.reset();
  }

  cargarNuevoDepartamento() : void {
    //Numero
    this.nuevoDepa.numDepartamento = this.departamentoForm.get('numero')?.value;
    //Nombre
    this.nuevoDepa.nombre = this.departamentoForm.get('nombre')?.value;
    //Descripcion
    this.nuevoDepa.descripcion = this.departamentoForm.get('descripcion')?.value;
  }

  // un get del formulario NDF
  get ccf() { return this.cambiarcontraForm.controls; }

  //Ejecuta las validaciones de NDF
  validacionesCCF(): boolean {
    this.enviarCCF = true;
    // El formulario es invalido
    if (this.cambiarcontraForm.invalid) {
      console.log('mal\n\n' + JSON.stringify(this.cambiarcontraForm.value, null, 2));
        return false;
    }
    else{
      //console.log("bien")
      // El formulario esta bien
    console.log('bien\n\n' + JSON.stringify(this.cambiarcontraForm.value, null, 2));
      return true;
    } 
  }

  //Limpia el formulario NDF
  resetFormCCF() : void {
    this.enviarCCF = false;
    this.cambiarcontraForm.reset();
  }

  //Esto es inseguro
  cargarContras() : void {
    // Funcionario
    this.idFunc = this.cambiarcontraForm.get('idfuncionario')?.value;
    // Contraseña 1
    this.contra1 = this.cambiarcontraForm.get('contrauno')?.value;
    // Contraseña 2
    this.contra2 = this.cambiarcontraForm.get('contrados')?.value;
  }

  // Carga al funcionario que se va a enviar
  cargarFuncionarioContraNueva() : void {
    this.funcionarioPojo.idFuncionario = this.idFunc
    this.funcionarioPojo.contrasenna = this.contra1
  }

}