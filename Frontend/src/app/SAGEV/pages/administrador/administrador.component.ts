import { Departamento } from '../../modelo/departamento';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../modelo/area';
import Swal from 'sweetalert2';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  // Pop-up Agregar Area
  formModalArea: any
  // Pop-up Agregar Departamento
  formModalDpto: any
  // Pop-up Agregar Funcionario
  formModalAgrFunc: any
  // Pop-up Agregar Area
  formModalPswrdFunc: any

  // Variables que controlan si se muestran o no los pop-ups: -1 se cierra, 1 se abre
  showModalArea: number = -1
  showModalDpto = -1
  showModalAgrFunc = -1
  showModalPswrdFunc = -1

  // Cédula del funcionario seleccionado para cambiar la contraseña
  idFunc: string
  contra1: string
  // TODO: Esta validacion se puede hacer mejor
  contra2: string 
  // Este es un modelo que me sirve para poder hacer PUT (metodo HTTP) sin problemas
  funcionarioPojo: Funcionario = new Funcionario() 
  funcionarios: Funcionario[] = []
  areas: Area[] = []
  departamentos: Departamento[] = []
  nuevoFuncionario: Funcionario = new Funcionario()
  nuevaArea: Area = new Area
  nuevoDepa: Departamento = new Departamento

  @Input() fechaInicio: Date 
  @Input() fechaFinal: Date

  // Declaración de todos los formularios

  // NFF: Nuevo Funcionario Formulario
  funcionarioForm!: FormGroup
  enviarNFF = false;
  // NAF: Nueva Area Formulario
  areaForm!: FormGroup
  enviarNAF = false;
  // NAF: Nueva Departamento Formulario
  departamentoForm!: FormGroup
  enviarNDF = false;
  // CCF: Cambiar Constraseña Formulario
  cambiarcontraForm!: FormGroup
  enviarCCF = false;

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getFuncionarios()
    this.getAreas()
    this.getDepartamentos()

    // Validaciones del formulario nuevo funcionario
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
    // Validaciones del formulario nueva area
    this.areaForm = this.formBuilder.group({
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    // Validaciones del formulario nueva area
    this.departamentoForm = this.formBuilder.group({
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    // Validaciones del formulario crear nueva contraseña
    this.cambiarcontraForm = this.formBuilder.group({
      idfuncionario: ['', Validators.required],
      contrauno: ['', Validators.required],
      contrados: ['', Validators.required]
    })
  }

  // Pop-up agregar nueva area
  openModalArea() : void {
    this.formModalArea.showArea();
   }

   getAreas() : void {
   this.service.getAreas()
    .subscribe({
      next: (data) => {
        this.areas = data
      }
    })
  }

  getDepartamentos(): void {
    this.service.getDepartamentos()
    .subscribe({
      next: (data) => {
        this.departamentos = data
      }
    })
  }

  getFuncionarios(): void {
    this.service.getFuncionarios()
    .subscribe({
      next: (data) => {
        this.funcionarios = data
        // Remover el funcionario administrador para no permitir cambiarle la contraseña
        this.funcionarios = this.funcionarios.filter(f => f.administrador !== 'S')
      }
    })
  }

  // Llama a las validaciones de le la nueva área a agregar y si son correctas la agrega
  guardarAreas(a: Area) : void {
    // Puntos de carga
    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })
    
    if(!this.validacionesNAF()){
      // Remover los puntos de carga
      Notiflix.Loading.remove()
      return
    }
    this.cargarNuevaArea()
    if (this.validarNumeroArea(a.numArea)) {
      // Remover los puntos de carga
      Notiflix.Loading.remove()

      // Desplegar pop-up
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
    .subscribe({
      next: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        // Desplegar pop-up
        Swal.fire({
          title: '¡Área agregada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
        this.ngOnInit()
        this.resetFormNAF()
        this.closeArea()  
      },
      error: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        // Desplegar pop-up
        Swal.fire({
          title: 'Error al agregar nueva área',
          text:  'Por favor, inténtelo nuevamente',
          icon:  'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
      }
    })
  }

  // Llama a las validaciones del nuevo departamento a agregar y si son correctas la agrega
  guardarDepartamento(d: Departamento) : void {
    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })
    if(!this.validacionesNDF()){
      // Remover los puntos de carga
      Notiflix.Loading.remove()
      return
    }
    this.cargarNuevoDepartamento()
    if (this.validarNumeroDepartamento(d.numDepartamento)) {
      // Remover los puntos de carga
      Notiflix.Loading.remove()

      // Desplegar pop-up
      Swal.fire({
        title: 'Error al agregar nuevo departamento',
        text: 'El número de departamento digitado ya está en uso',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    this.service.guardarDepartamentos(d)
    .subscribe({
      next: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        Swal.fire({
          title: '¡Departamento agregado con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
        this.ngOnInit()
        this.resetFormNDF()
        this.closeDpto()
      },
      error: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()
      
        // Desplegar pop-up
        Swal.fire({
          title: 'Error al agregar nuevo departamento',
          text:  'Por favor, inténtelo nuevamente',
          icon:  'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
      }
    })
  }

  // Llama a las validaciones del nuevo funcionario a agregar y si son correctas la agrega
  guardarFuncionario(): void {
    // Puntos de carga
    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })

    if(!this.validacionesNFF()) {
    // Remover los puntos de carga
    Notiflix.Loading.remove()
      return
    }

  this.cargarNuevoFuncionario()
  this.service.guardarFuncionario(this.nuevoFuncionario)
  .subscribe({
    next: () => {
      // Remover los puntos de carga
      Notiflix.Loading.remove()
      Swal.fire({
        title: '¡Funcionario agregado con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      this.ngOnInit()
      this.resetFormNFF()
      this.closeAgrFunc()
    },
    error: () => {
      // Remover los puntos de carga
      Notiflix.Loading.remove()

      // Desplegar pop-up
      Swal.fire({
        title: 'Error al agregar un nuevo funcionario',
        text:  'Por favor, inténtelo nuevamente',
        icon:  'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
    }
  })
  }

    /* 
    Llama a las validaciones y pregunta si las dos contraseñas ingresadas coinciden, 
    en caso de hacerlo cambia la contraseña de un funcionario 
  */
    cambiarContra(): void {
      // Puntos de carga
      Notiflix.Loading.dots({
        backgroundColor: 'rgba(0,0,0,0.1)',
        svgSize: '100px',
      })
      if(!this.validacionesCCF()){
        // Remover los puntos de carga
        Notiflix.Loading.remove()
        return
      }
      this.cargarContras()
      if(this.contra1 != this.contra2){
        // Remover los puntos de carga
        Notiflix.Loading.remove()
        Swal.fire({
          title: 'Error al modificar la contraseña',
          text: 'Las contraseñas ingresadas no coinciden',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
        return
      }
      else {
        // Cargando al funcionario con el id y contraseña ya validadas para permitir el cambio
        this.cargarFuncionarioContraNueva()
        this.service.cambiarContraFunc(this.funcionarioPojo)
        .subscribe({
          next: () => {
            // Remover los puntos de carga
            Notiflix.Loading.remove()

            // Desplegar pop-up
            Swal.fire({
              title: '¡Contraseña modificada con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            })
            this.ngOnInit()
            this.resetFormCCF()
            this.closePswrdFunc()
          },
          error: () => {
            // Remover los puntos de carga
            Notiflix.Loading.remove()

            // Desplegar pop-up
            Swal.fire({
              title: 'Error al modificar la contraseña',
              text:  'Por favor, inténtelo nuevamente',
              icon:  'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            })
          }
        })
      }
    }

  // Verifica que no exista una Área con el mismo numero de Área que se le está asignando al Área nueva 
  validarNumeroArea(numArea: number) : boolean {
    let numAreaDuplicado = false

    this.areas.forEach(a => {
      // TODO: Este parseo a la variable numArea es necesario para que funcione, pero no debería de serlo
      if(a.numArea === Number(numArea)) {
        numAreaDuplicado = true
      }
    })
    return numAreaDuplicado
  }

  // Verifica que no exista un Departamento con el mismo numero de Departamento que se le está asignando al nuevo Departamento
  validarNumeroDepartamento(numDepa: number) : boolean {
    let numDepaDuplicado = false
    this.departamentos.forEach(d => {
      // TODO: Este parseo a la variable numDepa es necesario para que funcione, pero no debería de serlo
      if(d.numDepartamento === Number(numDepa)) {
        numDepaDuplicado = true
      }
    })
    return numDepaDuplicado
  }

  // Muestra el pop-up de agregar una nueva Área
   showArea(indexArea) : void {
    this.showModalArea = indexArea;
  }
  // Cerrar el pop-up de agregar una nuevo Área
  closeArea() : void {
    this.showModalArea = -1;
  }

  // Pop-up para agregar un nuevo Departamento 
  openModalDpto() : void {
    this.formModalDpto.showDpto();
   }

  // Muestra el pop-up de agregar un nuevo Departamento 
   showDpto(indexDpto) : void {
    this.showModalDpto = indexDpto;
  }
  // Cierra el pop-up de agregar un nuevo Departamento 
  closeDpto() : void {
    this.showModalDpto = -1;
  }

  //Pop-up agregar nuevo funcionario
  openModalAgrFunc() : void {
    this.formModalAgrFunc.showAgrFunc();
   }

  // Muestra el pop-up de agregar un nuevo Funcionario 
   showAgrFunc(indexAgrFunc) : void {
    this.showModalAgrFunc = indexAgrFunc;
  }

  // Cierra el pop-up de agregar un nuevo Funcionario
  closeAgrFunc() : void {
    this.showModalAgrFunc = -1;
  }

  //Pop-up para cambiarle la contrasena a un funcionario
  openModal() : void {
    this.formModalPswrdFunc.showPswrdFunc();
   }
  
  // Muestra el pop-up de Cambiar Constraseña de un Funcionario
  showPswrdFunc(indexPswrdFunc) : void {
    this.showModalPswrdFunc = indexPswrdFunc;
  }

  // Cierra el pop-up de Cambiar Constraseña de un Funcionario
  closePswrdFunc() : void {
    this.resetFormNFF()
    this.showModalPswrdFunc = -1;
  }

  // Setea el Departamento al nuevo Funcionario 
  setDepaFuncionario(numDepa: string) : void {
    this.nuevoFuncionario.numDepartamento = Number(numDepa)
  }

  // Setea el Area al nuevo Funcionario
  setAreaDepa(numArea: string) : void {
    this.nuevoDepa.numArea = Number(numArea)
  }

  /*----------------------------------------------------------------------------------
  
    Apartir de aqui solo hay validaciones de formualrios. Estas validaciones
    le avisan al usuario que hay espacios en blanco o que debe cumllir con un formato

  ----------------------------------------------------------------------------------*/

  // get del formulario NFF
  get f() { return this.funcionarioForm.controls; }

  //Ejecuta las validaciones de NFF
  validacionesNFF(): boolean {
    this.enviarNFF = true;
    // El formulario es inválido
    if (this.funcionarioForm.invalid) {
        return false;
    }
    else{
      return true;
    } 
  }

   // Limpia el formulario NFF
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

    if (this.nuevoFuncionario.suplente === "N") {
      this.nuevoFuncionario.encargado = "S"
    }
  }

  // un get del formulario NAF
  get naf() { return this.areaForm.controls; }

  //Ejecuta las validaciones de NAF
  validacionesNAF(): boolean {
    this.enviarNAF = true;
    // El formulario es invalido
    if (this.areaForm.invalid) {
        return false;
    }
    else{
      // El formulario está bien
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
        return false;
    }
    else{
      // El formulario está bien

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

  // Un get del formulario NDF
  get ccf() { return this.cambiarcontraForm.controls; }

  // Ejecuta las validaciones de NDF
  validacionesCCF(): boolean {
    this.enviarCCF = true;
    // El formulario es invalido
    if (this.cambiarcontraForm.invalid) {
        return false;
    }
    else{
    // El formulario es correcto
      return true;
    } 
  }

  // Limpia el formulario NDF
  resetFormCCF() : void {
    this.enviarCCF = false;
    this.cambiarcontraForm.reset();
  }


  cargarContras() : void {
    // Funcionario
    this.idFunc = this.cambiarcontraForm.get('idfuncionario')?.value;
    // Contraseña 1
    this.contra1 = this.cambiarcontraForm.get('contrauno')?.value;
    // Contraseña 2
    this.contra2 = this.cambiarcontraForm.get('contrados')?.value;
  }

  // Cambia la clave del funcionario
  cargarFuncionarioContraNueva() : void {
    this.funcionarioPojo.idFuncionario = this.idFunc
    this.funcionarioPojo.contrasenna = this.contra1
  }
}