package com.backend.sagev.cita;

import java.util.List;

public interface CitaService {
    List<Cita> listar();
    List<Cita> listarIdFuncionario(int idFuncionario);
    Cita listarId(int id);
    Cita save(Cita c);
    Cita edit(Cita c);
    Cita delete(int id);
}