package com.backend.sagev.area;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface AreaRepositorio extends Repository<Area, Integer>{
    // Estos son las funciones que ejecutan los querys directamente en la base de datos

    List<Area>findAll();
    
    // findBy(variable) luego del "By" se coloca el nombre de la variable
    Area findBynumArea(int numArea);
    Area save(Area a);
    void delete(Area a);
}
