package com.backend.sagev.area;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/areas"})
public class AreaControlador {
    @Autowired
    AreaService service;

    @GetMapping
    public List<Area>listar() {
        return service.listar();
    }

    @PostMapping
    public Area agregar(@RequestBody Area a){
        return service.save(a);
    }
}
