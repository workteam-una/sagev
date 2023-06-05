package com.backend.sagev.departamento;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface DepRepositorio extends Repository<Departamento, Integer>{
    
    List<Departamento>findAll();

    //Por alguna razon descomentar esta linea 
    //me esta ocasionando un NotFoundException
    //Departamento add(Departamento d);
    Departamento save(Departamento d);
    Departamento delete(Departamento d);

}
