import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Cita } from '../../modelo/cita';

@Component({
  selector: 'app-administrador-tabla',
  templateUrl: './administrador-tabla.component.html',
  styleUrls: ['./administrador-tabla.component.css']
})
export class AdministradorTablaComponent implements OnInit {

  citasReservadas: Cita[] = []

  constructor(private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCitasReservadas()
  }

   // Citas reservadas y las citas de un funcionario son sinónimos
   getCitasReservadas(): void {
    // Las citas se tienen que limpiar porque si no se van acumulando cada vez que cambio de departamento (se activa este método)
    //this.citasReservadas = []

    this.service.getCitasReservadas()
    .subscribe(data => {
      this.citasReservadas = data
      // this.citasReservadas.forEach(c => {
      //   console.log(c)
      // })
      // Se están parseando las fechas aquí para solo tener que hacerlo una vez
      this.citasReservadas.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
      })
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
