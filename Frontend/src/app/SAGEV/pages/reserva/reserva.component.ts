import { getLocaleDateFormat } from '@angular/common';
import { Component, ContentChild, ContentChildren, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  // @ContentChild('sA')
  // prueba: ElementRef;

  // @ViewChild('username')
  // username: ElementRef<HTMLInputElement>; 

  areas: Area[] = []
  departamentos: Departamento[] = []
  departamentosPorArea: Departamento [] = []
  funcionarios: Funcionario[] = []
  funcionariosEncargadosPorDepa: Funcionario[] = []
  descripcionesPorDepa: Departamento[] = []

  funcionarioEncargado: Funcionario = new Funcionario

  // Array para cargar las citas reservadas de un funcionario en específico
  citasReservadas: Cita[] = []
  // Array para cargar las citas auxiliares que se muestran en la tabla
  citasDisponibles: Cita[] = []

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    localStorage.clear()
    
    this.service.getAreas()
    .subscribe(dataArea => {
      this.areas = dataArea
    })
    
    this.service.getDepartamentos()
    .subscribe(dataDep => {
      this.departamentos = dataDep
    })

    this.service.getFuncionarios()
    .subscribe(dataFunc => {
      this.funcionarios = dataFunc
    })
  }

  // prueba($event) {
  //   console.log($event.target.value)
  // }

  filtrarDepartamentosPorArea(numAreaParam: String) {
    this.departamentosPorArea = this.departamentos.filter(
      (d) => d.numArea === Number(numAreaParam) 
    )
  }

  filtrarFuncionariosEncargadosPorDepa(numDepartamentoParam: String) {
    this.funcionariosEncargadosPorDepa = this.funcionarios.filter( 
      (f) => f.numDepartamento === Number(numDepartamentoParam) && f.encargado === "S" 
    )

    //Se debe verificar si la lista filtrada es vacía antes de realizar la asignación
    if (this.funcionariosEncargadosPorDepa.length !== 0){
      //Seteando al funcionario encargado que se va a encontrar en la posición 0
      this.funcionarioEncargado = this.funcionariosEncargadosPorDepa[0]
    }
  }

  filtrarDescripcionesPorDepa(numDepaParam: String) {
    this.descripcionesPorDepa = this.departamentos.filter(
      (d) => d.numDepartamento === Number(numDepaParam) 
    )
  }

  // Citas reservadas y las citas de un funcionario son sinónimos
  getCitasReservadas(id: number): void {
    // Las citas se tienen que limpiar porque si no se van acumulando cada vez que cambio de departamento (se activa este método)
    this.citasReservadas = []
    this.citasDisponibles = []

    this.service.getCitasFuncionario(id)
    .subscribe(data => {
      this.citasReservadas = data
      // Tener esto aquí fue la única manera que encontré para que carguen primero las citas reservadas
      this.generaCitasDisponibles()
    })
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
      let citaAux: Cita = new Cita()

      // Seteando el objeto cita auxiliar con el id del funcionario seleccionado, con fecha y hora del día jueves
      citaAux.idFuncionario = this.funcionarioEncargado.idFuncionario
      citaAux.fecha = fechaJuevesI
      citaAux.hora = fechaJuevesI.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})

      this.citasDisponibles.push(citaAux)
      // console.log(diaSemana[fechaMetodoPruebaJuevesI.getDay()] + " " + fechaMetodoPruebaJuevesI.toLocaleTimeString('en-US', {hour12: true}))

    }

    this.filtrarCitasDisponibles()
  }

  // Filtra las citas disponibles para que muestre solo las que no han sido reservadas
  filtrarCitasDisponibles(): void {

    console.log("Longitud del array de citas reservadas: " + this.citasReservadas.length)

    // 32 unicode del espacio en blanco
    console.log("3:30 PM")

    // this.citasDisponibles.forEach(c => {
    //   console.log(c.fecha.toLocaleString() + " " + c.hora + " ID_F:" + c.idFuncionario);
    // })

    // this.citasReservadas.forEach(c => {
    //   console.log(c.fecha.toLocaleString() + " " + c.hora + " ID_F:" + c.idFuncionario);
    // })

    // Mostrar la citas en consola

    // this.citasDisponibles.forEach(c => {
    //   console.log(c.fecha.toLocaleString() + " " + c.hora + " " + c.idFuncionario);
    // })

    // Se recorren los dos arrays para comparar los elementos de ambos
    for (let i = 0; i < this.citasDisponibles.length; i++)
    {
      for (let j = 0; j < this.citasReservadas.length; j++)
      {
        // console.log("Comparación: " + i + ": " + this.convertDate(this.citasDisponibles[i].fecha) + " " + this.citasDisponibles[i].hora +
        // " // " + this.citasReservadas[j].fecha.toString() + " " + this.citasReservadas[j].hora)

        // Esta comparación entre la hora y la fecha sí funciona
        if (this.citasDisponibles[i].hora === this.citasReservadas[j].hora) {
          
          // 8239 unicode del espacio en blanco
          // console.log(this.citasDisponibles[j].hora)

          // 160 unicode del espacio en blanco
          console.log(this.citasReservadas[i].hora)  

          console.log("--------------Me cumplí--------------")
          // Cuando un elemento del array de citasDispobles coincide con un elemento del array de citasReservadas
          // se elimina la posición del array donde se encontró la coincidencia con la hora y la fecha 
          this.citasDisponibles.splice(i, 1)
        }
      }
    }
  }

  devuelveDiaSemana(d: Date): String {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  // Convierte el formato por defecto de Date en JS a YYYY-MM-DD
  convertDate(date: Date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd  = date.getDate().toString();
  
    let mmChars = mm.split('');
    let ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1] ? mm: "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }

  // obtenerFuncionarioEncargado(): void {
  //   if (this.funcionariosPorDepa.length != 0) {
  //     this.idFuncionarioEncargado = this.funcionariosPorDepa.filter( 
  //       (f) => f.encargado === "Encargado" 
  //     )[0].idFuncionario;
  //   }
  // }

  // EnviarHijo(idFuncionarioEncargado: number) {
  //   // al hacer el clic en el botón se asigna el valor del input a la variable
  //   this.recibidoDePadre = idFuncionarioEncargado;
  // }
}