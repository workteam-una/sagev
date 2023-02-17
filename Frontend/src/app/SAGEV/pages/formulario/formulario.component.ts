import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() citaPadre: Cita
  @Input() fechaCitaString: String
  @Input() horaCitaFormateada: String
  @Input() nombreFuncionario: String

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
  }

  guardarCita(cita: Cita){
    // console.log("El id de la cita a guardar: " + cita.id)
    console.log(cita)
    this.service.guardarCita(cita)
    .subscribe(data =>{
      alert("Se agregó la cita con éxito")
      window.location.reload()
      //this.router.navigate(["listar"]);
    })
  }
}