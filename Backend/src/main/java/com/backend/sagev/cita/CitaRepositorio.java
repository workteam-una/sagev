package com.backend.sagev.cita;
import java.util.List;
import org.springframework.data.repository.Repository;

public interface CitaRepositorio extends Repository<Cita, Integer>{

    List<Cita>findAll();
    // Retorna las citas de un funcionario en específico y las ordena por fecha de forma ascendente
    List<Cita>findByidFuncionarioOrderByFecha(String idFuncionario);
    Cita findByid(int id);
    Cita save(Cita c);
    Cita delete(Cita c);
}