package com.backend.sagev.citaTemp;

import java.util.List;

public interface CitaTempService {
    List<CitaTemp> listar();
    List<CitaTemp> listarIdFuncionario(String idFuncionario);
    List<CitaTemp> listarIdContribuyente(String idContribuyente);
    // List<Cita> listarRangoFechas(String fechaInicial, String fechaFinal);
    CitaTemp listarId(int id);
    CitaTemp save(CitaTemp c);
    CitaTemp edit(CitaTemp c);
    CitaTemp delete(int id);
    // Cita add(Cita c);
}
