package com.backend.sagev.cita;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface CitaService {
    List<Cita> listar();
    List<Cita> listarIdFuncionario(String idFuncionario);
    List<Cita> listarIdContribuyente(String idContribuyente);
    // List<Cita> listarRangoFechas(String fechaInicial, String fechaFinal);
    Cita listarId(int id);
    Cita save(Cita c);
    Cita edit(Cita c);
    Cita delete(int id);
    // Cita add(Cita c);
}