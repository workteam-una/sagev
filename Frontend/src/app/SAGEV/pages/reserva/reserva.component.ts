import { getLocaleDateFormat } from '@angular/common';
import { Component, ContentChild, ContentChildren, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Area } from '../../modelo/area';
import { Departamento } from '../../modelo/departamento';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  // @ContentChild('sA')
  // prueba: ElementRef;

  // @ViewChild('username')
  // username: ElementRef<HTMLInputElement>; 

  areas: Area[] = []
  departamentos: Departamento[] = []
  departamentosPorArea: Departamento [] = []
  funcionarios: Funcionario[] = []
  funcionariosEncargadosPorDepa: Funcionario[] = []
  descripcionesPorDepa: Departamento[] = []
  fecha = this.devolverLunesSemanaActual();

  // fecha2 = '2015-02-20T13:59:31.238Z'
  fecha2 = '12-10-2022'

  funcionarioEncargado: Funcionario = new Funcionario;

  constructor(private service: ServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    localStorage.clear()
    
    this.service.getAreas()
    .subscribe(dataArea => {
      this.areas = dataArea
    })
    
    this.service.getDepartamentos()
    .subscribe(dataDep => {
      this.departamentos = dataDep
      console.log(this.departamentos)
    })

    this.service.getFuncionarios()
    .subscribe(dataFunc => {
      this.funcionarios = dataFunc
      console.log(this.funcionarios)
      })

    }

    // prueba($event) {
    //   console.log($event.target.value)
    // }

    filtrarDepartamentosPorArea(numAreaParam: String) {
      this.departamentosPorArea = this.departamentos.filter(
        (d) => d.numArea === Number(numAreaParam) 
      )
    }

    filtrarFuncionariosEncargadosPorDepa(numDepartamentoParam: String) {
      this.funcionariosEncargadosPorDepa = this.funcionarios.filter( 
        (f) => f.numDepartamento === Number(numDepartamentoParam) && f.encargado === "S" 
      )

      //Se debe verificar si la lista filtrada es vacía antes de realizar la asignación
      if (this.funcionariosEncargadosPorDepa.length !== 0){
        //Seteando al funcionario encargado que se va a encontrar en la posición 0
        this.funcionarioEncargado = this.funcionariosEncargadosPorDepa[0]
      }
    }

    filtrarDescripcionesPorDepa(numDepaParam: String) {
      this.descripcionesPorDepa = this.departamentos.filter(
        (d) => d.numDepartamento === Number(numDepaParam) 
      )
    }

    // obtenerFuncionarioEncargado(): void {
    //   if (this.funcionariosPorDepa.length != 0) {
    //     this.idFuncionarioEncargado = this.funcionariosPorDepa.filter( 
    //       (f) => f.encargado === "Encargado" 
    //     )[0].idFuncionario;
    //   }
    // }

    // EnviarHijo(idFuncionarioEncargado: number) {
    //   // al hacer el clic en el botón se asigna el valor del input a la variable
    //   this.recibidoDePadre = idFuncionarioEncargado;
    // }

    //Este metodo me dice que fecha tuvo el lunes de la semana actual
    devolverLunesSemanaActual() : Date{
      let fechaLunes = new Date() //Fecha del lunes de la semana actual
      let hoy = new Date().getDay() //Dia de la semana actual

      //Este bloque es una prueba para sumarle dias a una fecha
      // console.log(fechaLunes.toDateString())
      // console.log(fechaLunes.getDate() + 1)
      // console.log("Esto deberia ser imprimir la fecha de mannana: " + fechaLunes.toLocaleDateString())
      // console.log("Fecha lunes es: " + (fechaLunes.getDate() - 3))

      if( hoy === 2 ){ fechaLunes.setDate(fechaLunes.getDate() - 1); return fechaLunes }
      if( hoy === 3 ){ fechaLunes.setDate(fechaLunes.getDate() - 2); return fechaLunes }
      if( hoy === 4 ){ fechaLunes.setDate(fechaLunes.getDate() - 3); return fechaLunes }
      if( hoy === 5 ){ fechaLunes.setDate(fechaLunes.getDate() - 4); return fechaLunes }
      if( hoy === 6 ){ fechaLunes.setDate(fechaLunes.getDate() - 5); return fechaLunes }
      if( hoy === 0 ){ fechaLunes.setDate(fechaLunes.getDate() + 1); return fechaLunes }

      //Hoy es Lunes
      return fechaLunes
    }
    
    //Este metodo devuelve la fecha exacta en la cual se va a realizar la cita disponible
    //El primer parametro es el atributo de tipo Date que retorna el metodo devolverLunesSemanaActual()
    //Al tener el lunes, lo comparo con el atributo "dia" proveniente de Horario, para encontrar la fecha
    //del dia de la cita comienzo a sumar dias partiendo desde el dia lunes
    obtenerFechaDiaSemana(diaCita: String) {

      let lunesSemanaActual: Date = this.devolverLunesSemanaActual()

      //Martes
      if( diaCita === "Martes" ){ 
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 1);
        return lunesSemanaActual
      }
      //Miercoles
      if( diaCita === "Miercoles" ){ 
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 2); 
        return lunesSemanaActual;
      }
      //Jueves
      if( diaCita === "Jueves" ){
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 3)
        return lunesSemanaActual
      }
      //Viernes
      if( diaCita === "Viernes" )
      { 
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 4) 
        return lunesSemanaActual
      } 
      //Sabado
      if( diaCita === "Sabado" ){ 
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 5)
        return lunesSemanaActual
      }
      //Domingo
      if( diaCita === "Domingo" ){ 
        lunesSemanaActual.setDate(lunesSemanaActual.getDate() + 6) 
        return lunesSemanaActual
      }

      //Hoy es Lunes
      return lunesSemanaActual 
    }
}