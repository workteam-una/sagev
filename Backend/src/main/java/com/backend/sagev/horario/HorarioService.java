package com.backend.sagev.horario;

import java.util.List;

public interface HorarioService {
    List<Horario>listar();
    Horario listarIdHorario(int id);
    Horario save(Horario h);
    Horario edit(Horario h);
    Horario delete(int id);
}
