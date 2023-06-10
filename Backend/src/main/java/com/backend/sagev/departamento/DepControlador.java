package com.backend.sagev.departamento;

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
@RequestMapping({"/departamentos"})
public class DepControlador {
    // Esta clase es la que recibe las consultas sobre departamentos, desde el frontend

    @Autowired
    DepService service;

    // Obtiene todos los departamentos para mostrarlos en 
    // el select de reserva y agregar un nuevo funcionario
    @GetMapping
    public List<Departamento>listar(){
        return service.listar();
    }
    // Agerga un nuevo departamento
    @PostMapping
    public Departamento agregar(@RequestBody Departamento d){
        return service.save(d);
    }

}
