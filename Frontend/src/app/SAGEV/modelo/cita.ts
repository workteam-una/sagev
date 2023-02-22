export class Cita {
    id?: number
    idFuncionario?: number
    idContribuyente?: number
    nombreContribuyente?: String
    apellido1Contribuyente?: String
    apellido2Contribuyente?: String
    correoContribuyente?: String
    telefonoContribuyente?: String
    fecha?: Date
    detalle?: String
    estado: String = "Pendiente"
    razonReagenda?: String
}