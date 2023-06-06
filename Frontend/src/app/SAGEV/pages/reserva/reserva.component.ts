import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Area } from '../../modelo/area';
import { Cita } from '../../modelo/cita';
import { Departamento } from '../../modelo/departamento';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  areas: Area[] = []
  departamentos: Departamento[] = []
  funcionarios: Funcionario[] = []

  departamentosPorArea: Departamento [] = []
  descripcionesPorDepa: Departamento[] = []
  funcionariosEncargadosPorDepa: Funcionario[] = []

  // Array para cargar las citas reservadas de un funcionario en específico
  citasReservadas: Cita[] = []

  // Array para cargar las citas que se muestran en la tabla (las que no han sido reservadas)
  citasDisponibles: Cita[] = []

  // Almacena al funcionario con el que se va a agendar la cita
  funcionarioEncargado: Funcionario = new Funcionario

  // Almacena el estado de los botones de "anterior y siguiente" que aparecen debajo de la tabla
  mostrarBtns: number = -1;

  // Funcioan para limitar la cantidad de citas que se le pueden desplegar al contribuyente
  contadorSemanas: number = 0;

  // Almacena la fecha del día de hoy para no mostrar las citas de la semana anteriores al día actual
  fechaHoy: Date = new Date(Date.now())

  constructor(private service: ServiceService,  private cd: ChangeDetectorRef) {
   
  }

  // Al iniciar el componente carga los arrays de Areas, Departamentos y Funcionarios
  ngOnInit(): void {
    // Limpia el local storage ya que al iniciar sesión la información del contribuyente se almacena ahí
    localStorage.clear()
    
    this.service.getAreas()
    .subscribe({
      next: (data) => {  
        this.areas = data
      }
    })
    
    this.service.getDepartamentos()
    .subscribe({
      next: (data) => {
        this.departamentos = data
      }
    } )

    this.service.getFuncionarios()
    .subscribe({
      next: (data) => {
      this.funcionarios = data
    }})
  }

  filtrarDepartamentosPorArea(numAreaParam: string) : void {
    this.departamentosPorArea = this.departamentos.filter(
      (d) => d.numArea === Number(numAreaParam) 
    )
  }

  filtrarFuncionariosEncargadosPorDepa(numDepartamentoParam: string) : void {
    this.funcionariosEncargadosPorDepa = this.funcionarios.filter( 
      (f) => f.numDepartamento === Number(numDepartamentoParam) && f.encargado === "S" 
    )

    //Se debe verificar si la lista filtrada es vacía antes de realizar la asignación
    if (this.funcionariosEncargadosPorDepa.length !== 0){
      //Seteando al funcionario encargado que se va a encontrar en la posición 0
      this.funcionarioEncargado = this.funcionariosEncargadosPorDepa[0]
    }
  }

  filtrarDescripcionesPorDepa(numDepaParam: string) : void {
    this.descripcionesPorDepa = this.departamentos.filter(
      // Por alguna razón se debe parsear el numero del departamento a "Number" para que permita la comparativa
      (d) => d.numDepartamento === Number(numDepaParam) 
    )
  }

  // Obtiene las citas reservadas de un funcionario en específico a través de su identificación
  getCitasReservadas(id: string): void {
    // Las citas se tienen que limpiar porque si no se van acumulando cada vez que cambio de departamento (se activa este método)
    this.citasReservadas = []
    this.citasDisponibles = []

    // Recuperar las citas de la tabla de citas temporales
    this.service.getCitasTempFuncionario(id)
    .subscribe({
      next: (data) => {
      this.citasReservadas = data

      // Se están parseando las fechas aquí para solo tener que hacerlo una vez
      this.citasReservadas.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
      
      // Llamar este método aquí es necesario para que carguen primero las citas reservadas
      this.citasSemanaActual()
    }
  })
  }

  // La función siempre va a devolver la fecha del lunes de la semana actual haciendo el cálculo con base en la fecha actual
  devolverLunesSemanaActual() : Date {
    let fechaLunes = new Date() // Fecha del lunes de la semana actual
    let hoy = new Date().getDay() // Dia de la semana actual

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
  obtenerFechaDiaSemana(diaCita: string): Date {

    let lunesSemanaActual: Date = this.devolverLunesSemanaActual()

    // Martes
    if( diaCita === "Martes" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 1);
      return lunesSemanaActual
    }
    // Miercoles
    if( diaCita === "Miercoles" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 2);
      return lunesSemanaActual;
    }
    // Jueves
    if( diaCita === "Jueves" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 3)
      return lunesSemanaActual
    }
    // Viernes
    if( diaCita === "Viernes" )
    {
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 4)
      return lunesSemanaActual
    }
    // Sabado
    if( diaCita === "Sabado" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 5)
      return lunesSemanaActual
    }
    // Domingo
    if( diaCita === "Domingo" ){
      lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 6)
      return lunesSemanaActual
    }

    // Hoy es Lunes
    return lunesSemanaActual
  }

  // Esta función genera las citas de cada funcionario según un horario fijo (martes de 8:00 a 11:30 y jueves de 1:00 a 3:30)
  generaCitasDisponibles(): void {

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

      // Generando un objeto cita auxiliar
      let citaAux = new Cita()
      
      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, fecha, hora y del dia martes
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = new Date(fechaMartesI)

      // Esta verificación es necesaria ya que en ocasiones al azar se crean citas que se exceden el límite de tiempo, concretamente a las 12 m.d
      if (citaAux.fecha.toLocaleTimeString() !== '12:00:00') {
        this.citasDisponibles.push(citaAux)
      }
    }

    //Genera citas disponibles los dias jueves de la semana actual
    for (let i = fechaJuevesI; i < fechaJuevesF; i.setMinutes(fechaJuevesI.getMinutes() + 30)) {
      
      // Generando el objeto cita auxiliar
      let citaAux: Cita = new Cita()

      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día jueves
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = new Date(fechaJuevesI)

      // Esta verificación es necesaria ya que en ocasiones al azar se crean citas que se exceden el límite de tiempo, concretamente a las 4 p.m     
      if(citaAux.fecha.toLocaleTimeString() !== '16:00:00') {
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
    for (let i = 0; i < this.citasDisponibles.length; i++)
    {
      for (let j = 0; j < this.citasReservadas.length; j++)
      {
        // Esta comparación entre fechas sí funciona, solo que se tiene que usar LocaleString y no el objeto fecha como tal
        if (this.citasDisponibles[i].fecha.toLocaleString() === this.citasReservadas[j].fecha.toLocaleString() && this.citasReservadas[j].estado !== 'Cancelada') {

          // Cuando un elemento del array "citasDisponibles" coincide con un elemento del array "citasReservadas"
          // se elimina la posición del array donde se encontró la coincidencia con la hora y la fecha 
          this.citasDisponibles.splice(i, 1)
        }
      }
    }

    /* 
      Filtrando las citas para eliminar las que tienen fechas anteriores al día actual dentro de la misma semana
      ej. Si hoy es martes a las 7:00 p.m y habian citas en la mañana, no me las va a mostrar
      ej 2. Si hoy es jueves no me va a mostrar las citas del martes de esta semana
      ej 3. Si hoy es domingo no me va a mostrar ninguna cita disponible
    */
    this.citasDisponibles = this.citasDisponibles.filter(c => c.fecha > this.fechaHoy)

  }

  // Con base en un objeto tipo "Date" devuelvo un string con el nombre en español de ese día
  devuelveDiaSemana(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  // Recibe el aviso desde el componente "reserva-tabla" de que ya puedo mostrar los botones anterior y siguiente
  recibirMostrarBotones(mostrar: number) : void {
    this.mostrarBtns = mostrar;
    this.cd.detectChanges();
  }

  /*
    Al presionar el botón "siguiente" debajo de la tabla de citas disponibles se va a incrementar en una semana la fecha 
    de las citas, con un límite (modificable) de una semana para mostrar las citas disponibles de la próxima semana. 
  */
  aumentarSemanasCitasDisponibles(contParam: number) : void {
    // Incrementando en 1 el contador de semanas (porque siempre le va a llegar un "+1" por parámetro)
    this.contadorSemanas += contParam

    // Cuando el contador de semanas supera el valor de 1 (citas de hasta 1 semana después) entonces lo decrementa en 1 y se sale del método
    if (this.contadorSemanas > 1) {
      this.contadorSemanas - 1
      return
    }

    /*
      Se multiplica el número 7 (que representa una semana), según el valor del contador. Al inicio el contador es 0, pero al entrar a este 
      método aumenta en 1, entonces se multiplicaría 7 * 1 = 7, es decir, se suma una semana. La próxima vez que se entre a este método, 
      el contador sería 2, entonces se multiplicaría 7 * 2 = 14, es decir, se suman dos semanas. La última vez que se entre a este método
      antes de que se bloquee el uso del botón que lo ejecuta el contador sería 3, entonces se multiplicaría 7 * 3 = 21, es decir tres semanas.
      Las tres semanas son el tope que se está utilizando, pero es modificable, cambiando el contador y sus validaciones.
    */
    this.citasDisponibles.forEach(c => {
      c.fecha.setDate(c.fecha.getDate() + (7 * this.contadorSemanas))
    })
  }

  /* 
    Al presionar el botón "anterior" debajo de la tabla de citas disponibles se va a decrementar en una semana la fecha 
    de las citas, con la semana actual como límite.
  */  
  disminuirSemanasCitasDisponibles(contParam: number): void {

    // Decrementando en 1 el contador de semanas (porque siempre le va a llegar un "-1" por parámetro)
    this.contadorSemanas += contParam
    /*
      Recordar que este método se va a poder utilizar solo si previamente se ejecutó al menos una vez el método de "aumentarSemanasDisponibles".
      Como las citas disponibles se vacían y se vuelven a generar partiendo SIEMPRE de la semana actual, entonces la manera de "retroceder" semanas
      es sumando la cantidad de semanas que antes se habían aumentado restando una semana.
    */
    this.citasDisponibles.forEach(c => {
      c.fecha.setDate(c.fecha.getDate() + (7 * this.contadorSemanas))
    })
  }

  // Genera las citas disponibles de la semana actual
  citasSemanaActual(): void {
    this.generaCitasDisponibles()
    this.filtrarCitasDisponibles()
  }

  // Genera las citas disponibles de la semana siguiente
  citasSemanaSiguiente(): void {
    this.citasDisponibles = []
    this.generaCitasDisponibles()
    this.aumentarSemanasCitasDisponibles(1)
    this.filtrarCitasDisponibles()
  }

  // Genera las citas disponibles al retroceder una semana
  citasSemanaAnterior(): void {
    this.citasDisponibles = []
    this.generaCitasDisponibles()
    this.disminuirSemanasCitasDisponibles(-1)
    this.filtrarCitasDisponibles()
  }

  /* 
    El método se activa al cambiar de area o departamento para que al seleccionar 
    el nuevo funcionario las citas se encuentren partiendo de la semana actual
  */
  resetearContadorSemanas(): void {
    this.contadorSemanas = 0
  }

  /* 
    Como los botones de "anterior" y "siguiente" se muestran la primera vez que se carga el 
    componente reserva-tabla, al deseleccionar o cambiar un area seguían apareciendo los 
    botones, con este método, al deseleccionar o cambiar un area se establece el valor 
    en -1 a la variable "mostrarBtns" que hacía que se mostraran para que se oculten.
  */ 
  mostrarBotonesAnteriorSiguienteArea(): void {
      this.mostrarBtns = -1
  }

  /* 
    Como los botones de "anterior" y "siguiente" se muestran la primera vez que se carga el 
    componente reserva-tabla, al deseleccionar o cambiar un departamento seguían apareciendo los 
    botones, con este método, al deseleccionar o cambiar un departamento se establece el valor 
    en -1 a la variable "mostrarBtns" que hacía que se mostraran para que se oculten.
  */
  mostrarBotonesAnteriorSiguienteDepartamento(valorComboBox: string) : void {
    // Si el valor del area o departamento es vacío entonces oculte los botones
    if (valorComboBox === '') {
    this.mostrarBtns = -1
    }
  }

  // Si el funcionario suplente está como encargado inserta el texto "funcioario suplente" en el HTML
  mostrarTextoSuplente(suplente: string) : string {
    if(suplente === "S") {
      return " (funcionario suplente)"
    }
    else {
      return ""
    }
  }

  // Si el funcionario suplente está como encargado muestra un texto especial en el HTML
  mostrarAvisoSuplente(suplente: string) : boolean {
    if(suplente === "S") {
      return true
    }
    else {
      return false
    }
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