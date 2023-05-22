package com.backend.sagev.citaTemp;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "CitaTemp")
public class CitaTemp {
    @Id
    @Column(name = "Id")
    @GeneratedValue(generator = "sec_Id_cita_temp")
    @SequenceGenerator(name="sec_Id_cita_temp", sequenceName = "sec_Id_cita_temp", allocationSize = 1)
    private int id;

    @Column(name = "IdFuncionario")
    private String idFuncionario;

    @Column(name = "IdContribuyente")
    private String idContribuyente;

    @Column(name = "NombreContribuyente")
    private String nombreContribuyente;

    @Column(name = "Apellido1Contribuyente")
    private String apellido1Contribuyente;

    @Column(name = "Apellido2Contribuyente")
    private String apellido2Contribuyente;

    @Column(name = "CorreoContribuyente")
    private String correoContribuyente;

    @Column(name = "TelefonoContribuyente")
    private String telefonoContribuyente;

    @Column(name = "Fecha")
    private LocalDateTime fecha;

    @Column(name = "Detalle")
    private String detalle;

    @Column(name = "Estado")
    private String estado;

    @Column(name = "RazonReagenda")
    private String razonReagenda;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getIdContribuyente() {
        return idContribuyente;
    }

    public void setIdContribuyente(String idContribuyente) {
        this.idContribuyente = idContribuyente;
    }

    public String getNombreContribuyente() {
        return nombreContribuyente;
    }

    public void setNombreContribuyente(String nombreContribuyente) {
        this.nombreContribuyente = nombreContribuyente;
    }

    public String getApellido1Contribuyente() {
        return apellido1Contribuyente;
    }

    public void setApellido1Contribuyente(String apellido1Contribuyente) {
        this.apellido1Contribuyente = apellido1Contribuyente;
    }

    public String getApellido2Contribuyente() {
        return apellido2Contribuyente;
    }

    public void setApellido2Contribuyente(String apellido2Contribuyente) {
        this.apellido2Contribuyente = apellido2Contribuyente;
    }

    public String getCorreoContribuyente() {
        return correoContribuyente;
    }

    public void setCorreoContribuyente(String correoContribuyente) {
        this.correoContribuyente = correoContribuyente;
    }

    public String getTelefonoContribuyente() {
        return telefonoContribuyente;
    }

    public void setTelefonoContribuyente(String telefonoContribuyente) {
        this.telefonoContribuyente = telefonoContribuyente;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getRazonReagenda() {
        return razonReagenda;
    }

    public void setRazonReagenda(String razonReagenda) {
        this.razonReagenda = razonReagenda;
    }
}