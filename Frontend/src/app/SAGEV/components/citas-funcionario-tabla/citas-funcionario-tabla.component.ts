import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-citas-funcionario-tabla',
  templateUrl: './citas-funcionario-tabla.component.html',
  styleUrls: ['./citas-funcionario-tabla.component.css']
})
export class CitasFuncionarioTablaComponent implements OnInit {

  formModal: any

  @Input() modeloFuncionario: Funcionario
  citasFuncionario: Cita[] = []
  idCitaSeleccionada: number
  //Esto fue una idea anterior, pero se desecho
  //citaSeleccionada: Cita = new Cita();

  citasDisponibles: Cita[] = []
  horasDisponibles: string[] = []
  citaReagendada: Cita
  // fechaCitaString: string = ''
  // horaCitaFormateada: string = ''

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    //console.log(this.modeloFuncionario)
    this.getCitasFuncionario(this.modeloFuncionario.idFuncionario)
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById("exampleModal")
    // );
  }

  //Mostrar el pop up
  showModalEstado: number = -1
  showModalReagenda: number = -1

  //Este metodo además de setear el valor de showModal para mostrar el popup
  //tambien va a setear el id de la cita seleccionada para poder cambiar su estado
  showEstado(index: number, id: number) : void{
    this.showModalEstado = index;
    //Aqui setea el id de la cita, convenientemente
    this.idCitaSeleccionada = id;
  }

  closeEstado() : void {
    this.showModalEstado = -1;
  }//Fin pop up

  showReagenda(index: number, id: number) : void{
    this.showModalReagenda = index;
    //Aqui setea el id de la cita, convenientemente
    this.idCitaSeleccionada = id;
  }

  closeReagenda() : void {
    this.showModalReagenda = -1;
    /* 
      Este init se tiene que poner porque como estoy usando ngModel en el textArea y este al inicio 
      está vacío entonces me modifica el valor de la cita de la lista a la que se está igualando y 
      muestra el campo vacio al cerrar el pop-up (bien raro). Entonces, al iniciar de nuevo el 
      componente no sale vacío el textarea, porque se vuelve a cargar el detalle original.

      Si se tuviese que evitar reiniciar el componente lo que se puede hacer es un método que me envíe el valor
      que se introdujo en el text-area y se setee en la cita nueva ahí, sin usar el ngModel básicamente. 
    */
    this.ngOnInit();
  }//Fin pop up

  getCitasFuncionario(id: String) : void {
    this.service.getCitasFuncionario(id)
    .subscribe(data => {
      this.citasFuncionario = data
      
      // Parseando la fecha de las citas a un formato que TS entiende
      this.citasFuncionario.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
    })

    this.citasFuncionario.forEach(c => {
      console.log(c)
    })
  }

  actualizarEstado(estado: String) : void {
    if (estado === "completada"){
      this.service.actualizarEstadoCompletada(this.idCitaSeleccionada)
      .subscribe(data => {
      alert("Estado de cita actualizado a completado con exito!")
      // Se vuelven a cargar todas las citas para que se actualice su estado en la tabla de citas,
      // del funcionario, lo malo de esto es que si son muchas citas puede llegar a ser mucha carga.
      this.ngOnInit();
    })
    }
    if (estado === "ausente") {
      this.service.actualizarEstadoAusente(this.idCitaSeleccionada)
    .subscribe(data => {
      alert("Estado de cita actualizado a ausente con exito!")
      this.ngOnInit();
    })
    }
  }

  cargarCitaReagendada(cita: Cita) {
    this.citaReagendada = cita
    this.citaReagendada.detalle = ''
  }

  // Este metodo recibe la fecha en el combobox y filtra las horas disponibles
  filtrarHorasDisponibles(fecha: string) {
    // este metodo esta recibiendo un string, pero siento que debería ser un Date más bien, de momento no tengo más opción

  }

  guardarCita(cita: Cita) : void {
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    cita.fecha.setHours(cita.fecha.getHours() - 6)
    this.service.guardarCita(cita)
    .subscribe(data => {
      alert("Se reagendó la cita con éxito")
      // Se debe actualizar la página para evitar sacar dos citas iguales
      window.location.reload()
      //this.router.navigate(["listar"]);
    })

    // this.resetForm()
  }

  // Convierte un objeto DateTime de SQL a un objeto Date de TS
  sqlToJsDate(sqlDate: any) : Date {

    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    let sqlDateArr1 = sqlDate.split("-")
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    let sYear = sqlDateArr1[0]
    let sMonth = (Number(sqlDateArr1[1]) - 1)
    let sqlDateArr2 = sqlDateArr1[2].split("T")
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    let sDay = sqlDateArr2[0]
    let sqlDateArr3 = sqlDateArr2[1].split(":")
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    let sHour = (sqlDateArr3[0])
    // let sHour = (Number(sqlDateArr3[0]) - 6)
    let sMinute = sqlDateArr3[1]
    let sqlDateArr4 = sqlDateArr3[2].split(".")
    //format of sqlDateArr4[] = ['ss','ms']
    let sSecond = sqlDateArr4[0]
    let sMillisecond = sqlDateArr4[1]

    return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond, sMillisecond)
  }
}