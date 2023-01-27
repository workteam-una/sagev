import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Funcionario } from '../../modelo/funcionario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modeloFuncionario: Funcionario = new Funcionario()
  modeloFuncionarioCargado: Funcionario = new Funcionario()

  imprimir(): void {
    console.log(this.modeloFuncionario)
  }

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    
  }

  obtenerFuncionario(): void {
    //Guardando el id del textfield de login
    let id = this.modeloFuncionario.idFuncionario
    this.service.getFuncionarioId(id)
    .subscribe(data => {
      this.modeloFuncionarioCargado = data
      console.log("Funcionario Obtenido --->"+ this.modeloFuncionarioCargado.nombre + " " + this.modeloFuncionarioCargado.contrasenna);
      this.validarCredenciales();
      /*Arreglar: ValidarCredenciales deberia llamar a obtenerFuncionario y no al reves
      pero si lo hago asi como esta, validarCredenciales no espera a que obtnerFuncionario cumpla su promesa de retornar un funcionario
      le pasa por encima, hay que hacer que lo espere*/
    });
    //Forward a la vista del funcionario
    this.router.navigate(["citasFunc"])
    
  }

  validarCredenciales(): void {
    console.log("Funcionario a Validar --->"+ this.modeloFuncionarioCargado.nombre + " " + this.modeloFuncionarioCargado.contrasenna);
    console.log("Funcionario a Comparar --->"+ this.modeloFuncionario.nombre + " " + this.modeloFuncionario.contrasenna);

    let idmal: Boolean;
    let passwordmal: Boolean;
    if(this.modeloFuncionarioCargado === null){idmal = true};
    if(this.modeloFuncionarioCargado.contrasenna != this.modeloFuncionario.contrasenna){passwordmal = true};

    if(idmal || passwordmal){
      //Aqui hay sustituir ese alert por algo mas bonito
      alert("La cedula o contraseña estan mal")
      return;
    }
    //Usar el LocalStorage es algo provicional, hay que mandar un objeto de un modulo a otro
    this.guardarLocalStorage(this.modeloFuncionarioCargado);

    //Aqui se pasa a la otra vista
    
  }

  guardarLocalStorage(funclogeado: Funcionario){
    this.modeloFuncionario = funclogeado;
    this.modeloFuncionario.contrasenna = "";
    localStorage.setItem("modeloFuncionario",JSON.stringify(this.modeloFuncionario));
  }

}
