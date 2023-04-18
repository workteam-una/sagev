package com.backend.sagev.funcionario;

import java.util.List;

// ¿Qué hace esta interfaz?: La interfas Service aparentemente encapsula los metodos CRUD
// por defecto que tiene Springboot en la clase Repository. De paso esta
// clase sirve para ponerle los nombres que yo quiera a los metodos CRUD
// es como las clases DAO que haciamos en progra 4

public interface FuncionarioService {
    List<Funcionario>listar();
    Funcionario listarIdFuncionario(String idFuncionario);
    // Funcionario add(Funcionario f);
    Funcionario edit(Funcionario f);
    Funcionario delete(int idFuncionario);
    Funcionario save(Funcionario f);
}
