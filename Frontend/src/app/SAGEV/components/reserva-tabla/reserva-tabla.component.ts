import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-tabla',
  templateUrl: './reserva-tabla.component.html',
  styleUrls: ['./reserva-tabla.component.css']
})
export class ReservaTablaComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  @Input() funcionarioEncargado: Funcionario
  @Input() citasDisponibles: Cita[] = []

  citaPadre: Cita = new Cita()

  // Para mostrar la fecha como un string 
  fechaCitaString: String = ""

  // Para Mostrar la hora formateada en el formulario 
  horaCitaFormateada: String = ""

  // Para mostrar el nombre del funcionario en el formulario 
  nombreFuncionario: String = ""

  seleccionado = false; //Creo que esto esta al revez XD
  status = 'Reserva';

  botonEstilo = {'background-color': 'blue', 'value': 'seleccionado'};

  //Variable que le avisa al componente reserva que ya puede mostrar los botones de anterior y siguiente
  @Output()
  mostrarBotones = new EventEmitter<number>();

  ngOnInit(): void {
    // this.getCitasReservadas(this.funcionarioEncargado.idFuncionario)
    
    //Enviando variable al componente padre para avisar que ya se cargo este componente
    this.mostrarBotones.emit(1);
  }
 

  botonEstiloCambiaColor(): void {
    this.botonEstilo["background-color"] = 'green'
  } 

  // citaPadre es la cita que se va a cargar con los datos reales que el usuario desee seleccionar
  // En este metodo citaPadre toma la hora y fecha de las citas disponibles que se generaron
  
  /*
    Comentario temporal:
    Creo que con estos seteos ya no es necesario hacer una citaHija, porque ya cita padre agarro lo que 
    quiso de cita monito, sin tener que agarrar su Id, es decir, cita padre queda con ID null, como debede ser
  */

  cargarDatosFormulario(): void {
    this.fechaCitaString = this.citaPadre.fecha.toLocaleDateString()
    this.horaCitaFormateada = this.citaPadre.fecha.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})
    this.nombreFuncionario = this.funcionarioEncargado.nombre + " " + this.funcionarioEncargado.apellido1 
  }

  cargarCitaPadre(citaSelec: Cita): void {
    this.citaPadre.fecha = citaSelec.fecha;
    this.citaPadre.idFuncionario = this.funcionarioEncargado.idFuncionario
  }

  devuelveDiaSemana(d: Date): String {
    // Array que funciona como "traductor" para poder imprimir el nombre del día
    const diaSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    let dia = diaSemana[d.getDay()]
    return dia
  }

  
}

  // stringToDate(_date,_format,_delimiter)
  // {
  //   let formatLowerCase = _format.toLowerCase();
  //   let formatItems = formatLowerCase.split(_delimiter);
  //   let dateItems = _date.split(_delimiter);
  //   let monthIndex = formatItems.indexOf("mm");
  //   let dayIndex = formatItems.indexOf("dd");
  //   let yearIndex = formatItems.indexOf("yyyy");
  //   let month = parseInt(dateItems[monthIndex]);
  //   month -= 1;
  //   let formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
  //   return formatedDate;
  // }

  // this.convertDate(this.citasDisponibles[i].fecha) === this.citasReservadas[j].fecha.toString() && this.citasDisponibles[i].hora === this.citasReservadas[j].hora