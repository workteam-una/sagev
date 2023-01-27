package com.backend.sagev.horario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HorarioServiceImp implements HorarioService{
    @Autowired
    private HorarioRepositorio repositorio;

    @Override
    public List<Horario> listar() {
        return repositorio.findAll();
    }

    @Override
    public Horario listarIdHorario(int id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Horario save(Horario h) {
        return repositorio.save(h);
    }

    @Override
    public Horario edit(Horario h) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Horario delete(int id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


}
