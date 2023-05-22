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

  // Proyecto Backend
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

  getCitasReservadas(){
    return this.http.get<Cita[]>(this.url + "citas");
  }

  getCitasFuncionario(idFuncionario: String) {
    return this.http.get<Cita[]>(this.url + "citas" + "/funcionario/" + idFuncionario)
  }

  getCitasContribuyente(idContribuyente: String) {
    return this.http.get<Cita[]>(this.url + "citas" + "/contribuyente/" + idContribuyente)
  }

  guardarCita(cita: Cita) {
    return this.http.post<Cita>(this.url + "citas", cita);
  }

  actualizarEstadoCompletada(id: number){
    return this.http.put<number>(this.url + "citas" + "/completada/" + id, id);
  }

  actualizarEstadoAusente(id: number){
    return this.http.put<number>(this.url + "citas" + "/ausente/" + id, id);
  }

  actualizarEstadoCancelada(id: number){
    return this.http.put<number>(this.url + "citas" + "/cancelada/" + id, id)
  }

  actualizarEstadoReagendada(id: number){
    return this.http.put<number>(this.url + "citas" + "/reagendada/" + id, id)
  }

  // CitasTemp 

  getCitasTempReservadas(){
    return this.http.get<Cita[]>(this.url + "citasTemp");
  }

  getCitasTempFuncionario(idFuncionario: String) {
    return this.http.get<Cita[]>(this.url + "citasTemp" + "/funcionario/" + idFuncionario)
  }

  getCitasTempContribuyente(idContribuyente: String) {
    return this.http.get<Cita[]>(this.url + "citasTemp" + "/contribuyente/" + idContribuyente)
  }

  guardarCitaTemp(cita: Cita) {
    return this.http.post<Cita>(this.url + "citasTemp", cita);
  }

  actualizarEstadoCompletadaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/completada/" + id, id);
  }

  actualizarEstadoAusenteTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/ausente/" + id, id);
  }

  actualizarEstadoCanceladaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/cancelada/" + id, id)
  }

  actualizarEstadoReagendadaTemp(id: number){
    return this.http.put<number>(this.url + "citasTemp" + "/reagendada/" + id, id)
  }

  // -------------------------------------------------------------------------

  actualizarEncargadoSi(id: String) {
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/si/" + id, id);
  }

  actualizarEncargadoNo(id: String) {
    return this.http.put<String>(this.url + "funcionarios" + "/encargado/no/" + id, id);
  }

  guardarFuncionario(func: Funcionario){
    return this.http.post<Funcionario>(this.url + "funcionarios", func);
  }

  guardarArea(area: Area) {
    return this.http.post<Area>(this.url + "areas", area)
  }

  guardarDepartamentos(departamento: Departamento) {
    return this.http.post<Departamento>(this.url + "departamentos", departamento)
  }

  cambiarContraFunc(funcionariomodelo: Funcionario) {
    return this.http.put<Funcionario>(this.url + "funcionarios" + "/newcontra", funcionariomodelo)
  }

  enviaCorreo (correo:Correo){
    return this.http.post<Correo>(this.url + "mail" + "/sendemail", correo)
  }
}
