package com.backend.sagev.area;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:4200",
                        "http://10.10.11.29:4200",
                        "http://localhost:8055",
                        "http://10.10.11.29:8055"}, 
                        allowedHeaders = "*",maxAge = 3600)
@RestController
@RequestMapping({"/areas"})
public class AreaControlador {
    // Esta clase es la que recibe las consultas desde el frontend

    @Autowired
    AreaService service;

    // Obtiene todas las áreas de la tabla Area de la base de datos
    @GetMapping
    public List<Area>listar() {
        return service.listar();
    }

    // Agrega una nueva área a la base de datos
    @PostMapping
    public Area agregar(@RequestBody Area a){
        return service.save(a);
    }
}
