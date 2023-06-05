package com.backend.sagev.funcionario;

import javax.persistence.*;

@Entity
@Table(name = "Funcionario")
public class Funcionario {

    @Id
    @Column(name = "IdFuncionario") String idFuncionario;

    @Column(name = "NumDepartamento")
    private int numDepartamento;

    @Column(name = "Correo")
    private String correo;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Apellido1")
    private String apellido1;

    @Column(name = "Apellido2")
    private String apellido2;

    @Column(name = "Contrasenna")
    private String contrasenna;

    @Column(name = "Encargado")
    private String encargado;

    @Column(name = "Suplente")
    private String suplente;

    @Column(name = "Administrador")
    private String administrador;

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public int getNumDepartamento() {
        return numDepartamento;
    }

    public void setNumDepartamento(int numDepartamento) {
        this.numDepartamento = numDepartamento;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getContrasenna() {
        return contrasenna;
    }

    public void setContrasenna(String contrasenna) {
        this.contrasenna = contrasenna;
    }

    public String getEncargado() {
        return encargado;
    }

    public void setEncargado(String encargado) {
        this.encargado = encargado;
    }

    public String getSuplente() {
        return suplente;
    }

    public void setSuplente(String suplente) {
        this.suplente = suplente;
    }

    public String getAdministrador() {
        return administrador;
    }

    public void setAdministrador(String administrador) {
        this.administrador = administrador;
    }
}