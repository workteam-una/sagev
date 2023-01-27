package com.backend.sagev.horario;

import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name = "Horario")
public class Horario {

    // @Id
    // @Column(name = "Id")
    // @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sec_Id_Horario")
    // @GenericGenerator(name = "sec_Id_Horario", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator", 
    //     parameters = {
    //         @Parameter(name = "sec_Id_Horario", value = "sec_Id_Horario"),
    //         @Parameter(name = "initial_value", value = "1"), 
    //         @Parameter(name = "increment_size", value = "1"),
    //         @Parameter(name = "optimizer", value = "pooled-lo") 
    //     }
    // )
    // private int id;

    @Id
    @Column(name = "Id")
    @GeneratedValue(generator="sec_Id_Horario") 
    @SequenceGenerator(name="sec_Id_Horario",sequenceName="sec_Id_Horario", allocationSize=1)
    private int id;
    
    @Column(name = "IdFuncionario")
    private int idFuncionario;

    @Column(name = "HoraInicio")
    private String horaInicio;

    @Column(name = "HoraFinal")
    private String horaFinal;

    @Column(name = "Duracion")
    private String duracion;

    @Column(name = "Dia")
    private String dia;

    public Horario() {
    }

    public Horario( int idFuncionario, String horaInicio, String horaFinal, String duracion, String dia) {
        this.idFuncionario = idFuncionario;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.duracion = duracion;
        this.dia = dia;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(int idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(String horaFinal) {
        this.horaFinal = horaFinal;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }
    
}
