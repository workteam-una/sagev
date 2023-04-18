package com.backend.sagev.area;

import javax.persistence.*;

//Aparentemente SpringBoot tiene muchas cosas que no son case sensitive
//por ejemplo, ignora las mayusculas. Tambien salta ciertos caracteres

@Entity
@Table(name = "Area")
public class Area {
    
    //Estas variables necesitan cumplir con los estandares.
    //Lo que pasa es que creo que los nombres de las variables
    //deben coincidir con los nombres de la tabla en la base de
    //datos, y los estandares en ambos lugares son distintos.
    //Eventualmente se tendria que decidir entre un nombre u otro.
    //ACTUALIZACION: No necesariamente tienen que coincidir las variables
    //mas que todo tiene que coincidir el column(name = (nombre)).

    //El contenido de la anotacion GeneratedValue se cambio. 
    //strategy ahora es igual a GenerationType.AUTO
    //tentativamente esto puede fallar

    //Al poner "numArea" asi en camelCase en la propiedad name de 
    //@Column Springboot lo va a leer como snake_case, ej. "num_area". 
    //Entonces las columnas en la base de datos tienen que estar de esa forma.

    @Id
    @Column(name = "numArea")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int numArea;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    //El get es el que asigna el nombre con el que se va a enviar la 
    //variable en el archivo JSON Ej. Si yo tuviera getNumArea() en el 
    //JSON se va a guardar en camelCase, entonces como en Angular el 
    //standard que se va a manejar en TS tambien es de camelCase para 
    //las variables entonces se puede dejar asi como en el ejemplo.
    //Hago el comentario de TS porque Angular, las variables de las 
    //clases modelo tienen que tener el mismo nombre que en el JSON.
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