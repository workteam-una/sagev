export class CitaTemp {
    id?: number
    idFuncionario?: string
    idContribuyente?: string
    nombreContribuyente?: string
    apellido1Contribuyente?: string
    apellido2Contribuyente?: string
    nombreFuncionario?: string
    apellido1Funcionario?: string
    apellido2Funcionario?: string
    correoContribuyente?: string
    telefonoContribuyente?: string
    fecha?: Date
    detalle?: string
    estado: string = "Pendiente"
    razonReagenda?: string
    token?: string
}