package com.backend.sagev.cita;
import java.util.List;
import org.springframework.data.repository.Repository;

public interface CitaRepositorio extends Repository<Cita, Integer>{

    List<Cita>findAll();
    List<Cita>findByidFuncionario(int idFuncionario);
    Cita findByid(int id);
    Cita save(Cita c);
    Cita delete(Cita c);

}