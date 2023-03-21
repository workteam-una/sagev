package com.backend.sagev.funcionario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Que hace esta clase?: Se comunica con el front end. Hay que especificarle
//el link de la pagina, en donde dice origins. El frontend encuentra esta clase mediante la url
//cuando se aniade la palabra /funcionarios, por eso el RequestMapping.
//En realidad esta clase funciona muy parecido a un REST

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/funcionarios"})
public class FuncionarioControlador {
    @Autowired
    FuncionarioService service;

    @GetMapping
    public List<Funcionario>listar() {
        return service.listar();
    }

    @GetMapping(path = {"/{id}"})
    public Funcionario getById(@PathVariable("id") String id){
        return service.listarIdFuncionario(id);
    }

}
