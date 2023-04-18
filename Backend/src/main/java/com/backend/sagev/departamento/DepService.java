package com.backend.sagev.departamento;

import java.util.List;

public interface DepService {
    List<Departamento>listar();
    Departamento listarNumDepartamento(int numDepartamento);
    // Departamento add(Departamento d);
    Departamento edit(Departamento d);
    Departamento delete(int numDepartamento);
    Departamento save(Departamento d);
}
