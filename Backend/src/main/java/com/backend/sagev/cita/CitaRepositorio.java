package com.backend.sagev.cita;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import net.bytebuddy.asm.Advice.Local;

public interface CitaRepositorio extends Repository<Cita, Integer>{

    // @Query(value = "SELECT * FROM tutorials", nativeQuery = true)
    List<Cita>findAll();
    // Retorna las citas de un funcionario en específico y las ordena por fecha de forma ascendente
    List<Cita>findByidFuncionarioOrderByFecha(String idFuncionario);
    List<Cita>findByidContribuyenteOrderByFecha(String idContribuyente);
    // Retorna las citas de funcionario en específico y las filtra según un rango de fechas
    // List<Cita>findByFechaBetween(String fechaInicial, String fechaFinal);
    Cita findByid(int id);
    Cita save(Cita c);
    Cita delete(Cita c);
}