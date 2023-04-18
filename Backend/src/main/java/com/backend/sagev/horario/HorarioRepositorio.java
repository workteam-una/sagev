package com.backend.sagev.horario;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface HorarioRepositorio extends Repository<Horario, Integer>{
    List<Horario>findAll();
    Horario findByid(int id);
    Horario save(Horario h);
    void delete(Horario h);
    // Horario add(Horario h);
}