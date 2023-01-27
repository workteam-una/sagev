package com.backend.sagev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// //Alucine
// import com.backend.sagev.horario.Horario;
// import com.backend.sagev.horario.HorarioControlador;

@SpringBootApplication
public class SagevApplication {

	public static void main(String[] args) {
		SpringApplication.run(SagevApplication.class, args);

		// //Alucine
		// System.out.println("-------INTENTANDO GUARDAR HOARIO------");
		// Horario horario = new Horario(123,"08:00","17:00","30","Martes");
		// HorarioControlador repositorio = new HorarioControlador();
		// repositorio.agregar(horario);
	}

}
