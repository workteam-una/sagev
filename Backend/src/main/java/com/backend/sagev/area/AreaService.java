package com.backend.sagev.area;

import java.util.List;

public interface AreaService {
    List<Area>listar();
    Area listarNumArea(int numArea);
    Area add(Area a);
    Area edit(Area a);
    Area delete(int numArea);
}
