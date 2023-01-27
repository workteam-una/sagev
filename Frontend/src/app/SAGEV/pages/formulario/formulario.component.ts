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

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
  }

  GuadarCita(cita: Cita){
    console.log(cita)
    this.service.guardarCita(cita)
    .subscribe(data =>{
      alert("Se agrego con exito");
      // this.router.navigate(["listar"]);
    })
  }

}
