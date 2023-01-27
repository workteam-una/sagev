import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../modelo/cita';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-reserva-tabla',
  templateUrl: './reserva-tabla.component.html',
  styleUrls: ['./reserva-tabla.component.css']
})
export class ReservaTablaComponent implements OnInit {

  @Input() funcionarioEncargado: Funcionario;
  citaPadre: Cita = new Cita();
  fechaCitaString: String;
  
  constructor() { }

  seleccionado = true; //Creo que esto esta al revez XD
  status = 'Reserva';

  ngOnInit(): void {
  }

  seleccionar(): void {
    this.seleccionado = !this.seleccionado;
    this.status = this.seleccionado ? 'Reserva' : 'Seleccionada';
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

  cargarCitaPadre(): void {
    this.citaPadre.fecha = new Date();
    console.log("Linea 45 en reserva-tabla: " + this.citaPadre.fecha)
    this.citaPadre.hora = "9:30"
    this.citaPadre.idFuncionario = this.funcionarioEncargado.idFuncionario
    this.fechaCitaString = this.citaPadre.fecha.toLocaleDateString()
    console.log("Linea 48 en reserva-tabla: " + this.fechaCitaString)
  }

}
