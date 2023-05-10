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

    //Guarda el funcionario en la BD
    @PostMapping
    public Funcionario agregar(@RequestBody Funcionario f){
        return service.save(f);
    }

    // Cambia el estado de encargado de "N" a "S"
    @PutMapping(path = {"/encargado/si/{id}"})
    public Funcionario encargadoSi(@PathVariable("id") String id) {
        Funcionario funcionario = service.listarIdFuncionario(id);
        funcionario.setEncargado("S");
        return service.edit(funcionario);
    }

    // Cambia el estado de encargado de "S" a "N"
    @PutMapping(path = {"/encargado/no/{id}"})
    public Funcionario encargadoNo(@PathVariable("id") String id) {
        Funcionario funcionario = service.listarIdFuncionario(id);
        funcionario.setEncargado("N");
        return service.edit(funcionario);
    }

    //Cambia la constraseña del funcionario
    @PutMapping(path= {"/newcontra"})
    public Funcionario cambiaContra(@RequestBody Funcionario f){
        //f es un objeto que trae el id y nueva constrasena del funcionario
        // System.out.println("----------------ID de funcionario obtenida:" + f.idFuncionario);
        Funcionario funcionario = service.listarIdFuncionario(f.idFuncionario);
        funcionario.setContrasenna(f.getContrasenna());
        return service.edit(funcionario);
    }

}
