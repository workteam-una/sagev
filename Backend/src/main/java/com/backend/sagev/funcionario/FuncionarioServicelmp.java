package com.backend.sagev.funcionario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//Que hace esta clase?: En esta clase nada mas se desarrolla los metodos de la interfaz
// FuncionarioService

@Service
public class FuncionarioServicelmp implements FuncionarioService{

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

    // @Override
    // public Funcionario add(Funcionario f) {
    //     return repositorio.add(f);
    // }

    @Override
    public Funcionario edit(Funcionario f) {
        return repositorio.save(f);
    }

    @Override
    public Funcionario delete(int idFuncionario) {
        throw new UnsupportedOperationException("Para sagev: aun no implementamos esto.");
    }
    
    @Override
    public Funcionario save(Funcionario f) {
        return repositorio.save(f);
    }
}
