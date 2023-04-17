import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-cancelar-tabla',
  templateUrl: './cancelar-tabla.component.html',
  styleUrls: ['./cancelar-tabla.component.css']
})
export class CancelarTablaComponent implements OnInit {

  formModal: any
  
  // @Input() idContribuyente: String

  idCitaSeleccionada: number

  @Input() citasContribuyente: Cita[] = []

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) : void {
    console.log(changes)
  }

  marcarAusente() : void {
    this.service.actualizarEstadoAusente(this.idCitaSeleccionada)
    .subscribe(data => {
      alert("Estado de cita actualizado a ausente con exito!")
      this.ngOnInit();
    })
  }

  openModal() {
    this.formModal.show();
   }

   showModal: number = -1;

   show(index: number, id: number){
    this.showModal = index;
    //Aqui setea el id de la cita, convenientemente
    this.idCitaSeleccionada = id;
  }

  close(){
    this.showModal = -1;
  }
}

