import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Cita } from '../../modelo/cita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-tabla',
  templateUrl: './administrador-tabla.component.html',
  styleUrls: ['./administrador-tabla.component.css']
})
export class AdministradorTablaComponent implements OnInit {

  citasReservadas: Cita[] = []
  citasReservadasFiltradas: Cita[] = []

  @Input() fechaInicio: Date 
  @Input() fechaFinal: Date
  @Input() confirmarBusqueda: boolean = false;

  constructor(private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    // Se carga el histórico de citas
    this.getCitasReservadas()

  }

   // Nota: Las citas reservadas contienen todas las que han sido reservadas con todos los funcionarios
   getCitasReservadas(): void {
    this.service.getCitasReservadas()
    .subscribe(data => {
      this.citasReservadas = data
      // Se parsea el formato de las fechas de SQL a Typescript para que sean compatibles con el proyecto
      // Se están parseando las fechas aquí para solo tener que hacerlo una vez
      this.citasReservadas.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
      this.citasReservadasFiltradas = this.citasReservadas
      })
  }

  // Método para filtrar el historial de citas por una rango de fechas
  filtrarFechas() : void {
    
    let fechaInicioString: string = this.fechaInicio.toString()
    let fechaInicioFormatoTS: Date = this.stringToDateInicio(fechaInicioString, "yyyy-mm-dd", "-")
    let fechaFinalString: string = this.fechaFinal.toString()
    let fechaFinalFormatoTS: Date = this.stringToDateFinal(fechaFinalString, "yyyy-mm-dd", "-")

    if (fechaInicioFormatoTS < fechaFinalFormatoTS) {
      this.citasReservadasFiltradas = this.citasReservadas.filter(c => 
      fechaInicioFormatoTS <= c.fecha && fechaFinalFormatoTS >= c.fecha)
    }
    else {
      Swal.fire({
        title: 'Error al filtrar las citas',
        text: '¡Debe seleccionar un rango de fechas válido!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
  }

  // Convierte un objeto DateTime de SQL a un objeto Date de TS
  sqlToJsDate(sqlDate: any) : Date {
    // sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    let sqlDateArr1 = sqlDate.split("-")
    // format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    let sYear = sqlDateArr1[0]
    let sMonth = (Number(sqlDateArr1[1]) - 1)
    let sqlDateArr2 = sqlDateArr1[2].split("T")
    // format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    let sDay = sqlDateArr2[0]
    let sqlDateArr3 = sqlDateArr2[1].split(":")
    // format of sqlDateArr3[] = ['hh','mm','ss.ms']
    let sHour = (sqlDateArr3[0])
    // let sHour = (Number(sqlDateArr3[0]) - 6)
    let sMinute = sqlDateArr3[1]
    let sqlDateArr4 = sqlDateArr3[2].split(".")
    // format of sqlDateArr4[] = ['ss','ms']
    let sSecond = sqlDateArr4[0]
    let sMillisecond = sqlDateArr4[1]

    return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond, sMillisecond)
}

  /* 
    Las fechas que se recuperan en el input de tipo "date" necesitan ser reformateadas por este método.
    El formato cambia para que puedan ser interpretadas, comparadas y filtradas.
  */
  stringToDateInicio(_date,_format,_delimiter)
  {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    let formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
  }
  
  /* 
    Las fechas que se recuperan en el input de tipo "date" necesitan ser reformateadas por este método.
    El formato cambia para que puedan ser interpretadas, comparadas y filtradas.
  */
  stringToDateFinal(_date,_format,_delimiter)
  {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    // Se debe asegurar que la fecha maxima tambien tenga la hora maxima para evitar problemas
    let formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex], 23, 59);
    return formatedDate;
  }
}