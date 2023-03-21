package com.backend.sagev.cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitaServiceImp implements CitaService {

    @Autowired
    private CitaRepositorio repositorio;

    @Override
    public List<Cita> listar() {
        return repositorio.findAll();
    }

    @Override
    public List<Cita> listarIdFuncionario(String idFuncionario) {
        return repositorio.findByidFuncionarioOrderByFecha(idFuncionario);
    }

    @Override
    public Cita listarId(int id) {
        return repositorio.findByid(id);
    }

    @Override
    public Cita save(Cita c) {
        return repositorio.save(c);
    }

    @Override
    public Cita edit(Cita c) {
        return repositorio.save(c);
    }

    @Override
    public Cita delete(int id) {
        throw new UnsupportedOperationException("Para sagev: aun no implementamos esto.");
    }
}