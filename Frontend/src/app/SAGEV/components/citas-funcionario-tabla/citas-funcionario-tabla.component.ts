import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';
import { Correo } from '../../modelo/correo';
import * as  Notiflix from 'notiflix';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-funcionario-tabla',
  templateUrl: './citas-funcionario-tabla.component.html',
  styleUrls: ['./citas-funcionario-tabla.component.css']
})
export class CitasFuncionarioTablaComponent implements OnInit {

  formModal: any

  // Modelo Funcionario tiene parte de la informacion del funcionario que hizo login
  @Input() modeloFuncionario: Funcionario
  // Citas pendientes del funcionario logeado
  citasFuncionario: Cita[] = []
  idCitaSeleccionada: number
  /* Genera una lista de citas disponibles*/
  citasDisponibles: Cita[] = []
  /* Citas Disponibles que el funcionario puede elegir para sustituir (reagendar) la cita 
     a la que no puede asistir */
  citasDisponiblesReagenda: Cita[] = []
  /* La cita que se selecciono desde la lista */
  citaReagendada: Cita

  // Esta es la cita que se selecciona para poder mostrar la información de ella en el correo de reagenda 
  citaOriginal: Cita = new Cita

  // Fecha del día de hoy para no mostrar las citas de la semana actual que "ya pasaron"
  fechaHoy: Date = new Date(Date.now())

  constructor(private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCitasTempFuncionario(this.modeloFuncionario.idFuncionario)
  }

  // Mostrar el pop up
  showModalEstado: number = -1
  showModalReagenda: number = -1

  // Este metodo además de setear el valor de showModal para mostrar el popup
  // tambien va a setear el id de la cita seleccionada para poder cambiar su estado
  showEstado(index: number, id: number): void {
    this.showModalEstado = index;
    //Aqui setea el id de la cita seleccionada
    this.idCitaSeleccionada = id;
  }

  // Cierra el pop-up
  closeEstado(): void {
    this.showModalEstado = -1;
  }

 // Muestra el pop-up para reagendar
  showReagenda(index: number, id: number): void {
    this.showModalReagenda = index;
    // Aqui setea el id de la cita seleccionada
    this.idCitaSeleccionada = id;
  }

  // Cierra el pop up de reagendar cita
  closeReagenda(): void {
    this.showModalReagenda = -1;
  }

  // Carga las citas pendientes del funcionario. Se llama "Temp" de temporal, porque solo carga las citas del ultimo mes.
  getCitasTempFuncionario(id: string): void {
    // Para evitar que se dupliquen al abrir y cerrar el pop-up de reagenda se limpian las listas
    this.citasDisponibles = []
    this.citasDisponiblesReagenda = []
    this.service.getCitasTempFuncionario(id)
      .subscribe(data => {
        this.citasFuncionario = data
        // Se están parsean las fechas de formato SQL a formato TypeScript
        this.citasFuncionario.forEach(c => {
          c.fecha = this.sqlToJsDate(c.fecha)
        })
        this.generaCitasDisponiblesReagenda()
      })
  }

  // Carga la cita original (la que va a ser reagendada) y la nueva cita (reagendada) con la cita que se seleccionó
  cargarCitaReagendadaOriginal(cita: Cita) : void {
    this.citaOriginal = this.deepCopy<Cita>(cita)
    this.citaReagendada = this.deepCopy<Cita>(cita)
  }

