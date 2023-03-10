import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder,private service: ServiceService, private router: Router) {}

  //Variables necesarias para hacer las validaciones
  clientForm!: FormGroup
  enviar = false;

  ngOnInit(): void {
    //Validaciones del formulario
    this.clientForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidouno: ['', Validators.required],
      apellidodos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }


  //Ejecuta las validaciones
  validaciones(): boolean {
    this.enviar = true;
    // El formulario es invalido
    if (this.clientForm.invalid) {
        return false;
    }
    else{
      // El formulario esta bien
    console.log('SIS!! :-)\n\n' + JSON.stringify(this.clientForm.value, null, 6));
      return true;
    }
    
}

  //Limpia el formulario
  resetForm() {
  this.enviar = false;
  this.clientForm.reset();
}

  // un get del formulario
  get f() { return this.clientForm.controls; }


  guardarCita(cita: Cita){
    //Las validaciones estan mal
    if(!this.validaciones()){
      return
    }
    // console.log(cita)
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    cita.fecha.setHours(cita.fecha.getHours() - 6)
    this.service.guardarCita(cita)
    .subscribe(data =>{
      alert("Se agreg?? la cita con ??xito")
      // Se debe actualizar la p??gina para evitar sacar dos citas iguales
      window.location.reload()
      //this.router.navigate(["listar"]);
    })

    this.resetForm()
  }

}