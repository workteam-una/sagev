package com.backend.sagev.cita;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
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

    //Devuelve todas las citas
    @GetMapping
    public List<Cita>listar(){
        return service.listar();
    }

    //Devuelve las citas reservadas con un funcionario
    @GetMapping(path = {"/funcionario/{idFuncionario}"})
    public List<Cita>listarIdFuncionario(@PathVariable("idFuncionario") String idFuncionario){
        return service.listarIdFuncionario(idFuncionario);
    }

    //Devuelve las citas reservadas con un contribuyente
    @GetMapping(path = {"/contribuyente/{idContribuyente}"})
    public List<Cita>listarIdContribuyente(@PathVariable("idContribuyente") String idContribuyente){
        return service.listarIdContribuyente(idContribuyente);
    }

    // @GetMapping(path = {"/filtradas/{fechaInicial}/{fechaFinal}"})
    // public List<Cita>listarRangoFechas(@PathVariable("fechaInicial") String fechaInicial, @PathVariable("fechaFinal") String fechaFinal) {
    //     //parsea la fecha de string a fecha

    //     return service.listarRangoFechas(fechaInicial, fechaFinal);
    // }

    //Guarda la cita en la BD
    @PostMapping
    public Cita agregar(@RequestBody Cita c){
        return service.save(c);
    }

    //Es un busca retorna por el id
    @GetMapping(path = {"/{id}"})
    public Cita getById(@PathVariable("id") int id){
        return service.listarId(id);
    }

    //Marca la cita como completada
    @PutMapping(path = {"/completada/{id}"})
    public Cita completada(@PathVariable("id") int id){
        Cita cita = service.listarId(id);
        cita.setEstado("Completada");
        return service.edit(cita);
    }

    //Marca la cita como ausente
    @PutMapping(path = {"/ausente/{id}"})
    public Cita ausente(@PathVariable("id") int id){
        Cita cita = service.listarId(id);
        cita.setEstado("Ausente");
        return service.edit(cita);
    }

}