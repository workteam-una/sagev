package com.backend.sagev.funcionario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioServicelmp implements FuncionarioService{
    // Esta clase posee la implementación de las funciones del service, con base en el repositorio

    @Autowired
    private FuncionarioRepositorio repositorio;

    @Override
    public List<Funcionario> listar() {
        return repositorio.findAll();
    }

    @Override
    public Funcionario listarIdFuncionario(String idFuncionario) {
        return repositorio.findByidFuncionario(idFuncionario);
    }

    @Override
    public Funcionario edit(Funcionario f) {
        return repositorio.save(f);
    }

    @Override
    public Funcionario delete(int idFuncionario) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
    @Override
    public Funcionario save(Funcionario f) {
        return repositorio.save(f);
    }
}
