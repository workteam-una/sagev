package com.backend.sagev.cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping({"/citas"})
public class CitaControlador {
    // Esta clase es la que recibe las consultas desde el frontend

    @Autowired
    CitaService service;

    // Obtiene todas las citas en la tabla Cita
    @GetMapping
    public List<Cita>listar(){
        return service.listar();
    }

    // Obtiene las citas reservadas con un funcionario con base en su id (cédula)
    @GetMapping(path = {"/funcionario/{idFuncionario}"})
    public List<Cita>listarIdFuncionario(@PathVariable("idFuncionario") String idFuncionario){
        return service.listarIdFuncionario(idFuncionario);
    }

    // Obtiene las citas reservadas con un contribuyente
    @GetMapping(path = {"/contribuyente/{idContribuyente}"})
    public List<Cita>listarIdContribuyente(@PathVariable("idContribuyente") String idContribuyente){
        return service.listarIdContribuyente(idContribuyente);
    }

    // Guarda la cita en la tabla Cita de la base de datos
    @PostMapping
    public Cita agregar(@RequestBody Cita c){
        return service.save(c);
    }

    // Busca y retorna un registro de la tabla Cita con base en el id (cédula)
    @GetMapping(path = {"/{id}"})
    public Cita getById(@PathVariable("id") int id){
        return service.listarId(id);
    }

    // Métodos comentados porque ya no se usan. No se eliminan en caso de que se necesiten a futuro

    // //Marca la cita como completada
    // @PutMapping(path = {"/completada/{id}"})
    // public Cita completada(@PathVariable("id") int id){
    //     Cita cita = service.listarId(id);
    //     cita.setEstado("Completada");
    //     return service.edit(cita);
    // }

    // //Marca la cita como ausente
    // @PutMapping(path = {"/ausente/{id}"})
    // public Cita ausente(@PathVariable("id") int id){
    //     Cita cita = service.listarId(id);
    //     cita.setEstado("Ausente");
    //     return service.edit(cita);
    // }

    // //Marca la cita como cancelada
    // @PutMapping(path = {"/cancelada/{id}"})
    // public Cita cancelada(@PathVariable("id") int id){
    //     Cita cita = service.listarId(id);
    //     cita.setEstado("Cancelada");
    //     return service.edit(cita);
    // }

    // //Marca la cita como reagendada
    // @PutMapping(path = {"/reagendada/{id}"})
    // public Cita reagendada(@PathVariable("id") int id){
    //     Cita cita = service.listarId(id);
    //     cita.setEstado("Reagendada");
    //     return service.edit(cita);
    // }

}