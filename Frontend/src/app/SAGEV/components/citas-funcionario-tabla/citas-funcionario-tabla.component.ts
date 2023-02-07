import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

declare var window: any

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
    })
  }

  actualizarEstado(estado: String){
    if (estado === "completada"){
      this.service.actualizarEstadoCompletada(this.idCitaSeleccionada)
      .subscribe(data => {
      alert("Estado de cita actualizado a completado con exito!")
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
  
}
