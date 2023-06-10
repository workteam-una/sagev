package com.backend.sagev.funcionario;

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
@RequestMapping({"/funcionarios"})
public class FuncionarioControlador {
    // Esta clase es la que recibe las consultas desde el frontend

    @Autowired
    FuncionarioService service;

    // Obtiene todos los funcionarios almacenados en la tabla Funcionario
    @GetMapping
    public List<Funcionario>listar() {
        return service.listar();
    }

    // Busca y retorna un registro de la tabla Funcionario con base en el id (cédula) 
    @GetMapping(path = {"/{id}"})
    public Funcionario getById(@PathVariable("id") String id){
        return service.listarIdFuncionario(id);
    }

    // Guarda el funcionario en la tabla Funcionario de la base de datos
    @PostMapping
    public Funcionario agregar(@RequestBody Funcionario f){
        return service.save(f);
    }

    // Cambia el estado del atributo "encargado" del funcionario de "N" a "S" con base en su id (cédula)
    @PutMapping(path = {"/encargado/si/{id}"})
    public Funcionario encargadoSi(@PathVariable("id") String id) {
        Funcionario funcionario = service.listarIdFuncionario(id);
        funcionario.setEncargado("S");
        return service.edit(funcionario);
    }

    // Cambia el estado del atributo "encargado" del funcionario de "S" a "N" con base en su id (cédula)
    @PutMapping(path = {"/encargado/no/{id}"})
    public Funcionario encargadoNo(@PathVariable("id") String id) {
        Funcionario funcionario = service.listarIdFuncionario(id);
        funcionario.setEncargado("N");
        return service.edit(funcionario);
    }

    // Cambia la contraseña de un funcionario
    @PutMapping(path= {"/newcontra"})
    public Funcionario cambiaContra(@RequestBody Funcionario f){
        Funcionario funcionario = service.listarIdFuncionario(f.idFuncionario);
        funcionario.setContrasenna(f.getContrasenna());
        return service.edit(funcionario);
    }

}
