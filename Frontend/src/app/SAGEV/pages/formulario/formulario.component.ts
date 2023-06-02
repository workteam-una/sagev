import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Correo } from '../../modelo/correo';
import * as  Notiflix from 'notiflix';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() citaPadre: Cita
  @Input() fechaCitaString: string
  @Input() horaCitaFormateada: string
  @Input() nombreFuncionario: string

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  //Variables necesarias para hacer las validaciones
  public clientForm!: FormGroup
  enviar = false;
  prueba:string;

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

  //Mostrar el pop up
  @Input()
  showModal: number = -1;

  //Variable que le avisa al componente reserva-tabla que cambio el valor de showmodal
  @Output()
  shModal = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['showModal'])
  }

  //AUN NO LO ESTOY USANDO porque es el padre el que me envia la instruccion de abrir
  show(index: number): void {
    this.showModal = index;
    //Aqui setea el id de la cita, convenientemente
  }

  close(): void {
    this.showModal = -1;
    this.shModal.emit(this.showModal);
  } //Fin pop up


  //Ejecuta las validaciones
  validaciones(): boolean {
    this.enviar = true;
    // El formulario es invalido
    if (this.clientForm.invalid) {
      return false;
    }
    else {
      // El formulario esta bien
      //console.log('SIS!! :-)\n\n' + JSON.stringify(this.clientForm.value, null, 6));
      return true;
    }

  }

  //Cargar cita con lo escrito en el formulario
  CargarCita():void{
    this.prueba = this.clientForm.get('nombre')?.value;
    console.log("VALOR DE PRUEBA: "+this.prueba);
    //Nombre cliente
    this.citaPadre.nombreContribuyente = this.clientForm.get('nombre')?.value;
    //Apellido 1
    this.citaPadre.apellido1Contribuyente = this.clientForm.get('apellidouno')?.value;
    //Apellido 2
    this.citaPadre.apellido2Contribuyente =  this.clientForm.get('apellidodos')?.value;
    //ID(cedula)
    this.citaPadre.idContribuyente =  this.clientForm.get('cedula')?.value;
    //Telefono
    this.citaPadre.telefonoContribuyente =  this.clientForm.get('telefono')?.value;
    //Correo
    this.citaPadre.correoContribuyente = this.clientForm.get('email')?.value;
  }

  //Limpia el formulario
  resetForm(): void {
    this.enviar = false;
    // this.clientForm.reset();
  }

  // un get del formulario
  get f() { return this.clientForm.controls; }


  guardarCita(cita: Cita): void {
    // si las validaciones estan mal salga del método
    if (!this.validaciones()) {
      return
    }
    Notiflix.Loading.dots({
      backgroundColor: 'rgba(0,0,0,0.1)',
      svgSize: '100px',
    })
    // carga la cita con los valores ingresados en el formulario
    this.CargarCita()
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    cita.fecha.setHours(cita.fecha.getHours() - 6)
    // guardar en la tabla histórica de citas 
    this.service.guardarCita(cita)
      .subscribe(data => {

    })
    // Guardar cita en la tabla temporal de citas
    this.service.guardarCitaTemp(cita)
    .subscribe(data => {
      Swal.fire({
        title: '¡Cita reservada con éxito!',
        text: 'Los detalles de la reserva serán enviados al correo electrónico ingresado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        window.location.reload()
      })
    })
    this.enviarCorreo(cita)
    this.resetForm()
    Notiflix.Loading.remove();
  }

  enviarCorreo(cita: Cita) : void {
    let correo: Correo = new Correo

    // Se tiene que hacer este incremento por el decremento realizado en el método de guardarCita() 
    cita.fecha.setHours(cita.fecha.getHours() + 6)

    correo.to = cita.correoContribuyente
    correo.subject = "Confirmación de su cita en la Municipalidad de Santo Domingo"
    correo.message = "Estimado/a " + this.citaPadre.nombreContribuyente + "\n\n" + "Le informamos que su cita para el día " + this.devuelveDiaSemana(cita.fecha) + " "
      + cita.fecha.getDate() + " de " + this.devuelveMes(cita.fecha) + " a las " +
      cita.fecha.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })
      + " con el funcionario " + this.nombreFuncionario + " ha sido reservada con éxito." + "\n\n" + "Este correo es generado de forma automática, favor no responder."

    console.log(correo.message)

    this.service.enviaCorreo(correo)
      .subscribe(data => {
        // Aquí podría ir un alert diciendo que el correo fue enviado, pero por como están hechos los pasos previos creo que ya es algo innecesario
      })

  }

  // <td>{{devuelveDiaSemana(cita.fecha)}}</td>
  // <td>{{cita.fecha.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})}}</td>

  devuelveDiaSemana(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  devuelveMes(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let mes = meses[d.getMonth()]
    return mes
  }
}