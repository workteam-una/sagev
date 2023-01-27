package com.backend.sagev.departamento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/departamentos"})
public class DepControlador {
    @Autowired
    DepService service;

    @GetMapping
    public List<Departamento>listar(){
        return service.listar();
    }
}
