import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { ViewportScroller } from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelar-tabla',
  templateUrl: './cancelar-tabla.component.html',
  styleUrls: ['./cancelar-tabla.component.css']
})
export class CancelarTablaComponent implements OnInit {

  @Input() idContribuyente: string
  formModal: any
  idCitaSeleccionada: number
  tokenCitaSeleccionada: string 
  estadoCita: boolean = false
  // Lista de todas las citas reservadas por el contribuyente
  citasContribuyente: Cita[] = []
  // Si el valor es -1 el pop-up se cierra, si el valor es 1 el pop up se abre
  showModal: number = -1;

  constructor(private service: ServiceService, private router: Router, private scroller: ViewportScroller) { }

  /* 
    Se da la instrucción de hacer un pequeño scroll justo después de crear el componente,
   esto con el objetivo de que el usuario de cuenta que se cargó la tabla de citas 
  */
  ngOnInit(): void {
    this.getCitasTempReservadasContribuyente()
    this.scroller.scrollToAnchor("tabla-cancelar")
  }

  // Se obtienen las citas reservadas según la cédula de contribuyente ingresada
  getCitasTempReservadasContribuyente() : void {
    this.service.getCitasTempContribuyente(this.idContribuyente)
    .subscribe({
      next: (data) => {
        this.citasContribuyente = data     
        // Parseando la fecha de las citas a un formato que TS entiende
        this.citasContribuyente.forEach(c => {
          c.fecha = this.sqlToJsDate(c.fecha)
        })
      }
    })
  }

  // Si el token ingresado es igual al token de la cita seleccionada, marca esta cita como cancelada
  marcarEstadoCancelada(inputTokenCita: string) : void {
    let tokenCita: string = inputTokenCita
    if(tokenCita !== this.tokenCitaSeleccionada){
      Swal.fire({
        title: 'Error al cancelar la cita',
        text: '¡Identificador único incorrecto!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      return
    }
    this.service.actualizarEstadoCanceladaTemp(this.idCitaSeleccionada)
    .subscribe({
      next: () => {
      // Desplegar pop-up
      Swal.fire({
        title: '¡Cita cancelada con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      this.ngOnInit()
      this.close()
    },
    error: () => {
      // Desplegar pop-up
      Swal.fire({
        title:'Error al cancelar la cita',
        text: 'Por favor, inténtelo nuevamente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
    }
    })
  }

  // Abre el pop up para cancelar una cita
  openModal() : void {
    this.formModal.show();
   }

   show(index: number, id: number, token: string){
    // Index debe vale 1 para que se muestre el pop-up
    this.showModal = index;
    // Cuando el pop-up se abre, en ese momento se obtiene el id y token de la cita seleccionada
    this.idCitaSeleccionada = id;
    this.tokenCitaSeleccionada = token;
    
  }

  // Cierra el pop-up
  close() : void {
    this.showModal = -1;
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