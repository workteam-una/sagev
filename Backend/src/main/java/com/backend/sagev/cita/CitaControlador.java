package com.backend.sagev.cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/citas"})
public class CitaControlador {
    @Autowired
    CitaService service;

    @GetMapping
    public List<Cita>listar(){
        return service.listar();
    }

    @GetMapping(path = {"/funcionario/{idFuncionario}"})
    public List<Cita>listarIdFuncionario(@PathVariable("idFuncionario") int idFuncionario){
        return service.listarIdFuncionario(idFuncionario);
    }

    @PostMapping
    public Cita agregar(@RequestBody Cita c){
        return service.save(c);
    }

    //Es un busca retorna por el id
    @GetMapping(path = {"/{id}"})
    public Cita getById(@PathVariable("id") int id){
        return service.listarId(id);
    }

    @PutMapping(path = {"/{id}"})
    public Cita editar(@PathVariable("id") int id){
        Cita cita = service.listarId(id);
        cita.setEstado("Completada");
        return service.edit(cita);
    }
}