  // Setea la nueva fecha de la cita y el motivo de la reagenda
  modificarCitaReagendada(fecha: string, razon: string) : void {
    // Si se selecciona la opción por defecto en el select (combobox) con valor nulo, entonces lo notifica al funcionario
    if (fecha === '') {
      Swal.fire({
        title: 'Error al reagendar la cita',
        text: '¡Debe seleccionar una fecha válida!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    // Se setea el id en null para que no utilice el mismo id de la cita que se seleccionó para ser reagendada    
    this.citaReagendada.id = null
    // Limpiando la fecha para evitar problemas al reemplazarla más abajo
    this.citaReagendada.fecha = null
    // Como esta cita va a ser completamente nueva, con base en los datos anteriores debo reestablecer el valor del estado
    this.citaReagendada.estado = 'Pendiente'
    this.citaReagendada.fecha = new Date(fecha)
    // Si la Razón de la reagenda de la cita está vacía agregue el texto "sin especificar"
    if(razon !== undefined && razon !== ''){
      this.citaReagendada.razonReagenda = razon
    }
    else {
      this.citaReagendada.razonReagenda = "Sin especificar"
    }
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    this.citaReagendada.fecha.setHours(this.citaReagendada.fecha.getHours() - 6)
    // Si la cita se genera con los milisegundos en .000 entonces al recuperarla de la base de datos lo hace con un formato inválido
    this.citaReagendada.fecha.setMilliseconds(this.citaReagendada.fecha.getMilliseconds() + 10)

    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })
    // Una vez seteados los datos de la cita reagendada se procede a guardarlos en ambas tablas y cambiar su estado
    this.guardarCitaTemp()
    Notiflix.Loading.remove();
  }

  // Guardar las citas reagendadas en tabla temporal de citas
  guardarCitaTemp(): void {
    this.service.guardarCitaTemp(this.citaReagendada)
      .subscribe(data => {
        this.guardarCita()
        this.closeReagenda()
      })
  }

  // Guardar las citas reagendadas en tabla histórica de citas
  guardarCita(): void {
    this.service.guardarCita(this.citaReagendada)
      .subscribe(data => {
        this.actualizarEstado("reagendada")
      })
  }

  // Acutaliza el estado de una cita seleccionada
  actualizarEstado(estado: string): void {
    if (estado === "completada") {
      this.service.actualizarEstadoCompletadaTemp(this.idCitaSeleccionada)
        .subscribe(data => {
          Swal.fire({
            title: '¡Cambio de estado exitoso!',
            text: 'La cita ha cambiado su estado a "completada"',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          })
          this.ngOnInit()
          this.closeEstado()
        })
    }
    if (estado === "ausente") {
      this.service.actualizarEstadoAusenteTemp(this.idCitaSeleccionada)
        .subscribe(data => {
          Swal.fire({
            title: '¡Cambio de estado exitoso!',
            text: 'La cita ha cambiado su estado a "ausente"',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          })
          this.ngOnInit()
          this.closeEstado()
        })
    }
    if (estado === "reagendada") {
      this.service.actualizarEstadoReagendadaTemp(this.idCitaSeleccionada)
        .subscribe(data => {
          Swal.fire({
            title: '¡Cita reagendada con éxito!',
            text: 'Los detalles de la reagenda serán enviados al contribuyente vía correo electrónico',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          })
          this.enviarCorreo(this.citaOriginal, this.citaReagendada)
          this.ngOnInit()
        })
    }
  }

  // Envia un correo al contribuyente, avisando que su cita a sido reagendada por el funcionario
  enviarCorreo(citaOriginal: Cita, citaReagendada: Cita) : void {
    let correo: Correo = new Correo
    // Se tiene que hacer este incremento por el decremento realizado en el método de guardarCita() 
    citaReagendada.fecha.setHours(citaReagendada.fecha.getHours() + 6)
    correo.to = citaOriginal.correoContribuyente
    correo.subject = "Reagenda de su cita en la Municipalidad de Santo Domingo"
    correo.message = "Estimado/a " + this.citaOriginal.nombreContribuyente + "\n\n" + "Le informamos que su cita programada para el " + this.devuelveDiaSemana(citaOriginal.fecha) + " "
    + citaOriginal.fecha.getDate() + " de " + this.devuelveMes(citaOriginal.fecha) + " a las " + citaOriginal.fecha.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) 
    + " ha sido reagendada por el funcionario a cargo.\nAhora la cita se encuentra programada para el día " + this.devuelveDiaSemana(citaReagendada.fecha) + " " + citaReagendada.fecha.getDate() + " de " + this.devuelveMes(citaReagendada.fecha) 
    + " a las " + citaReagendada.fecha.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ".\n\nLa razón de la reagenda es: " + citaReagendada.razonReagenda
    + "\n\n" + "En caso de no poder presentarse, favor cancelar su cita y agendar una nueva que se acomode a su conveniencia. De antemano, le pedimos disculpas por cualquier inconveniente causado."
    this.service.enviaCorreo(correo)
      .subscribe(data => {
        
      })
  }

