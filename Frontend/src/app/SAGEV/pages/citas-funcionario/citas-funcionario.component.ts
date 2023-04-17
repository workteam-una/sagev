import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-citas-funcionario',
  templateUrl: './citas-funcionario.component.html',
  styleUrls: ['./citas-funcionario.component.css']
})

export class CitasFuncionarioComponent implements OnInit {

  // Pop-up de modificar funcionario
  formModalModFunc: any
  funcionariosEncargadosPorDepa: Funcionario[] = []
  funcionarios: Funcionario[] = []

  constructor(private service: ServiceService, private router: Router) { }
  modeloFuncionario: Funcionario = new Funcionario()
  
  ngOnInit(): void {
    this.cargarFuncionario()
    this.cargarFuncionariosDepa()
  }


  //Utilizar el LocalStorage es algo provicional, hay que pasar los objetos
  //de un modulo a otro
  cargarFuncionario(): void {
    this.modeloFuncionario = JSON.parse(localStorage.getItem("modeloFuncionario") || "");
  }

    //Pop up modificar funcionario a cargo

    openModalModFunc() {
      this.formModalModFunc.showModFunc();
     }
  
     showModalModFunc = -1;
  
     showModFunc(indexModFunc){
      this.showModalModFunc = indexModFunc;
    }
  
    closeModFunc(){
      this.showModalModFunc = -1;
    }

  filtrarFuncionariosEncargadosPorDepa(numDepartamentoParam: number) {
    console.log("Numero de departamento del funcionario" + numDepartamentoParam)
    // Obtenga todos los funcionarios en el departamento seleccionado del funcionario que inició sesión, sin incluirlo a él
    this.funcionariosEncargadosPorDepa = this.funcionarios.filter( 
      (f) => f.numDepartamento === numDepartamentoParam && f.idFuncionario !== this.modeloFuncionario.idFuncionario
    )
    console.log(this.funcionariosEncargadosPorDepa.toString())
  }
  
  cargarFuncionariosDepa() : void {
    console.log("Cargando funcionarios por depa")
    this.service.getFuncionarios()
    .subscribe(dataFunc => {
      this.funcionarios = dataFunc
      this.filtrarFuncionariosEncargadosPorDepa(this.modeloFuncionario.numDepartamento)
    })    
  }

  asignarSuplenteEncargado(idSuplente: String) {
    // Si el funcionario encargado quiere asignar a un suplente como encargado
    if (this.modeloFuncionario.encargado === "S") {
      this.service.actualizarEncargadoSi(idSuplente)
      .subscribe(data => {
        alert("¡Funcionario suplente asignado como encargado con éxito!")
        this.service.actualizarEncargadoNo(this.modeloFuncionario.idFuncionario)
        .subscribe(data => {

        })
      })
    }
    // O el caso donde un funcionario no esté como encargado y se quiera poner como encargado y quitar al suplente
    else {
      this.service.actualizarEncargadoSi(this.modeloFuncionario.idFuncionario)
      .subscribe(data => {
        alert("¡Usted ha sido asignado como encargado con éxito!")
        this.service.actualizarEncargadoNo(idSuplente)
        .subscribe(data => {

        })
      })
    }
  }
}