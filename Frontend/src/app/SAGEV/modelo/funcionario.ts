export class Funcionario {
    idFuncionario?: string
    numDepartamento?: number
    correo?: string
    nombre?: string
    apellido1?: string
    apellido2?: string
    contrasenna?: string
    // ¿Por qué es necesario que el valor de encargado sea 'N'?
    encargado?: string = "N"
    suplente?: string
    administrador?: string = "N"
}