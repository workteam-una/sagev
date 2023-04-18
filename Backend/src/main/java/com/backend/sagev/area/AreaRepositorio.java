package com.backend.sagev.area;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface AreaRepositorio extends Repository<Area, Integer>{
    //No comprendo porque en los parametros de Repository se coloca
    //Integer junto a Area, en el video se explica que en el segundo
    //parametro se especifica el tipo del objeto, entonces esta extraño
    List<Area>findAll();
    //findBy(variable) luego del "By" se coloca el nombre de la variable
    //por la que se va a ir a ubicar el objeto. (por esto el error de 4h ;-;)
    Area findBynumArea(int numArea);
    Area save(Area a);
    void delete(Area a);
    // Area add(Area a);
}
