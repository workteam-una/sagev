package com.backend.sagev.funcionario;

import java.util.List;

public interface FuncionarioService {
    // Estas son las funciones que se van ejecutar desde el controlador

    List<Funcionario>listar();
    Funcionario listarIdFuncionario(String idFuncionario);
    Funcionario edit(Funcionario f);
    Funcionario delete(int idFuncionario);
    Funcionario save(Funcionario f);
}
