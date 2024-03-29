import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import Swal from 'sweetalert2';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.css']
})
export class CancelarComponent implements OnInit {

  constructor(private service: ServiceService) { }

  idContribuyente: string = ""

  citasContribuyente: Cita[] = []

  // Cuando no existe la cédula su estado será "True"
  noExisteCedula: boolean = false

  ngOnInit(): void {
  }

  // Valida la existencia de la cédula del contribuyente y carga sus citas en caso de que tenga citas reservadas
  verificarCitasContribuyente(id: string) : void {
    // Iniciando los puntos de carga
    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })
    if (id === "") {
      Notiflix.Loading.remove()
      return
    }
    this.service.getCitasTempContribuyente(id)
    .subscribe({
      next: (data) => {
        Notiflix.Loading.remove()
        this.citasContribuyente = data

        if (this.citasContribuyente.length === 0) {
        this.noExisteCedula = true
        
        // Se setea a vacío para poder cerrar el componente "citas-funcionario-tabla" en el HTML, ya que este está condicionado al valor de esta variable
        this.idContribuyente = ""
        }
        else {
          Notiflix.Loading.remove()
          this.noExisteCedula = false
          // Seteando el id del contribuyente para enviarselo a la tabla
          this.idContribuyente = id 
        }
      },
      error: () => {
        Notiflix.Loading.remove()
        // Desplegar pop-up
        Swal.fire({
        title:'Algo salió mal',
        text: 'Por favor, inténtelo nuevamente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
      }
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
