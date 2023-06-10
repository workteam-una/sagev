import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../SAGEV/modelo/area';
import { Departamento } from '../SAGEV/modelo/departamento';
import { Funcionario } from '../SAGEV/modelo/funcionario';
import { Cita } from '../SAGEV/modelo/cita';
import { Correo } from '../SAGEV/modelo/correo';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  constructor(private http: HttpClient) { }

  // Endpoint para comunicarse con el backend
  url = 'http://localhost:8055/sagev/'

  // Obtiene las áreas de la municipalidad
  getAreas(){
    return this.http.get<Area[]>(this.url + "areas")
  }

  // Obtiene todos los departamentos de la municipalidad
  getDepartamentos(){
    return this.http.get<Departamento[]>(this.url + "departamentos")
  }

  // Obtiene todos los funcionarios de la municipalidad
  getFuncionarios(){
    return this.http.get<Funcionario[]>(this.url + "funcionarios")
  }

  // Obtiene un funcionario por el número de identificación
  getFuncionarioId(id: String){
    return this.http.get<Funcionario>(this.url + "funcionarios" + "/" + id)
  }

  // La tabla "Citas" almacena todas las citas existentes 

  // Obtiene las citas que han sido reservadas
  getCitasReservadas(){
    return this.http.get<Cita[]>(this.url + "citas")
  }

  // Obtiene las citas de un funcionario en específico a través de su identificación
  getCitasFuncionario(idFuncionario: String){
    return this.http.get<Cita[]>(this.url + "citas" + "/funcionario/" + idFuncionario)
  }

  // Obtiene las citas de un contribuyente en específico a través de u identificación
  getCitasContribuyente(idContribuyente: String){
    return this.http.get<Cita[]>(this.url + "citas" + "/contribuyente/" + idContribuyente)
  }

  // Ingresa una cita en la base de datos
  guardarCita(cita: Cita){
    return this.http.post<Cita>(this.url + "citas", cita)
  }

  // La tabla "CitasTemp" almacena todas las citas reservadas que van a ser limpiadas mensualmente

  // Obtiene las citas que han sido reservadas en la tabla de citas temporales
  getCitasTempReservadas(){
    return this.http.get<Cita[]>(this.url + "citasTemp")
  }

  // Obtiene las citas de un funcionario en específico a través de su identificación
  getCitasTempFuncionario(idFuncionario: String){
    return this.http.get<Cita[]>(this.url + "citasTemp" + "/funcionario/" + idFuncionario)
  }

  // Obtiene las citas de un contribuyente en específico a través de u identificación
  getCitasTempContribuyente(idContribuyente: String){
    return this.http.get<Cita[]>(this.url + "citasTemp" + "/contribuyente/" + idContribuyente)
  }

  // Ingresa una cita en la tabla de citas temporales de la base de datos 
  guardarCitaTemp(cita: Cita){
    return this.http.post<Cita>(this.url + "citasTemp", cita)
  }

  // Ubica una cita en la tabla de citas temporales de la base de datos con base en su id y actualiza su estado a "completada"
  actualizarEstadoCompletadaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/completada/" + id, id)
  }

  // Ubica una cita en la tabla de citas temporales de la base de datos con base en su id y actualiza su estado a "ausente"
  actualizarEstadoAusenteTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/ausente/" + id, id)
  }

  // Ubica una cita en la tabla de citas temporales de la base de datos con base en su id y actualiza su estado a "cancelada"
  actualizarEstadoCanceladaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/cancelada/" + id, id)
  }

  // Ubica una cita en la tabla de citas temporales de la base de datos con base en su id y actualiza su estado a "reagendada"
  actualizarEstadoReagendadaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/reagendada/" + id, id)
  }

  // Actualiza el estado de "Encargado" del funcionario a "S" (Si)
  actualizarEncargadoSi(id: String){
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/si/" + id, id)
  }

  // Actualiza el estado de "Encargado" del funcionario a "N" (No)
  actualizarEncargadoNo(id: String){
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/no/" + id, id)
  }

  // Almacena un nuevo funcionario en la base de datos
  guardarFuncionario(func: Funcionario){
    return this.http.post<Funcionario>(this.url + "funcionarios", func)
  }

  // Almacena una nueva área en la base de datos
  guardarArea(area: Area) {
    return this.http.post<Area>(this.url + "areas", area)
  }

  // Almacena un nuevo departamento en la base de datos
  guardarDepartamentos(departamento: Departamento) {
    return this.http.post<Departamento>(this.url + "departamentos", departamento)
  }

  // Actualiza la contraseña de un funcionario
  cambiarContraFunc(funcionariomodelo: Funcionario) {
    return this.http.put<Funcionario>(this.url + "funcionarios" + "/newcontra", funcionariomodelo)
  }

  // Se contacta con el backend para que a través de la API de Java Mail envíe un correo con el contenido deseado
  enviaCorreo (correo: Correo){
    return this.http.post<Correo>(this.url + "mail" + "/sendemail", correo)
  }

  // Estos métodos están comentados porque ya no se utilizan. No se borran en caso de que se necesiten a futuro.

  // // Ubica una cita en la tabla Cita de la base de datos y actualiza su estado a "completada"
  // actualizarEstadoCompletada(id: number){
  //   return this.http.put<number>(this.url + "citas" + "/completada/" + id, id);
  // }

  // // Ubica una cita en la tabla Cita de la base de datos y actualiza su estado a "ausente"
  // actualizarEstadoAusente(id: number){
  //   return this.http.put<number>(this.url + "citas" + "/ausente/" + id, id);
  // }

  // // Ubica una cita en la tabla Cita de la base de datos y actualiza su estado a "cancelada"
  // actualizarEstadoCancelada(id: number){
  //   return this.http.put<number>(this.url + "citas" + "/cancelada/" + id, id)
  // }

  // // Ubica una cita en la tabla Cita de la base de datos y actualiza su estado a "reagendada"
  // actualizarEstadoReagendada(id: number){
  //   return this.http.put<number>(this.url + "citas" + "/reagendada/" + id, id)
  // }
}
