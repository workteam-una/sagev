export class Funcionario {
    idFuncionario?: String
    numDepartamento?: number
    correo?: String
    nombre?: String
    apellido1?: String
    apellido2?: String
    contrasenna?: String
    // ¿Por qué es necesario que el valor de encargado sea 'N'?
    encargado?: String = "N"
    suplente?: String
    administrador?: String = "N"
}