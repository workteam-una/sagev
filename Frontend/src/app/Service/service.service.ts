import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../SAGEV/modelo/area';
import { Departamento } from '../SAGEV/modelo/departamento';
import { Funcionario } from '../SAGEV/modelo/funcionario';
import { Cita } from '../SAGEV/modelo/cita';

@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  constructor(private http: HttpClient) { }

  //proyecto backend
  url = 'http://localhost:8080/sagev/';

  getAreas(){
    return this.http.get<Area[]>(this.url + "areas");
  }

  getDepartamentos(){
    // console.log(this.url + "departamentos");
    return this.http.get<Departamento[]>(this.url + "departamentos");
  }

  getFuncionarios(){
    return this.http.get<Funcionario[]>(this.url + "funcionarios");
  }

  getFuncionarioId(id: String) {
    return this.http.get<Funcionario>(this.url + "funcionarios" + "/" + id);
  }

  getCitasFuncionario(idFuncionario: String) {
    return this.http.get<Cita[]>(this.url + "citas" + "/funcionario/" + idFuncionario)
  }

  guardarCita(cita: Cita) {
    return this.http.post<Cita>(this.url + "citas", cita);
  }

  guardarFuncionario(func: Funcionario){
    return this.http.post<Funcionario>(this.url + "funcionarios", func);
  }

  actualizarEstadoCompletada(id: number){
    return this.http.put<number>(this.url + "citas" + "/completada/" + id, id);
  }

  actualizarEstadoAusente(id: number){
    return this.http.put<number>(this.url + "citas" + "/ausente/" + id, id);
  }

  actualizarEncargadoSi(id: String) {
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/si/" + id, id);
  }

  actualizarEncargadoNo(id: String) {
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/no/" + id, id);
  }
}
