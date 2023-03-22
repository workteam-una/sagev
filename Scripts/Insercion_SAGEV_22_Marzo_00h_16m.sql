--
--
-- Inserción de datos de prueba (excepto cita)
--
--

--Ejecución del procedimiento de insertar en tabla area
execute usp_insertar_area @PnumArea = 1, @Pnombre = 'Direccion financiera', 
@Pdescripcion = 'Direccion financiera';

execute usp_insertar_area @PnumArea = 2, @Pnombre = 'Direccion de SOT', 
@Pdescripcion = 'Direccion de SOT';

execute usp_insertar_area @PnumArea = 3, @Pnombre = 'Direccion del acueducto', 
@Pdescripcion = 'Direccion del acueducto';

execute usp_insertar_area @PnumArea = 4, @Pnombre = 'Direccion de unidad tecnica', 
@Pdescripcion = 'Direccion de unidad tecnica';

--Ejecución del procedimiento de insertar en tabla departamento
execute usp_insertar_departamento @PnumDepartamento = 900, @PnumArea = 1 , @Pdescripcion = 'Tramites de Cobros, Arreglos de Pago, Junta del Cementerio', 
@PnombreDepa = 'Direccion';

execute usp_insertar_departamento @PnumDepartamento = 100, @PnumArea = 1 , @Pdescripcion = 'Declaración de Patentes, Cesiones o Traslados, Cobros y Consultas generales', 
@PnombreDepa = 'Patentes';

execute usp_insertar_departamento @PnumDepartamento = 1000, @PnumArea = 2 , @Pdescripcion = 'Proyectos y Desarrollos Inmobiliarios, Permisos de Construcción y Consultas Generales', 
@PnombreDepa = 'Direccion';

execute usp_insertar_departamento @PnumDepartamento = 200, @PnumArea = 2 , @Pdescripcion = 'Usos de suelo, Visados y Consultas generales', 
@PnombreDepa = 'Catastro';

execute usp_insertar_departamento @PnumDepartamento = 500, @PnumArea = 2 , @Pdescripcion = 'Declaraciones, Exoneraciones, Valoraciones de propiedades y Consultas generales', 
@PnombreDepa = 'Bienes inmuebles';

execute usp_insertar_departamento @PnumDepartamento = 600, @PnumArea = 2 , @Pdescripcion = 'Gestion ambiental y Consultas generales', 
@PnombreDepa = 'Gestion ambiental';

execute usp_insertar_departamento @PnumDepartamento = 700, @PnumArea = 2 , @Pdescripcion = 'Permisos de construccion, Obras de mantenimiento y Consultas generales', 
@PnombreDepa = 'Control urbano';

execute usp_insertar_departamento @PnumDepartamento = 800, @PnumArea = 2 , @Pdescripcion = 'Limpieza, Mantenimiento de Vías, Recolección de residuos solidos y Consultas Generales', 
@PnombreDepa = 'Obras y servicios';

execute usp_insertar_departamento @PnumDepartamento = 1100, @PnumArea = 3 , @Pdescripcion = 'Disponibilidad de agua, Paja de agua, Exoneraciones y Consultas generales', 
@PnombreDepa = 'Direccion';

execute usp_insertar_departamento @PnumDepartamento = 300, @PnumArea = 3 , @Pdescripcion = 'Disponibilidad de agua, Paja de agua y Consultas generales', 
@PnombreDepa = 'Ingenieria de Acueducto';

execute usp_insertar_departamento @PnumDepartamento = 400, @PnumArea = 4 , @Pdescripcion = 'Consultas generales y Denuncias', 
@PnombreDepa = 'Unidad Tecnica';

--Ejecución del procedimiento de insertar en tabla de funcionarios

--Area de direccion financiera
execute usp_insertar_funcionario @PidFuncionario = '107430793', @PnumDepartamento = 900, @Pcorreo = 'mvarela@munisantodomingo.go.cr',
@Pnombre = 'Miguel',  @Papellido1 = 'Varela', @Papellido2 = 'Ramirez', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Hoy 22/3/2023 se estableció a Marco Vega como administrador, solo para hacer pruebas en la vista del administrador
execute usp_insertar_funcionario @PidFuncionario = '401490698', @PnumDepartamento = 100, @Pcorreo = 'mvega@munisantodomingo.go.cr',
@Pnombre = 'Marco',  @Papellido1 = 'Vega', @Papellido2 = 'Alpizar', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'S';

