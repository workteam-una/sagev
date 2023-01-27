package com.backend.sagev.area;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AreaServiceImp implements AreaService{
    @Autowired
    private AreaRepositorio repositorio;

    @Override
    public List<Area> listar() {
        return repositorio.findAll();
    }

    @Override
    public Area listarNumArea(int numArea) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Area add(Area a) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Area delete(int numArea) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Area edit(Area a) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
