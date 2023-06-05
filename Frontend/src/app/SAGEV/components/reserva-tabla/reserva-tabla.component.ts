import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-reserva-tabla',
  templateUrl: './reserva-tabla.component.html',
  styleUrls: ['./reserva-tabla.component.css']
})
export class ReservaTablaComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router,  private cd:ChangeDetectorRef, private scroller: ViewportScroller) { }

  @Input() funcionarioEncargado: Funcionario
  @Input() citasDisponibles: Cita[] = []

  citaPadre: Cita = new Cita()

  // Para mostrar la fecha como un string 
  fechaCitaString: string = ""

  // Para Mostrar la hora reformateada en el formulario 
  horaCitaFormateada: string = ""

  // Para mostrar el nombre del funcionario en el formulario 
  nombreFuncionario: string = ""

  seleccionado = false;

  showModal: number

  // Texto del boton
  status = 'Reserva';

  // Me ayuda cambiar el color del boton 
  botonEstilo = {'background-color': 'blue', 'value': 'seleccionado'};

  // Fecha del día de hoy para no mostrar las citas de la semana actual que "ya pasaron"
  fechaHoy: Date = new Date(Date.now())

  // Variable que le avisa al componente reserva que ya puede mostrar los botones de anterior y siguiente
  @Output()
  mostrarBotones = new EventEmitter<number>();

  ngOnInit(): void { 
    // Enviando variable al componente padre para avisar que ya se cargo el componente actual
    this.mostrarBotones.emit(1);
    // Hace un pequeño scroll para que sea fácil darse cuenta de que se cargo una tabla
    this.scroller.scrollToAnchor("tabla-reserva")
  }

  // Recibe el aviso desde el componente 'reserva-tabla' de que ya puedo mostrar los botones anterior y siguiente
  recibirshModal(shModal: number) : void {
    this.showModal = shModal;
    this.cd.detectChanges();
  }

  //Refresca el pop-up
  refrescarShowModal(): void{
    this.showModal = 1
  }

  botonEstiloCambiaColor(): void {
    this.botonEstilo["background-color"] = 'green'
  } 

  // "citaPadre" es la cita que se va a cargar con los datos reales que el usuario desee seleccionar
  // En este metodo citaPadre toma la hora y fecha de una de las citas disponibles que el contribuyente selecciono
  
  // Cargo la cita con
  cargarFechaHora(): void {
    this.fechaCitaString = this.citaPadre.fecha.toLocaleDateString()
    this.horaCitaFormateada = this.citaPadre.fecha.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})
  }

  // Carga la cita con los datos del formulario ingresados por el contribuyente
  cargarCitaPadre(citaSelec: Cita): void {
    this.citaPadre.fecha = citaSelec.fecha;
    this.citaPadre.idFuncionario = this.funcionarioEncargado.idFuncionario
    this.citaPadre.nombreFuncionario = this.funcionarioEncargado.nombre
    this.citaPadre.apellido1Funcionario = this.funcionarioEncargado.apellido1
    this.citaPadre.apellido2Funcionario = this.funcionarioEncargado.apellido2
  }

  // En base a una fecha, calcula que dia de la semana es esa fecha
  devuelveDiaSemana(d: Date): string {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }
}