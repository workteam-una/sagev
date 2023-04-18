package com.backend.sagev.departamento;

import javax.persistence.*;

@Entity
@Table(name = "Departamento")
public class Departamento {
    @Id
    @Column(name = "NumDepartamento")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int numDepartamento;

    @Column(name = "NumArea")
    private int numArea;

    @Column(name = "Descripcion")
    private String descripcion;

    @Column(name = "Nombre")
    private String nombre;

    public int getNumDepartamento() {
        return numDepartamento;
    }

    public void setNumDepartamento(int numDepartamento) {
        this.numDepartamento = numDepartamento;
    }

    public int getNumArea() {
        return numArea;
    }

    public void setNumArea(int numArea) {
        this.numArea = numArea;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
