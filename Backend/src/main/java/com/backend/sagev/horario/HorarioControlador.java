package com.backend.sagev.horario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/horarios"})
public class HorarioControlador {
    @Autowired
    HorarioService service;

    @GetMapping
    public List<Horario>listar(){
        return service.listar();
    }

    @PostMapping
    public Horario agregar(@RequestBody Horario h){
        return service.save(h);
    }

    
}
