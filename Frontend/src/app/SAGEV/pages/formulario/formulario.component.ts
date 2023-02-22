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
    // console.log(cita)
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    cita.fecha.setHours(cita.fecha.getHours() - 6)
    this.service.guardarCita(cita)
    .subscribe(data =>{
      alert("Se agregó la cita con éxito")
      // Se debe actualizar la página para evitar sacar dos citas iguales
      window.location.reload()
      //this.router.navigate(["listar"]);
    })
  }
}