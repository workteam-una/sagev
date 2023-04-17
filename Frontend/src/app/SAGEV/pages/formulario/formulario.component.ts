import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
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

    console.log("ShowModal en el init: " + this.showModal)
  }

  //Mostrar el pop up
  @Input()
  showModal: number = -1;

  //Variable que le avisa al componente reserva-tabla que cambio el valor de showmodal
  @Output()
  shModal = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) : void {
     console.log(changes['showModal'])
   }

  //AUN NO LO ESTOY USANDO porque es el padre el que me envia la instruccion de abrir
  show(index: number) : void {
    this.showModal = index;
    //Aqui setea el id de la cita, convenientemente
  }

  close() : void {
    this.showModal = -1;
    this.shModal.emit(this.showModal);
    console.log("ShowModal en el close: " + this.showModal)
  }//Fin pop up


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
  resetForm() : void {
  this.enviar = false;
  this.clientForm.reset();
}

  // un get del formulario
  get f() { return this.clientForm.controls; }


  guardarCita(cita: Cita) : void {
    //Si las validaciones estan mal...
    // if(!this.validaciones()){
    //   return
    // }
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

    this.resetForm()
  }

}