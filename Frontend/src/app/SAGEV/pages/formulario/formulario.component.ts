import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Correo } from '../../modelo/correo';

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

    console.log("ShowModal en el init: " + this.showModal)
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
    console.log("ShowModal en el close: " + this.showModal)
  }//Fin pop up


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
    this.clientForm.reset();
  }

  // un get del formulario
  get f() { return this.clientForm.controls; }


  guardarCita(cita: Cita): void {
    //Si las validaciones estan mal...
    if (!this.validaciones()) {
      return
    }
    // console.log(cita)
    //Carga la cita con los valores ingresados en el formulario
    this.CargarCita()
    // se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
    cita.fecha.setHours(cita.fecha.getHours() - 6)
    this.service.guardarCita(cita)
      .subscribe(data => {
        alert("Se agregó la cita con éxito")
        // Se debe actualizar la página para evitar sacar dos citas iguales
        window.location.reload()
        //this.router.navigate(["listar"]);
      }) 
    this.enviarCorreo(cita)
    this.resetForm()
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
      + " ha sido reservada con éxito." + "\n\n" + "Este correo es generado de forma automática, favor no responder."

    console.log(correo.message)

    this.service.enviaCorreo(correo)
      .subscribe(data => {
        alert("Se envió el correo con exito")
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