package com.backend.sagev.funcionario;
import java.util.List;
import org.springframework.data.repository.Repository;

    //Que hace esta clase?: Esta clase repositorio tiene un metodos CRUD predefinidos por Springboot
    //pero para que Springboot sepa como usarlos, yo tengo que modificar unas pocas cosas

public interface FuncionarioRepositorio extends Repository<Funcionario, Integer>{


    //No comprendo porque en los parametros de Repository se coloca
    //Integer junto a Funcionrio, en el video se explica que en el segundo
    //parametro se especifica el tipo del objeto, entonces esta extraño
    List<Funcionario>findAll(); //Saca todos los funcionarios
    //findBy(variable) luego del "By" se coloca el nombre de la variable
    //por la que se va a ir a ubicar el objeto. (por esto el error de 4h ;-;)
    Funcionario findByidFuncionario(String idFuncionario); //Encuentra un funcionario por id
    Funcionario save(Funcionario a); //Guarda un funcionario en la BD
    void delete(Funcionario a); // Elimina un funcionario de la BD
}


