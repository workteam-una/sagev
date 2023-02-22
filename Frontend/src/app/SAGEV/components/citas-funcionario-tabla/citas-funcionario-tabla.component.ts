import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-citas-funcionario-tabla',
  templateUrl: './citas-funcionario-tabla.component.html',
  styleUrls: ['./citas-funcionario-tabla.component.css']
})
export class CitasFuncionarioTablaComponent implements OnInit {

  formModal: any

  @Input() modeloFuncionario: Funcionario
  citasFuncionario: Cita[] = []
  idCitaSeleccionada: number
  //Esto fue una idea anterior, pero se desecho
  //citaSeleccionada: Cita = new Cita();

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    //console.log(this.modeloFuncionario)
    this.getCitasFuncionario(this.modeloFuncionario.idFuncionario)
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById("exampleModal")
    // );
  }

  //Mostrar el pop up
  showModal: number = -1;

  //Este metodo además de setear el valor de showModal para mostrar el popup
  //tambien va a setear el id de la cita seleccionada para poder cambiar su estado
  show(index: number, id: number){
    this.showModal = index;
    //Aqui setea el id de la cita, convenientemente
    this.idCitaSeleccionada = id;
  }

  close(){
    this.showModal = -1;
  }//Fin pop up

  getCitasFuncionario(id: number){
    this.service.getCitasFuncionario(id)
    .subscribe(data => {
      this.citasFuncionario = data
      
      // Parseando la fecha de las citas a un formato que TS entiende
      this.citasFuncionario.forEach(c => {
        c.fecha = this.sqlToJsDate(c.fecha)
      })
    })

    this.citasFuncionario.forEach(c => {
      console.log(c)
    })
  }

  actualizarEstado(estado: String){
    if (estado === "completada"){
      this.service.actualizarEstadoCompletada(this.idCitaSeleccionada)
      .subscribe(data => {
      alert("Estado de cita actualizado a completado con exito!")
      // Se vuelven a cargar todas las citas para que se actualice su estado en la tabla de citas,
      // del funcionario, lo malo de esto es que si son muchas citas puede llegar a ser mucha carga.
      this.ngOnInit();
    })
    }
    if (estado === "ausente") {
      this.service.actualizarEstadoAusente(this.idCitaSeleccionada)
    .subscribe(data => {
      alert("Estado de cita actualizado a ausente con exito!")
      this.ngOnInit();
    })
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