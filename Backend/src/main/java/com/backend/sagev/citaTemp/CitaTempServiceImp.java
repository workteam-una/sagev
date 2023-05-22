package com.backend.sagev.citaTemp;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class CitaTempServiceImp implements CitaTempService {
    @Autowired
    private CitaTempRepositorio repositorio;

    @Override
    public List<CitaTemp> listar(){
        return repositorio.findAll();
    }

    @Override
    public List<CitaTemp> listarIdFuncionario(String idFuncionario) {
        return repositorio.findByidFuncionarioOrderByFecha(idFuncionario);
    }

    @Override
    public List<CitaTemp> listarIdContribuyente(String idContribuyente) {
        return repositorio.findByidContribuyenteOrderByFecha(idContribuyente);
    }

    @Override
    public CitaTemp listarId(int id) {   return repositorio.findByid(id);
    }

    @Override
    public CitaTemp save(CitaTemp c) {
        return repositorio.save(c);
    }

    @Override
    public CitaTemp edit(CitaTemp c) {
        return repositorio.save(c);
    }

    @Override
    public CitaTemp delete(int id) {
        throw new UnsupportedOperationException("Para sagev: aun no implementamos esto.");
    }
}