--Dos personas en patentes, comente al segundo
execute usp_insertar_funcionario @PidFuncionario = '401840322', @PnumDepartamento = 100, @Pcorreo = 'eruiz@munisantodomingo.go.cr',
@Pnombre = 'Ernesto',  @Papellido1 = 'Ruiz', @Papellido2 = 'Rodriguez', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';


--Area de servicios y ordenamiento
execute usp_insertar_funcionario @PidFuncionario = '106660080', @PnumDepartamento = 1000, @Pcorreo = 'rmadrigal@munisantodomingo.go.cr',
@Pnombre = 'Randall',  @Papellido1 = 'Madrigal', @Papellido2 = 'Ledezma', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '401860890', @PnumDepartamento = 200, @Pcorreo = 'cvalerio@munisantodomingo.go.cr',
@Pnombre = 'Carlos',  @Papellido1 = 'Valerio', @Papellido2 = 'Garita', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Nuevo funcionario, posibilidad de no ser este su departamento
execute usp_insertar_funcionario @PidFuncionario = '401930051', @PnumDepartamento = 200, @Pcorreo = 'mlefebre@munisantodomingo.go.cr',
@Pnombre = 'Miguel',  @Papellido1 = 'Lefebre', @Papellido2 = 'Villalobos', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '800780330', @PnumDepartamento = 500, @Pcorreo = 'gibarra@munisantodomingo.go.cr',
@Pnombre = 'Guillermo',  @Papellido1 = 'Ibarra', @Papellido2 = 'Baez', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '109880372', @PnumDepartamento = 600, @Pcorreo = 'lrubi@munisantodomingo.go.cr',
@Pnombre = 'Luis',  @Papellido1 = 'Rubi', @Papellido2 = 'Bolanos', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '112100757', @PnumDepartamento = 600, @Pcorreo = 'krojas@munisantodomingo.go.cr',
@Pnombre = 'Kimberly',  @Papellido1 = 'Rojas', @Papellido2 = 'Avila', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';

--Buscar Cedula de Patricia
execute usp_insertar_funcionario @PidFuncionario = '109880165', @PnumDepartamento = 700, @Pcorreo = 'pguzman@munisantodomingo.go.cr',
@Pnombre = 'Patricia',  @Papellido1 = 'Guzman', @Papellido2 = 'Nunez', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '112050556', @PnumDepartamento = 800, @Pcorreo = 'dsancho@munisantodomingo.go.cr',
@Pnombre = 'Douglas',  @Papellido1 = 'Sancho', @Papellido2 = 'Oconitrillo', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';


--Area de acueducto
execute usp_insertar_funcionario @PidFuncionario = '204750875', @PnumDepartamento = 1100, @Pcorreo = 'jsancho@munisantodomingo.go.cr',
@Pnombre = 'Jorge',  @Papellido1 = 'Sancho', @Papellido2 = 'Pereira', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Nuevo funcionario, pedir cedula
execute usp_insertar_funcionario @PidFuncionario = '702010345', @PnumDepartamento = 1100, @Pcorreo = 'jaguilar@munisantodomingo.go.cr',
@Pnombre = 'Jorge',  @Papellido1 = 'Aguilar', @Papellido2 = 'Hernandez', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '110870401', @PnumDepartamento = 300, @Pcorreo = 'jcastillo@munisantodomingo.go.cr',
@Pnombre = 'Jose',  @Papellido1 = 'Castillo', @Papellido2 = 'Cerdas', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Area de Unidad Tecnica
execute usp_insertar_funcionario @PidFuncionario = '303670002', @PnumDepartamento = 400, @Pcorreo = 'jcano@munisantodomingo.go.cr',
@Pnombre = 'Jessica',  @Papellido1 = 'Cano', @Papellido2 = 'Chaves', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Insercion de horarios
execute usp_insertar_horario @PIdFuncionario = '106660080', @PHoraInicio = '8:00', @PHorafinal = '12:00', @PDuracion = '30', @Pdia = 'Martes';
execute usp_insertar_horario @PIdFuncionario = '106660080', @PHoraInicio = '1:30', @PHorafinal = '4:00', @PDuracion = '30', @Pdia = 'Jueves'; 
execute usp_insertar_horario @PIdFuncionario = '107430793', @PHoraInicio = '8:00', @PHorafinal = '12:00', @PDuracion = '30', @Pdia = 'Martes';
execute usp_insertar_horario @PIdFuncionario = '107430793', @PHoraInicio = '1:30', @PHorafinal = '4:00', @PDuracion = '30', @Pdia = 'Jueves'; 


--Insercion de citas
--...

--Selects
select * from Area;
select * from Departamento;
select * from Funcionario;
select * from Horario;
select * from Cita;