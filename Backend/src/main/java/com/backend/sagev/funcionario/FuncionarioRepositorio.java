package com.backend.sagev.funcionario;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface FuncionarioRepositorio extends Repository<Funcionario, Integer>{
    // Estos son las funciones que ejecutan los querys directamente en la base de datos

    List<Funcionario>findAll();
    // findBy(variable) luego del "By" se coloca el nombre de la variable
    Funcionario findByidFuncionario(String idFuncionario);
    Funcionario save(Funcionario a);
    void delete(Funcionario a);
}


