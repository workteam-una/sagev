import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cita } from '../../modelo/cita';
import { Correo } from '../../modelo/correo';
import * as  Notiflix from 'notiflix';
import Swal from 'sweetalert2';
import { Funcionario } from '../../modelo/funcionario';

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
  @Input() funcionarioEncargado: Funcionario

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  // Variables necesarias para hacer las validaciones
  public clientForm!: FormGroup
  enviar = false
  prueba : string

  ngOnInit(): void {
    // Validaciones del formulario
    this.clientForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidouno: ['', Validators.required],
      apellidodos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Variable para mostrar el pop-up
  @Input()
  showModal: number = -1;

  // Variable que le avisa al componente reserva-tabla que cambio el valor de showModal
  @Output()
  shModal = new EventEmitter<number>()

  // un get del formulario
  get f() { return this.clientForm.controls }

  // Ejecuta las validaciones
  validaciones() : boolean {
    this.enviar = true;
    // El formulario es inválido
    if (this.clientForm.invalid) {
      return false;
    }
    else {
      // El formulario está bien
      return true;
    }

  }

  //Cargar cita con lo escrito en el formulario 
  cargarCita() : void{
    //Nombre cliente
    this.citaPadre.nombreContribuyente = this.clientForm.get('nombre')?.value;
    //Apellido 1
    this.citaPadre.apellido1Contribuyente = this.clientForm.get('apellidouno')?.value;
    //Apellido 2
    this.citaPadre.apellido2Contribuyente = this.clientForm.get('apellidodos')?.value;
    //Id (cédula)
    this.citaPadre.idContribuyente = this.clientForm.get('cedula')?.value;
    //Teléfono
    this.citaPadre.telefonoContribuyente = this.clientForm.get('telefono')?.value;
    //Correo
    this.citaPadre.correoContribuyente = this.clientForm.get('email')?.value;

    // Si el motivo de la cita está vacío agregue el texto "sin especificar"
    if(this.citaPadre.detalle === undefined){
      this.citaPadre.detalle = "Sin especificar"
    }

    // Genero un identificador único (token) que me va a servir para cancelar la cita
    this.citaPadre.token = this.creaToken()
  }

  /* 
    Método que tras una seguidilla de eventos guarda la cita en la tabla histórica y temporal, para luego
    enviar el correo de confirmación de la cita tanto para el funcionario como para el contribuyente
  */
  guardarCitasEnviarCorreos() : void {
    this.guardarCita()
  }

  // Almacena la cita en la base de datos
  guardarCita() : void {
  // Si las validaciones encuentran un error se sale del método
  if (!this.validaciones()) {
    return
  }

  // Empiezan los puntos de carga
  Notiflix.Loading.dots({
    backgroundColor: 'rgba(0,0,0,0.1)',
    svgSize: '100px',
  })

  // Carga la cita con los valores ingresados en el formulario
  this.cargarCita()

  // Se restan 6 horas a la cita para que llegue con la hora en zona horaria local y no en ISO (+6 horas)
  this.citaPadre.fecha.setHours(this.citaPadre.fecha.getHours() - 6)

  // Guardar en la tabla histórica de citas 
  this.service.guardarCita(this.citaPadre)
    .subscribe({
      next: () => this.guardarCitaTemp(),
      error: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        // Desplegar pop-up
        Swal.fire({
          title: 'Error al reservar la cita',
          text: 'Por favor, inténtelo nuevamente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
      }
    })
  }

  // Guardar la cita en la tabla temporal de citas
  guardarCitaTemp() : void {
    this.service.guardarCitaTemp(this.citaPadre)
    .subscribe({
      next: () => this.enviarCorreo(this.citaPadre),
      error: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        // Desplegar el pop-up
        Swal.fire({
          title: 'Error al reservar la cita',
          text: 'Por favor, intente reservar nuevamente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        })
      }
    })
  }

  // Genera el contenido de un correo electrónico dirigido al contribuyente una vez realiza el envío del formulario para reservar la cita
  enviarCorreo(cita: Cita) : void {
    let correo: Correo = new Correo
    // Se tiene que hacer este incremento por el decremento realizado en el método de guardarCita() 
    cita.fecha.setHours(cita.fecha.getHours() + 6)
    correo.to = cita.correoContribuyente
    correo.subject = "Confirmación de su cita en la Municipalidad de Santo Domingo"
    correo.message = "Estimado/a " + this.citaPadre.nombreContribuyente + "\n\n" 
      + "Le informamos que su cita a cargo de " + this.funcionarioEncargado.nombre + " " + this.funcionarioEncargado.apellido1 + " "
      + "para el " + this.devuelveDiaSemana(cita.fecha) + " " + cita.fecha.getDate() + " de " + this.devuelveMes(cita.fecha) + " a las " 
      + cita.fecha.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + " ha sido reservada con éxito." + "\n\n" 
      + "Motivo de la cita: " + cita.detalle + "\n\n" 
      + "En caso de que necesite cancelar su cita, el identificador único de la misma es: " + cita.token + "\n\n"
      + "Este correo es generado de forma automática, favor no responder."

    this.service.enviaCorreo(correo)
      .subscribe({
        next: () => this.enviarCorreoFunc(this.citaPadre),
        error: () => {
          // Remover los puntos de carga
          Notiflix.Loading.remove()

          // Desplegar pop-up
          Swal.fire({
            title: '¡Algo salió mal!',
            text:  'Puede que no reciba el correo electrónico con los detalles de su cita',
            icon:  'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            // Refrescar la página
            window.location.reload()
          })
        }
      })
  }

  // Genera el contenido de un correo electrónico dirigido al funcionario una vez se le agende una cita nueva
  enviarCorreoFunc(cita: Cita) : void {
    let correo: Correo = new Correo
    correo.to = this.funcionarioEncargado.correo
    correo.subject = "SAGEV: Nueva cita con " + cita.nombreContribuyente + " para el " + cita.fecha.getDate() + " de " + this.devuelveMes(cita.fecha)
    correo.message = "Estimado/a " + this.funcionarioEncargado.nombre + "\n\n" + 
    "Se le informa que tiene una nueva cita agendada para el " + this.devuelveDiaSemana(cita.fecha) + " "
      + cita.fecha.getDate() + " de " + this.devuelveMes(cita.fecha) + " a las " +
      cita.fecha.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ".\n\n" +
      "Contribuyente: " + cita.nombreContribuyente + " " + cita.apellido1Contribuyente + " " + cita.apellido2Contribuyente + "\n" +
      "Teléfono: " + cita.telefonoContribuyente + "\n" +
      "Correo: " + cita.correoContribuyente + "\n" +
      "Necesidad del contribuyente: " + cita.detalle

    this.service.enviaCorreo(correo)
    .subscribe({
      error: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()
        
        // Nota: Como este es el correo de confirmación dirigido hacia el funcionario
        // no se considera prudente confundir al contribuyente al desplegar este pop-up

        // Desplegar pop-up
        // Swal.fire({
        //   title: 'Error al enviar correo',
        //   text: 'Ocurrió un error durante el envío del correo de confirmación dirigido al funcionario',
        //   icon: 'error',
        //   confirmButtonText: 'Aceptar',
        //   confirmButtonColor: '#3085d6',
        // })
      },
      complete: () => {
        // Remover los puntos de carga
        Notiflix.Loading.remove()

        // Desplegar el pop-up
        Swal.fire({
          title: '¡Cita reservada con éxito!',
          text: 'Los detalles de la reserva serán enviados al correo electrónico ingresado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          // Refrescar la página
          window.location.reload()
        })
      }
    })
  }

  // Mostrar el pop-up
  show(index: number) : void {
    this.showModal = index;
  }

  // Cerrar el pop-up
  close() : void {
    this.showModal = -1;
    this.shModal.emit(this.showModal);
  }

  // Limpia el formulario
  resetForm() : void {
    this.enviar = false
    window.location.reload()
  }

  // Con base en un objeto tipo "Date" devuelvo un string con el nombre en español de ese día
  devuelveDiaSemana(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  // Con base en un objeto tipo "Date" devuelvo un string con el nombre en español del mes en el que se encuentra
  devuelveMes(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let mes = meses[d.getMonth()]
    return mes
  }

  // Crea un identificador de extensión modificable usando caracteres alfanuméricos
  creaToken(): string {
    let result = ''
    const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length;
    let counter = 0
    // El valor es 10 por defecto, se puede modificar
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }
}