package com.backend.sagev.cita;

import java.util.List;
import org.springframework.data.repository.Repository;

public interface CitaRepositorio extends Repository<Cita, Integer>{
    //Estos son las funciones que ejecutan los querys directamente en la base de datos

    List<Cita>findAll();
    // Retorna las citas de un funcionario en específico y las ordena por fecha de forma ascendente
    List<Cita>findByidFuncionarioOrderByFecha(String idFuncionario);
    List<Cita>findByidContribuyenteOrderByFecha(String idContribuyente);
    Cita findByid(int id);
    Cita save(Cita c);
    Cita delete(Cita c);
}