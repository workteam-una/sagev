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

  citasDisponibles: Cita[] = []
  citasDisponiblesReagenda: Cita[] = []
  citaReagendada: Cita
  // fechaCitaString: string = ''
  // horaCitaFormateada: string = ''

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getCitasFuncionario(this.modeloFuncionario.idFuncionario)
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
    // Para evitar que se dupliquen al abrir y cerrar el pop-up de reagenda
    this.citasDisponibles = []
    this.citasDisponiblesReagenda = []

    this.service.getCitasFuncionario(id)
    .subscribe(data => {
      this.citasFuncionario = data

      // Se están parseando las fechas aquí para solo tener que hacerlo una vez
      this.citasFuncionario.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
      
      // Tener esto aquí fue la única manera que encontré para que carguen primero las citas reservadas
      this.citasSemanaActual()
      this.citasSemanaSiguiente()
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
    if (estado === "reagendada") {
      this.service.actualizarEstadoReagendada(this.idCitaSeleccionada)
    .subscribe(data => {
      // alert("Estado de cita actualizado a ausente con exito!")
      this.ngOnInit();
    })
    }
  }

  cargarCitaReagendada(cita: Cita) {
    this.citaReagendada = cita
    // this.citaReagendada.detalle = ''
  }

  // Este metodo recibe la fecha en el combobox y filtra las horas disponibles
  // filtrarHorasDisponibles(fecha: string) {
  //   console.log("Línea 116: " + fecha)
  //   this.citasDisponibles.forEach((c) => {
  //     if(c.fecha.toString() === fecha)
  //       this.horasDisponibles.push
  //       (c.fecha.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'}))
  //   })

  //   console.log(this.horasDisponibles)
  // }

  guardarCita(cita: Cita) : void {

    // Aqui se tiene que setear el estado de la cita en "reagendada"

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

  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------


  devolverLunesSemanaActual() : Date {
    let fechaLunes = new Date() //Fecha del lunes de la semana actual
    let hoy = new Date().getDay() //Dia de la semana actual

    if( hoy === 2 ){ fechaLunes.setDate(fechaLunes.getDate() - 1); return fechaLunes }
    if( hoy === 3 ){ fechaLunes.setDate(fechaLunes.getDate() - 2); return fechaLunes }
    if( hoy === 4 ){ fechaLunes.setDate(fechaLunes.getDate() - 3); return fechaLunes }
    if( hoy === 5 ){ fechaLunes.setDate(fechaLunes.getDate() - 4); return fechaLunes }
    if( hoy === 6 ){ fechaLunes.setDate(fechaLunes.getDate() - 5); return fechaLunes }
    if( hoy === 0 ){ fechaLunes.setDate(fechaLunes.getDate() + 1); return fechaLunes }

    //Hoy es Lunes
    return fechaLunes
  }

  /* 
    Este metodo devuelve la fecha exacta en la cual se va a realizar la cita disponible
    El primer parametro es el atributo de tipo Date que retorna el metodo devolverLunesSemanaActual()
    Al tener el lunes, lo comparo con el atributo "dia" proveniente de Horario, para encontrar la fecha
    del dia de la cita comienzo a sumar dias partiendo desde el dia lunes
  */
  obtenerFechaDiaSemana(diaCita: String): Date {

    let lunesSemanaActual: Date = this.devolverLunesSemanaActual()

    //Martes
    if( diaCita === "Martes" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 1);
      return lunesSemanaActual
    }
    //Miercoles
    if( diaCita === "Miercoles" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 2);
      return lunesSemanaActual;
    }
    //Jueves
    if( diaCita === "Jueves" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 3)
      return lunesSemanaActual
    }
    //Viernes
    if( diaCita === "Viernes" )
    {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 4)
      return lunesSemanaActual
    }
    //Sabado
    if( diaCita === "Sabado" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 5)
      return lunesSemanaActual
    }
    //Domingo
    if( diaCita === "Domingo" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 6)
      return lunesSemanaActual
    }

    //Hoy es Lunes
    return lunesSemanaActual
  }

  // Esta función genera las citas de cada funcionario según un horario fijo
  generaCitasDisponibles(): void {

    // this.contadorCitasDisponibles = this.contadorCitasDisponibles + contadorParametros;

    // Martes de la semana actual a las 8:00 a.m
    let fechaMartesI = this.obtenerFechaDiaSemana("Martes")
    fechaMartesI.setHours(8, 0, 0)

    // Martes de la semana actual a las 12:00 m.d
    let fechaMartesF = this.obtenerFechaDiaSemana("Martes")
    fechaMartesF.setHours(12, 0, 0)

    // Jueves de la semana actual a la 1:00 p.m
    let fechaJuevesI = this.obtenerFechaDiaSemana("Jueves")
    fechaJuevesI.setHours(13, 0, 0)

    // Jueves de la semana actual a las 4:00 p.m
    let fechaJuevesF = this.obtenerFechaDiaSemana("Jueves")
    fechaJuevesF.setHours(16, 0, 0)

    // Genera citas disponibles los días martes de la semana actual
    for (let i = fechaMartesI; i < fechaMartesF; i.setMinutes(fechaMartesI.getMinutes() + 30)) {

      // Generando el objeto cita auxiliar
      let citaAux = new Cita()
      
      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, fecha, hora y del dia martes
      citaAux.idFuncionario = this.modeloFuncionario.idFuncionario
      citaAux.fecha = new Date(fechaMartesI)

      // Esta verificación es necesaria ya que en ocasiones al azar se crean citas que se exceden el límite de tiempo, concretamente a las 12 m.d
      if (citaAux.fecha.toLocaleTimeString() !== '12:00:00') {
        this.citasDisponibles.push(citaAux)
      }
      else {
        console.log("Cita ignorada: " + citaAux.fecha)
      }
    }

    //Genera citas disponibles los dias jueves de la semana actual
    for (let i = fechaJuevesI; i < fechaJuevesF; i.setMinutes(fechaJuevesI.getMinutes() + 30)) {
      
      // Generando el objeto cita auxiliar
      let citaAux: Cita = new Cita()

      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día jueves
      citaAux.idFuncionario = this.modeloFuncionario.idFuncionario
      citaAux.fecha = new Date(fechaJuevesI)
      
      // Pensé que había que hacer esta resta por el formato ISO que suma 6 horas, pero parece que no
      // citaAux.fecha.setHours(citaAux.fecha.getHours() - 6)

      // Esta verificación es necesaria ya que en ocasiones al azar se crean citas que se exceden el límite de tiempo, concretamente a las 4 p.m     
      if(citaAux.fecha.toLocaleTimeString() !== '16:00:00') {
        this.citasDisponibles.push(citaAux)
      }
      else {
        console.log("Cita ignorada: " + citaAux.fecha)
      }
    }
  }

  /*
    Filtra las citas disponibles para que muestre solo las que no han sido reservadas.
    Itera las citas disponibles y comparando su fecha una a una con las fechas de todas las citas rerservadas,
    en caso de coincidir, se elimina la posición donde se encuentra la cita disponible y se actualiza el array
  */
  filtrarCitasDisponibles(): void {

    // Se recorren los dos arrays de citas para comparar las fechas de las citas de ambos
    for (let i = 0; i < this.citasDisponibles.length; i++)
    {
      for (let j = 0; j < this.citasFuncionario.length; j++)
      {
        // Esta comparación entre fechas sí funciona, solo que se tiene que usar LocaleString y no el objeto fecha como tal
        if (this.citasDisponibles[i].fecha.toLocaleString() === this.citasFuncionario[j].fecha.toLocaleString()) {
          // Cuando un elemento del array de citasDispobles coincide con un elemento del array de citasReservadas
          // se elimina la posición del array donde se encontró la coincidencia con la hora y la fecha 
          this.citasDisponibles.splice(i, 1)
        }
      }
    }

    // Agregando las citas disponibles primero de la semana actual (citasSemanaActual) y luego agregando las citas de la semana siguiente (citasSemanaSiguiente)
    this.citasDisponibles.forEach((c) => {
      this.citasDisponiblesReagenda.push(c) 
    })
  }

  aumentarSemanasCitasDisponibles() : void {
    this.citasDisponibles.forEach(c => {
      c.fecha.setDate(c.fecha.getDate() + 7)
    })
  }

  devuelveDiaSemana(d: Date): String {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  // Generar las citas disponibles de la semana actual
  citasSemanaActual(): void {
    this.generaCitasDisponibles()
    this.filtrarCitasDisponibles()
  }

  // Generar las citas disponibles de la semana siguiente
  citasSemanaSiguiente(): void {
    this.citasDisponibles = []
    this.generaCitasDisponibles()
    this.aumentarSemanasCitasDisponibles()
    this.filtrarCitasDisponibles()
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