package com.backend.sagev.area;

import java.util.List;

public interface AreaService {
    // Estas son las funciones que se van ejecutar desde el controlador

    List<Area>listar();
    Area listarNumArea(int numArea);
    Area edit(Area a);
    Area delete(int numArea);
    Area save(Area a);
}
