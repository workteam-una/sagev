import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-funcionario',
  templateUrl: './citas-funcionario.component.html',
  styleUrls: ['./citas-funcionario.component.css']
})

export class CitasFuncionarioComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  // Pop-up de modificar el funcionario a cargo
  formModalModFunc: any

  funcionariosEncargadosPorDepa: Funcionario[] = []
  funcionarios: Funcionario[] = []

  modeloFuncionario: Funcionario = new Funcionario()

  showModalModFunc = -1;
  
  ngOnInit(): void {
    this.cargarFuncionario()
    this.cargarFuncionariosDepa()
  }

  // Cargar el modelo del funcionario con los datos almacenados en el local
  cargarFuncionario(): void {
    this.modeloFuncionario = JSON.parse(localStorage.getItem("modeloFuncionario") || "");

    /* 
      Utilizar el modelo del local storage limitaba el funcionamiento, ya que aunque yo refrescara la
      página o volviese a cargar el componente, no se actualizaba el estado de "encargado" del funcionario
      en el modelo solo se quedaba con el estado que tenía la primera vez que entró a la ventana. 
      Por eso, lo que se hace acá es utilizar el id del funcionario que inició sesión y traerlo desde la base
      de datos con el estado actualizado al refrescar la página o refrescar el componente.
    */
    this.service.getFuncionarioId(this.modeloFuncionario.idFuncionario)
    .subscribe(dataFunc => {
      this.modeloFuncionario = dataFunc
    })    
  }

  // Pop-up modificar funcionario a cargo
  openModalModFunc() : void {
    this.formModalModFunc.showModFunc();
  }

  showModFunc(indexModFunc) : void {
    this.showModalModFunc = indexModFunc;
  }

  closeModFunc() : void {
    this.showModalModFunc = -1;
  }

  filtrarFuncionariosEncargadosPorDepa(numDepartamentoParam: number) : void {
    // Obtiene todos los funcionarios en el departamento seleccionado del funcionario que inició sesión, sin incluirlo a él
    this.funcionariosEncargadosPorDepa = this.funcionarios.filter( 
      (f) => f.numDepartamento === numDepartamentoParam && f.idFuncionario !== this.modeloFuncionario.idFuncionario && f.administrador !== "S" 
    )
  }
  
  // Cargar los funcionarios por el departamento del funcionario en sesión
  cargarFuncionariosDepa() : void {
    this.service.getFuncionarios()
    .subscribe(dataFunc => {
      this.funcionarios = dataFunc
      this.filtrarFuncionariosEncargadosPorDepa(this.modeloFuncionario.numDepartamento)
    })    
  }

  /*
    Si devuelve true es porque el suplente que se recibe por parámetro no está como
    encargado, pero sí hay un funcionario suplente distinto que está como encargado.
    Si devuelve false es porque la primera condición que verifica si el suplente
    recibido por parámetro está como encargado retornó "false", lo que significa
    que el suplente que se recibe debe ser el único que está como encargado.
  */
  buscarOtroFuncionarioSuplenteEncargado(idSuplente: string) : boolean {
    let suplenteEncargado: boolean = false
    let suplenteDiferenteEncargado: boolean = false
    let resultado: boolean = false
    this.funcionariosEncargadosPorDepa.forEach(
      (f) => {
        // Si el suplente que recibe no está como encargado
        if(f.idFuncionario === idSuplente && f.encargado !== "S") {
          suplenteEncargado = true
        }
        // Si hay un funcionario encargado distinto del suplente
        if(f.idFuncionario !== idSuplente && f.encargado === "S") {
          suplenteDiferenteEncargado = true
        }
      }
    )
    // Si el suplente que recibe no está como encargado y si hay otro suplente como encargado
    if(suplenteEncargado && suplenteDiferenteEncargado) {
      resultado = true
    }
    return resultado;
  }

  // Asigna o desasigna como encargado a un funcionario suplente al desasignar o asignar al funcionario en sesión
  modificarFuncionarioEncargado(idSuplente: string) : void {
    // Si se selecciona la opción por defecto entonces salga de la función y no haga nada
    if (idSuplente === "") {
      return
    }
    /*
      Validación 1: El funcionario en sesión quiere asignar a un suplente como encargado. No necesita una validación más 
      para ver si existe un suplente que no esté a cargo, porque por como funcionan las cosas se da por hecho que el único 
      escenario en el que se puede acceder a esta validación es cuando no debe haber un funcionario suplente a cargo.
      Es decir, el valor del atributo "encargado" del suplente va a ser "N" y el del funcionario en sesión "S".
    */
    if (this.modeloFuncionario.encargado === 'S') {
      // Se actualiza el estado del funcionario suplente como 'S', es decir, queda como encargado
      this.service.actualizarEncargadoSi(idSuplente)
      .subscribe(data => {
        Swal.fire({
          title: '¡Funcionario suplente asignado como encargado con éxito!',
          text: 'Ahora las citas serán agendadas al suplente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
        // Se actualiza el estado del funcionario en sesión como 'N', es decir, ya NO queda como encargado
        this.service.actualizarEncargadoNo(this.modeloFuncionario.idFuncionario)
        .subscribe(data => {
          // Refrescando el componente para que se reflejen los cambios
          this.ngOnInit()
        })
      })
    }
    /*
      Validación 2: Si ya hay un funcionario suplente como encargado distinto al que estoy seleccionando, no me permite asignar 
      como encargado al suplente seleccionado, porque tendría dos suplentes encargados a la vez. Es importante que esta validación
      vaya antes de la Validación 3. Para este punto, el funcionario en sesión debe tener el atributo "encargado" en "N", entonces
      siempre aplicaría la Validación 2, lo que cambiaría el atributo del funcionario en sesión a "S" y no cambiando nada en los 
      suplentes, por lo que quedaría más de un funcionario como encargado.
    */ 
    if (this.buscarOtroFuncionarioSuplenteEncargado(idSuplente) === true) {
      Swal.fire({
        title: 'Error al modificar funcionario encargado',
        text: 'Ya existe un funcionario suplente asignado como encargado del departamento',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    /* 
      Validación 3: El funcionario en la sesión no está como encargado y quiere volver a serlo al desasignar como encargado al suplente. 
      No necesita una validación para ver si existe un suplente a cargo, porque por como funcionan las cosas, se da por hecho que el único 
      escenario en el que se puede acceder a esta validación es cuando previamente hay un suplente a cargo, ya que el atributo "encargado" 
      del funcionario en sesión es "N", el que solo puede estar así luego de la Validación 1, misma validación donde sí o sí se modifica
      el atributo de un funcionario suplente a "S", es decir, que queda un suplente como encargado.
    */
    if (this.modeloFuncionario.encargado === 'N') {
      // Se actualiza el estado del funcionario en sesión como 'S', es decir, queda como encargado
      this.service.actualizarEncargadoSi(this.modeloFuncionario.idFuncionario)
      .subscribe(data => {
        Swal.fire({
          title: '¡Usted ha sido asignado como encargado con éxito!',
          text: 'Ahora las citas le serán agendadas a usted',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
        // Se actualiza el estado del funcionario suplente como 'N', es decir, ya NO queda como encargado
        this.service.actualizarEncargadoNo(idSuplente)
        .subscribe(data => {
          // Refrescando el componente para que se reflejen los cambios
          this.ngOnInit()
        })
      })
    }
  }

  // Dependiendo del estado de la variable "encargado" de los funcionarios suplentes, 
  // añade el texto "asignar" o "desasignar" en el pop-up de modificar funciario a cargo
  mostrarEncargado(encargado: string) : string {
    let texto = '';
    if (encargado === 'S') {
      texto = ' (desasignar)'
    }
    else {
      texto = ' (asignar)'
    }
    return texto
  }
}