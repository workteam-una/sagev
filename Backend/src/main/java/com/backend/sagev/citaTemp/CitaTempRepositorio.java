package com.backend.sagev.citaTemp;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface CitaTempRepositorio extends Repository<CitaTemp, Integer> {
        List<CitaTemp>findAll();
        // Retorna las citas de un funcionario en específico y las ordena por fecha de forma ascendente
        List<CitaTemp>findByidFuncionarioOrderByFecha(String idFuncionario);
        List<CitaTemp>findByidContribuyenteOrderByFecha(String idContribuyente);
        CitaTemp findByid(int id);
        CitaTemp save(CitaTemp c);
        CitaTemp delete(CitaTemp c);
}
