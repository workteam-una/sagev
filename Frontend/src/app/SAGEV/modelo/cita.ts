export class Cita {
    id?: number
    idFuncionario?: string
    idContribuyente?: string
    nombreContribuyente?: string
    apellido1Contribuyente?: string
    apellido2Contribuyente?: string
    correoContribuyente?: string
    telefonoContribuyente?: string
    fecha?: Date
    detalle?: string
    estado: string = "Pendiente"
    razonReagenda?: string
}