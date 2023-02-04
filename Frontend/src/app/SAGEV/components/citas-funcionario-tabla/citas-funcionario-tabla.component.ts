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

  show(index: number){
    this.showModal = index;
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

  actualizarEstado(id: number): void {
    this.service.actualizarEstado(id)
    .subscribe(data => {
      alert("Actualizado con exito!")
      this.ngOnInit();
    })
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    // this.router.navigate(['citasFunc']); 
    // });
    //Refrescar el componente

    //Cosas ricas
  }

}
