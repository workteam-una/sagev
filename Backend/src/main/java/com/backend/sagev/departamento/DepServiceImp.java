package com.backend.sagev.departamento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepServiceImp implements DepService {

    @Autowired
    private DepRepositorio repositorio;

    @Override
    public List<Departamento> listar() {
        return repositorio.findAll();
    }

    @Override
    public Departamento listarNumDepartamento(int numDepartamento) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    // @Override
    // public Departamento add(Departamento d) {
    //     return repositorio.add(d);
    // }

    @Override
    public Departamento delete(int numDepartamento) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Departamento edit(Departamento d) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Departamento save(Departamento d) {
        return repositorio.save(d);
    }
}
