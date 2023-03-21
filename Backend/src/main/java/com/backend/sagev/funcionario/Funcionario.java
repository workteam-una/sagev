package com.backend.sagev.funcionario;
import javax.persistence.*;

//Hola: Para entender un backend deje unas notas que dicen de que se trata cada clase.
//Tambien es importante avisar que revisen las clases en este orden:
//1 modelo(esta) , 2 repositorio, 3 service, 4 serviceImp, 5 controlador


//Que hace esta clase?: Esta es la clase principal, la tipica clase JAVA de un objeto
    //Con la diferencia de que esta clase con el @Colum puede distingir que ese
    //atributo esta en la base de datos.

@Entity
@Table(name = "Funcionario")
public class Funcionario {

    @Id
    @Column(name = "IdFuncionario")
    private String idFuncionario;

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

    // @Column( name = "Administrador")
    // private Boolean administrador;

    // public Boolean getAdmin() {
    //     return administrador;
    // }

    // public void setAdmin(Boolean administrador) {
    //     this.administrador = administrador;
    // }

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
}