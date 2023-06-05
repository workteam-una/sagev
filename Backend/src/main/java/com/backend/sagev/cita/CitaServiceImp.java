package com.backend.sagev.cita;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitaServiceImp implements CitaService {
    // Esta clase posee la implementación de las funciones del service, con base en el repositorio

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
    public List<Cita> listarIdContribuyente(String idContribuyente) {
        return repositorio.findByidContribuyenteOrderByFecha(idContribuyente);
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
        throw new UnsupportedOperationException("Not supported yet.");
    }
}