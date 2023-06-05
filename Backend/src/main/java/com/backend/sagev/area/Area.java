package com.backend.sagev.area;

import javax.persistence.*;

@Entity
@Table(name = "Area")
public class Area {
    
    // Notas:
    // Tiene que coincidir el column(name = ...) con el nombre de la columna en la base de datos
    // Al poner "numArea" en camelCase en la propiedad "name" de "@Column", Springboot lo va a leer como snake_case, ej. "num_area".
    // La creación de los setters y getters es importante para agregar la información del objeto en los querys 

    @Id
    @Column(name = "numArea")
    private int numArea;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    public int getNumArea() {
        return numArea;
    }

    public void setNumArea(int numArea) {
        this.numArea = numArea;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}