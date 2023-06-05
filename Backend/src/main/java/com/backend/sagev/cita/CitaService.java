package com.backend.sagev.cita;

import java.util.List;

public interface CitaService {
    // Estas son las funciones que se van ejecutar desde el controlador

    List<Cita> listar();
    List<Cita> listarIdFuncionario(String idFuncionario);
    List<Cita> listarIdContribuyente(String idContribuyente);
    Cita listarId(int id);
    Cita save(Cita c);
    Cita edit(Cita c);
    Cita delete(int id);
}