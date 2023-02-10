import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-reserva-tabla',
  templateUrl: './reserva-tabla.component.html',
  styleUrls: ['./reserva-tabla.component.css']
})
export class ReservaTablaComponent implements OnInit {

  @Input() funcionarioEncargado: Funcionario
  citaPadre: Cita = new Cita()
  fechaCitaString: String

  //9 de Febrero
  fechaPrueba: String = new Date().toLocaleString('en-US', {hour12: false})
  citasDisponibles: Cita[] = []

  constructor() { }

  seleccionado = true; //Creo que esto esta al revez XD
  status = 'Reserva';

  ngOnInit(): void {
    this.generaCitas();
  }

  seleccionar(): void {
    this.seleccionado = !this.seleccionado
    this.status = this.seleccionado ? 'Reserva' : 'Seleccionada'
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

  // La idea de este método era asignarle una fecha, hora y id del funcionario a la cita
  cargarCitaPadre(): void {
    this.citaPadre.fecha = new Date();
    console.log("Linea 50 en reserva-tabla: " + this.citaPadre.fecha)
    this.citaPadre.hora = "9:30"
    this.citaPadre.idFuncionario = this.funcionarioEncargado.idFuncionario
    this.fechaCitaString = this.citaPadre.fecha.toLocaleDateString()
    console.log("Linea 54 en reserva-tabla: " + this.fechaCitaString)
    console.log("Linea 55 en reserva-tabla: " + this.citaPadre.idFuncionario)
  }

  devolverLunesSemanaActual() : Date{
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

  //Este metodo devuelve la fecha exacta en la cual se va a realizar la cita disponible
  //El primer parametro es el atributo de tipo Date que retorna el metodo devolverLunesSemanaActual()
  //Al tener el lunes, lo comparo con el atributo "dia" proveniente de Horario, para encontrar la fecha
  //del dia de la cita comienzo a sumar dias partiendo desde el dia lunes
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
      
      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día martes
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = fechaMartesI
      citaAux.hora = fechaMartesI.toLocaleTimeString('en-US', {hour12: true})

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
      citaAux.hora = fechaJuevesI.toLocaleTimeString('en-US', {hour12: true})
      
      this.citasDisponibles.push(citaAux)
      // console.log(diaSemana[fechaMetodoPruebaJuevesI.getDay()] + " " + fechaMetodoPruebaJuevesI.toLocaleTimeString('en-US', {hour12: true}))
    }

    this.citasDisponibles.forEach(c => {
      console.log(c.fecha.toString() + " " + c.hora + " ID_F:" + c.idFuncionario);
    })
  }

  devuelveDiaSemana(d: Date): String {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }
}
