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

  // Tiene el id y contraseña digitado en los campos de texto
  modeloFuncionario: Funcionario = new Funcionario()

  // Al validarse las credenciales se carga con todos los datos del funcionario
  modeloFuncionarioCargado: Funcionario = new Funcionario()

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    
  }

  /* 
    Obtiene el id del funcionario del campo de texto y lo busca en la base de datos.
    Una vez que encuentra al funcionario, valida si la contraseña es correcta apoyandose en una
    llamada al método "validarCredenciales()" para hacer el forward a la vista del funcionario.
  */
  obtenerFuncionario(): void {
    // Guardando el id del textfield de login
    let id: String = this.modeloFuncionario.idFuncionario
      this.service.getFuncionarioId(id)
      .subscribe(data => {
        this.modeloFuncionarioCargado = data
        // Este try está validando la existencia del id del funcionario
        try {
          this.validarCredenciales();
        }
        catch (error) {
          //Se debe sustituir por un pop-up
          alert("La cédula o contraseña son incorrectas")
        }
      });
  }

  // Valida tanto el id como la contraseña del funcionario
  validarCredenciales(): void {
    let idMal: Boolean;
    let passwordMal: Boolean;
    if(this.modeloFuncionarioCargado === null){idMal = true};
    if(this.modeloFuncionarioCargado.contrasenna != this.modeloFuncionario.contrasenna){passwordMal = true};
    if(idMal || passwordMal) {
      //Se debe sustituir por un pop-up
      alert("La cédula o contraseña son incorrectas")
      return;
    }

    if(this.modeloFuncionarioCargado.administrador === 'S'){
      this.guardarLocalStorage(this.modeloFuncionarioCargado);
      // Forward a la vista del funcionario
      this.router.navigate(["administrador"])
  }else{
      this.guardarLocalStorage(this.modeloFuncionarioCargado);
      // Forward a la vista del funcionario
      this.router.navigate(["citasFunc"])
  }
  }

  // Guardar el objeto funcionario en el local storage del navegador
  guardarLocalStorage(funclogeado: Funcionario): void {
    this.modeloFuncionario = funclogeado;
    this.modeloFuncionario.contrasenna = "";
    localStorage.setItem("modeloFuncionario",JSON.stringify(this.modeloFuncionario));
  }

}
