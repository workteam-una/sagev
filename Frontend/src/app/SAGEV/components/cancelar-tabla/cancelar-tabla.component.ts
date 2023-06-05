import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

  formModal: any
  
  // @Input() idContribuyente: String

  idCitaSeleccionada: number
  tokenCitaSeleccionada: string
  

  estadoCita: boolean = false

  citasContribuyente: Cita[] = []
  @Input() idContribuyente: string

  constructor(private service: ServiceService, private router: Router, private scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.getCitasTempReservadasContribuyente()
    this.scroller.scrollToAnchor("tabla-cancelar")
    //this.scroller.scrollToPosition([0, 160])
    console.log(this.scroller.getScrollPosition())
  }

  getCitasTempReservadasContribuyente() : void {
    this.service.getCitasTempContribuyente(this.idContribuyente)
    .subscribe(data => {
      this.citasContribuyente = data
      
      // Parseando la fecha de las citas a un formato que TS entiende
      this.citasContribuyente.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })

      // if (this.citasContribuyente.length === 0) {
      // this.noExisteCedula = true
      // }
      // else {
      //   this.noExisteCedula = false
      // }
    })
  }

  ngOnChanges(changes: SimpleChanges) : void {
    console.log(changes)
  }

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
    .subscribe(data => {
      Swal.fire({
        title: '¡Cita cancelada con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      this.ngOnInit()
      this.close()
    })
    // this.ngOnInit();
  }

  openModal() : void {
    this.formModal.show();
   }

   showModal: number = -1;

   show(index: number, id: number, token: string){
    this.showModal = index;
    //Aqui setea el id de la cita, convenientemente
    this.idCitaSeleccionada = id;
    this.tokenCitaSeleccionada = token;
    
  }

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