import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../modelo/funcionario';


@Component({
  selector: 'app-citas-funcionario',
  templateUrl: './citas-funcionario.component.html',
  styleUrls: ['./citas-funcionario.component.css']
})
export class CitasFuncionarioComponent implements OnInit {


  constructor() { }
  modeloFuncionario: Funcionario = new Funcionario()
  
  ngOnInit(): void {
    this.cargarFuncionario();
  }

  //Utilizar el LocalStorage es algo provicional, hay que pasar los objetos
  //de un modulo a otro
  cargarFuncionario(): void {
    this.modeloFuncionario = JSON.parse(localStorage.getItem("modeloFuncionario") || "");
  }

}
