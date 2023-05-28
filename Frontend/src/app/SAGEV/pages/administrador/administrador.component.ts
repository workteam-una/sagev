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



  idfunc: string
  contra1: string
  contra2: string //Esto se puede hacer mejor
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
      apellidouno: ['', Validators.required,],
      apellidodos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
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
      alert("El número de área digitado ya está en uso")
      return
    }
    this.service.guardarArea(a)
    .subscribe(data => {
      alert("Se agregó el área con éxito")
    })
    this.resetFormNAF()
  }

  guardarDepartamento(d: Departamento) : void {
    if(!this.validacionesNDF()){
      return
    }
    this.cargarNuevoDepartamento()
    if (this.validarNumeroDepartamento(d.numDepartamento)) {
      alert("El número de departamento digitado ya está en uso")
      return
    }
    this.service.guardarDepartamentos(d)
    .subscribe(data => {
      alert("Se agregó el departamento con éxito")
    })
    this.resetFormNDF()
  }

  guardarFuncionario(func: Funcionario): void {
    if(!this.validacionesNFF()){
     return
    }
  this.cargarNuevoFuncionario()
  this.service.guardarFuncionario(func)
  .subscribe(data =>{
    alert("Se agregó el funcionario con éxito")
    // Se debe actualizar la página para evitar sacar dos citas iguales
    //window.location.reload()
    //this.router.navigate(["listar"]);
  })
  this.resetFormNFF()
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
    this.resetFormNFF()
    this.showModalPswrdFunc = -1;
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
    if(!this.validacionesCCF()){
      return
    }
    this. cargarContras()
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
    //Nombre
    this.nuevoFuncionario.nombre = this.funcionarioForm.get('nombre')?.value;
      //Apellido 1
      this.nuevoFuncionario.apellido1 = this.funcionarioForm.get('apellidouno')?.value;
      //Apellido 2
      this.nuevoFuncionario.apellido2 =  this.funcionarioForm.get('apellidodos')?.value;
      //ID(cedula)
      this.nuevoFuncionario.idFuncionario =  this.funcionarioForm.get('cedula')?.value;
      //Email
      this.nuevoFuncionario.correo =  this.funcionarioForm.get('email')?.value;
      //Clave
      this.nuevoFuncionario.contrasenna = this.funcionarioForm.get('clave')?.value;
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
  cargarContras(){
    //Contra1
    this.contra1 = this.cambiarcontraForm.get('contrauno')?.value;
    //Contra2
    this.contra2 = this.cambiarcontraForm.get('contrados')?.value;
  }

}