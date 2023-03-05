import { Component, Input, OnInit } from '@angular/core';
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

  // Funciona para limitar a un mes (4 semanas) la cantidad de citas que se le pueden desplegar al contribuyente
  contadorSemanas: number = 0;

  botonEstilo = {'background-color': 'blue', 'value': 'seleccionado'};

  ngOnInit(): void {
    // this.getCitasReservadas(this.funcionarioEncargado.idFuncionario)
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

  /*
    Al presionar el botón "siguiente" debajo de la tabla de citas disponibles se va a incrementar en una semana la fecha 
    de las citas, con un límite (modificable) de cuatro semanas para mostrar las citas disponibles de las próximas semanas. 
  */
    aumentarSemanasCitasDisponibles(contParam: number): void {

      // Incrementando en 1 el contador de semanas
      this.contadorSemanas += contParam
  
      // Cuando el contador de semanas supera el valor de 4 (citas de hasta 1 mes después) entonces lo decrementa en 1 y se sale del método
      if (this.contadorSemanas > 4) {
        this.contadorSemanas - 1
        return
      }
  
      // Seteando las fechas de las citas disponibles agregandoles 7 días
      this.citasDisponibles.forEach(c => {
        c.fecha.setDate(c.fecha.getDate() + 7)
      })
    }
  
    /* 
      Al presionar el botón "anterior" debajo de la tabla de citas disponibles se va a decrementar en una semana la fecha 
      de las citas, con la semana actual como límite.
    */  
    disminuirSemanasCitasDisponibles(contParam: number): void {
  
      // Decrementando en 1 el contador de semanas
      this.contadorSemanas += contParam

      // Seteando las fechas de las citas disponibles restandoles 7 días 
      this.citasDisponibles.forEach(c => {
        c.fecha.setDate(c.fecha.getDate() - 7)
      })
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