  // Con base en un objeto tipo "Date" devuelvo un string con el nombre en español de ese día
  devuelveDiaSemana(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  // Con base en un objeto tipo "Date" devuelvo un string con el nombre en español de ese mes
  devuelveMes(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let mes = meses[d.getMonth()]
    return mes
  }

  // ---------------------------------------------------------------------------------------------------------------
  // ------------------------ Estos metodos son los mismos de reserva.component.ts ---------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  
  // La función siempre va a devolver la fecha del lunes de la semana actual haciendo el cálculo con base en la fecha actual
  devolverLunesSemanaActual(): Date {
    let fechaLunes = new Date() //Fecha del lunes de la semana actual
    let hoy = new Date().getDay() //Dia de la semana actual

    if (hoy === 2) { fechaLunes.setDate(fechaLunes.getDate() - 1); return fechaLunes }
    if (hoy === 3) { fechaLunes.setDate(fechaLunes.getDate() - 2); return fechaLunes }
    if (hoy === 4) { fechaLunes.setDate(fechaLunes.getDate() - 3); return fechaLunes }
    if (hoy === 5) { fechaLunes.setDate(fechaLunes.getDate() - 4); return fechaLunes }
    if (hoy === 6) { fechaLunes.setDate(fechaLunes.getDate() - 5); return fechaLunes }
    if (hoy === 0) { fechaLunes.setDate(fechaLunes.getDate() + 1); return fechaLunes }

    //Hoy es Lunes
    return fechaLunes
  }

  /* 
    Este metodo devuelve la fecha exacta en la cual se va a realizar la cita disponible
    El primer parametro es el atributo de tipo Date que retorna el metodo devolverLunesSemanaActual()
    Al tener el lunes, lo comparo con el atributo "dia" proveniente de Horario, para encontrar la fecha
    del dia de la cita comienzo a sumar dias partiendo desde el dia lunes
  */
  obtenerFechaDiaSemana(diaCita: string): Date {

    let lunesSemanaActual: Date = this.devolverLunesSemanaActual()

    //Martes
    if (diaCita === "Martes") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 1);
      return lunesSemanaActual
    }
    //Miercoles
    if (diaCita === "Miercoles") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 2);
      return lunesSemanaActual;
    }
    //Jueves
    if (diaCita === "Jueves") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 3)
      return lunesSemanaActual
    }
    //Viernes
    if (diaCita === "Viernes") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 4)
      return lunesSemanaActual
    }
    //Sabado
    if (diaCita === "Sabado") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 5)
      return lunesSemanaActual
    }
    //Domingo
    if (diaCita === "Domingo") {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 6)
      return lunesSemanaActual
    }

    //Hoy es Lunes
    return lunesSemanaActual
  }

   // Esta función genera las citas de cada funcionario según un horario fijo (martes de 8:00 a 11:30 y jueves de 1:00 a 3:30)
  generaCitasDisponibles(aumentoDias: number): void {

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
        // Aumentando la cantidad de días según el parámetro (0 - ninguno / semana actual | 7 - una semana / semana siguiente)
        citaAux.fecha.setDate(citaAux.fecha.getDate() + aumentoDias)
        this.citasDisponibles.push(citaAux)
      }
    }

    //Genera citas disponibles los dias jueves de la semana actual
    for (let i = fechaJuevesI; i < fechaJuevesF; i.setMinutes(fechaJuevesI.getMinutes() + 30)) {

      // Generando el objeto cita auxiliar
      let citaAux: Cita = new Cita()

      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día jueves
      citaAux.idFuncionario = this.modeloFuncionario.idFuncionario
      citaAux.fecha = new Date(fechaJuevesI)

      // Esta verificación es necesaria ya que en ocasiones al azar se crean citas que se exceden el límite de tiempo, concretamente a las 4 p.m     
      if (citaAux.fecha.toLocaleTimeString() !== '16:00:00') {
        // Aumentando la cantidad de días según el parámetro (0 - ninguno / semana actual | 7 - una semana / semana siguiente)
        citaAux.fecha.setDate(citaAux.fecha.getDate() + aumentoDias)
        this.citasDisponibles.push(citaAux)
      }
    }
  }

 /*
    Filtra las citas disponibles para que muestre solo las que no han sido reservadas. 
    Itera las citas disponibles y va comparando su fecha una a una con las fechas de todas las citas reservadas. 
    En caso de coincidir, se elimina la posición donde se encuentra la cita disponible y se actualiza el array.
    Dentro de la comparativa se consulta si el estado de la cita es "cancelada", de serlo, la posición de esa cita no se elimina.
  */
  filtrarCitasDisponibles(): void {
    // Se recorren los dos arrays de citas para comparar las fechas de las citas de ambos
    for (let i = 0; i < this.citasDisponibles.length; i++) {
      for (let j = 0; j < this.citasFuncionario.length; j++) {
        // Esta comparación entre fechas sí funciona, solo que se tiene que usar LocaleString y no el objeto fecha como tal
        if (this.citasDisponibles[i].fecha.toLocaleString() === this.citasFuncionario[j].fecha.toLocaleString()) {
          // Cuando un elemento del array de citasDispobles coincide con un elemento del array de citasReservadas
          // se elimina la posición del array donde se encontró la coincidencia con la hora y la fecha 
          this.citasDisponibles.splice(i, 1)
        }
      }
    }

    // Agregando las citas disponibles ya filtradas al array de las citas disponibles que se van a desplegar en la reagenda
    this.citasDisponibles.forEach((c) => {
      this.citasDisponiblesReagenda.push(c)
    })

    // Removiendo las citas de la semana que son anteriores al día actual
    this.citasDisponiblesReagenda = this.citasDisponiblesReagenda.filter(c => c.fecha > this.fechaHoy)
  }

  // Generar las citas disponibles de la semana siguiente
  generaCitasDisponiblesReagenda(): void {
    this.citasDisponibles = []
    // Creo las citas disponibles de la semana actual
    this.generaCitasDisponibles(0)
    // Agrego las citas dispinibles de la semana siguiente
    this.generaCitasDisponibles(7)
    // Filtro todas esas citas con las citas reservadas
    this.filtrarCitasDisponibles()
  }

  // Convierte un objeto DateTime de SQL a un objeto Date de TS
  sqlToJsDate(sqlDate: any): Date {

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

  // Copiar un objeto a profundidad para obtener todos los valores sin afectar al objeto original
  deepCopy<T>(instance : T) : T {
    if (instance == null){
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Array types
    if (instance instanceof Array){
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value)  => {cloneArr.push(value)});
        // for nested objects
        return cloneArr.map((value: any) => this.deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = { ...(instance as { [key: string]: any }
        ) } as { [key: string]: any };
        for (var attr in instance) {
            if ( (instance as Object).hasOwnProperty(attr)) 
                copyInstance[attr] = this.deepCopy<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
}
}