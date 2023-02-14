import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-reserva-tabla',
  templateUrl: './reserva-tabla.component.html',
  styleUrls: ['./reserva-tabla.component.css']
})
export class ReservaTablaComponent implements OnInit {

  constructor() { }

  @Input() funcionarioEncargado: Funcionario
  citaPadre: Cita = new Cita()

  // Para mostrar la fecha como un string 
  fechaCitaString: String

  // Para Mostrar la hora formateada en el formulario 
  horaCitaFormateada: String

  // Para mostrar el nombre del funcionario en el formulario 
  nombreFuncionario: String

  // Array para cargar las citas auxiliares que se muestran en la tabla
  citasDisponibles: Cita[] = []

  seleccionado = false; //Creo que esto esta al revez XD
  status = 'Reserva';

  botonEstilo = {'background-color': 'blue', 'value': 'seleccionado'};

  ngOnInit(): void {
    this.generaCitas();
  }

  botonEstiloCambiaColor(): void {
    this.botonEstilo["background-color"] = 'green'
  } 

  seleccionar(idCita: number): void {
    let boton = document.getElementById(idCita.toString());
    boton.classList.toggle("btnselect");
  }

  // citaPadre es la cita que se va a cargar con los datos reales que el usuario desee seleccionar
  // En este metodo citaPadre toma la hora y fecha de las citas disponibles que se generaron
  
  /*
    Comentario temporal:
    Creo que con estos seteos ya no es necesario hacer una citaHija, porque ya cita padre agarro lo que 
    quiso de cita monito, sin tener que agarrar su Id, es decir, cita padre queda con ID null, como debede ser
  */

  cargarCitaPadre(citaSelec: Cita): void {
    this.citaPadre.fecha = citaSelec.fecha;
    this.citaPadre.hora = citaSelec.hora;
    this.citaPadre.idFuncionario = this.funcionarioEncargado.idFuncionario

    // Estas igualaciones se podrían separar en otro método
    this.fechaCitaString = this.citaPadre.fecha.toLocaleDateString()
    this.horaCitaFormateada = this.citaPadre.hora
    this.nombreFuncionario = this.funcionarioEncargado.nombre + " " + this.funcionarioEncargado.apellido1 
  }

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
  obtenerFechaDiaSemana(diaCita: String) {

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
  generaCitas(): void {

    // Martes de la semana actual a las 8:00 a.m
    let fechaMartesI = this.obtenerFechaDiaSemana("Martes")
    fechaMartesI.setHours(8, 0, 0)

    // Martes de la semana actual a las 12:00 m.d
    let fechaMartesF = this.obtenerFechaDiaSemana("Martes")
    fechaMartesF.setHours(12, 0, 0)

    // Jueves de la semana actual a la 1:30 p.m
    let fechaJuevesI = this.obtenerFechaDiaSemana("Jueves")
    fechaJuevesI.setHours(13, 30, 0)

    // Jueves de la semana actual a las 4:00 p.m
    let fechaJuevesF = this.obtenerFechaDiaSemana("Jueves")
    fechaJuevesF.setHours(16, 0, 0)
    
    
    // Genera citas disponibles los días martes de la semana actual
    for (let i = fechaMartesI; i < fechaMartesF; i.setMinutes(fechaMartesI.getMinutes() + 30)) {

      // Generando el objeto cita auxiliar
      let citaAux = new Cita()
      
      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado,fecha, hora y del dia martes
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = fechaMartesI
      citaAux.hora = fechaMartesI.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})
      

      this.citasDisponibles.push(citaAux)
      // console.log(diaSemana[fechaMetodoPruebaMartesI.getDay()] + " " + fechaMetodoPruebaMartesI.toLocaleTimeString('en-US', {hour12: true}))
     
    }

    //Genera citas disponibles los dias jueves de la semana actual
    for (let i = fechaJuevesI; i < fechaJuevesF; i.setMinutes(fechaJuevesI.getMinutes() + 30)) {
      
      // Generando el objeto cita auxiliar
      let citaAux = new Cita()

      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día jueves
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = fechaJuevesI
      citaAux.hora = fechaJuevesI.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})


      this.citasDisponibles.push(citaAux)
      // console.log(diaSemana[fechaMetodoPruebaJuevesI.getDay()] + " " + fechaMetodoPruebaJuevesI.toLocaleTimeString('en-US', {hour12: true}))

    }

    // Mostrar la citas en consola

    // this.citasDisponibles.forEach(c => {
    //   console.log(c.fecha.toString() + " " + c.hora + " ID_F:" + c.idFuncionario);
    // })
  }

  devuelveDiaSemana(d: Date): String {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }
}

  // stringToDate(_date,_format,_delimiter)
  // {
  //   let formatLowerCase = _format.toLowerCase();
  //   let formatItems = formatLowerCase.split(_delimiter);
  //   let dateItems = _date.split(_delimiter);
  //   let monthIndex = formatItems.indexOf("mm");
  //   let dayIndex = formatItems.indexOf("dd");
  //   let yearIndex = formatItems.indexOf("yyyy");
  //   let month = parseInt(dateItems[monthIndex]);
  //   month -= 1;
  //   let formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
  //   return formatedDate;
  // }