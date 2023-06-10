package com.backend.sagev.citaTemp;

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

@CrossOrigin(origins = {"http://localhost:4200",
                        "http://10.10.11.29:4200",
                        "http://localhost:8055",
                        "http://10.10.11.29:8055"}, 
                        allowedHeaders = "*",maxAge = 3600)
@RestController
@RequestMapping({"/citasTemp"})
public class CitaTempControlador {
    // Esta clase es la que recibe las consultas desde el frontend

    @Autowired
    CitaTempService service;

    // Obtiene todas las citas de la tabla Cita
    @GetMapping
    public List<CitaTemp>listar(){
        return service.listar();
    }

    // Obtiene las citas reservadas con un funcionario con base en su id (cédula)
    @GetMapping(path = {"/funcionario/{idFuncionario}"})
    public List<CitaTemp>listarIdFuncionario(@PathVariable("idFuncionario") String idFuncionario){
        return service.listarIdFuncionario(idFuncionario);
    }

    // Obtiene todas las citas reservadas con un contribuyente con base en su cédula
    @GetMapping(path = {"/contribuyente/{idContribuyente}"})
    public List<CitaTemp>listarIdContribuyente(@PathVariable("idContribuyente") String idContribuyente){
        return service.listarIdContribuyente(idContribuyente);
    }

    // Guarda la cita en la tabla CitaTemp de la base de datos
    @PostMapping
    public CitaTemp agregar(@RequestBody CitaTemp c){
        return service.save(c);
    }

    // Busca y retorna un registro de la tabla Cita con base en el id
    @GetMapping(path = {"/{id}"})
    public CitaTemp getById(@PathVariable("id") int id){
        return service.listarId(id);
    }

    // Cambia el estado de la cita a "completada"
    @PutMapping(path = {"/completada/{id}"})
    public CitaTemp completada(@PathVariable("id") int id){
        CitaTemp cita = service.listarId(id);
        cita.setEstado("Completada");
        return service.edit(cita);
    }

    // Cambia el estado de la cita a "ausente"
    @PutMapping(path = {"/ausente/{id}"})
    public CitaTemp ausente(@PathVariable("id") int id){
        CitaTemp cita = service.listarId(id);
        cita.setEstado("Ausente");
        return service.edit(cita);
    }

    // Cambia el estado de la cita a "cancelada"
    @PutMapping(path = {"/cancelada/{id}"})
    public CitaTemp cancelada(@PathVariable("id") int id){
        CitaTemp cita = service.listarId(id);
        cita.setEstado("Cancelada");
        return service.edit(cita);
    }

    // Marca la cita como "reagendada"
    @PutMapping(path = {"/reagendada/{id}"})
    public CitaTemp reagendada(@PathVariable("id") int id){
        CitaTemp cita = service.listarId(id);
        cita.setEstado("Reagendada");
        return service.edit(cita);
    }
}
