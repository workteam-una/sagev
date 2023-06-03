--
--
-- Inserción de datos
--
--

--Ejecución del procedimiento de insertar en tabla area
execute usp_insertar_area @PnumArea = 1, @Pnombre = 'Dirección financiera', 
@Pdescripcion = 'Dirección financiera';

execute usp_insertar_area @PnumArea = 2, @Pnombre = 'Dirección de DSOT', 
@Pdescripcion = 'Dirección de DSOT';

execute usp_insertar_area @PnumArea = 3, @Pnombre = 'Dirección del acueducto', 
@Pdescripcion = 'Dirección del acueducto';

execute usp_insertar_area @PnumArea = 4, @Pnombre = 'Dirección de unidad técnica', 
@Pdescripcion = 'Dirección de unidad técnica';

--Ejecución del procedimiento de insertar en tabla departamento
execute usp_insertar_departamento @PnumDepartamento = 900, @PnumArea = 1 , @Pdescripcion = 'Tramites de Cobros, Arreglos de Pago, Junta del Cementerio', 
@PnombreDepa = 'Dirección financiera (Lic. Miguel Varela)';

execute usp_insertar_departamento @PnumDepartamento = 100, @PnumArea = 1 , @Pdescripcion = 'Declaración de Patentes, Cesiones o Traslados, Cobros y Consultas generales', 
@PnombreDepa = 'Patentes (Lic. Marco Vega)';

execute usp_insertar_departamento @PnumDepartamento = 1000, @PnumArea = 2 , @Pdescripcion = 'Proyectos y Desarrollos Inmobiliarios, Permisos de Construcción y Consultas Generales', 
@PnombreDepa = 'Dirección DSOT (Ing. Randall Madrigal)';

execute usp_insertar_departamento @PnumDepartamento = 200, @PnumArea = 2 , @Pdescripcion = 'Usos de suelo, Visados y Consultas generales', 
@PnombreDepa = 'Catastro (Ing. Carlos Valerio)';

execute usp_insertar_departamento @PnumDepartamento = 500, @PnumArea = 2 , @Pdescripcion = 'Declaraciones, Exoneraciones, Valoraciones de propiedades y Consultas generales', 
@PnombreDepa = 'Bienes inmuebles (Ing. Guillermo Ibarra)';

execute usp_insertar_departamento @PnumDepartamento = 600, @PnumArea = 2 , @Pdescripcion = 'Gestión ambiental y Consultas generales', 
@PnombreDepa = 'Gestión ambiental (Gog. Luis Rubi)';

execute usp_insertar_departamento @PnumDepartamento = 700, @PnumArea = 2 , @Pdescripcion = 'Permisos de construccion, Obras de mantenimiento y Consultas generales', 
@PnombreDepa = 'Control urbano (Ing. Patricia Guzmán)';

execute usp_insertar_departamento @PnumDepartamento = 800, @PnumArea = 2 , @Pdescripcion = 'Limpieza, Mantenimiento de Vías, Recolección de residuos sólidos y Consultas Generales', 
@PnombreDepa = 'Obras y servicios (Ing. Douglas Sancho)';

execute usp_insertar_departamento @PnumDepartamento = 1100, @PnumArea = 3 , @Pdescripcion = 'Disponibilidad de agua, Paja de agua, Exoneraciones y Consultas generales', 
@PnombreDepa = 'Dirección de acueducto (Ing. Jorge Sancho)';

execute usp_insertar_departamento @PnumDepartamento = 300, @PnumArea = 3 , @Pdescripcion = 'Disponibilidad de agua, Paja de agua y Consultas generales', 
@PnombreDepa = 'Ingeniería de Acueducto (Ing. José Castillo)';

execute usp_insertar_departamento @PnumDepartamento = 400, @PnumArea = 4 , @Pdescripcion = 'Consultas generales y Denuncias', 
@PnombreDepa = 'Unidad Técnica (Ing. Jessica Cano)';

--Ejecución del procedimiento de insertar en tabla de funcionarios

--Area de dirección financiera
execute usp_insertar_funcionario @PidFuncionario = '107430793', @PnumDepartamento = 900, @Pcorreo = 'mvarela@munisantodomingo.go.cr',
@Pnombre = 'Miguel',  @Papellido1 = 'Varela', @Papellido2 = 'Ramírez', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Hoy 22/3/2023 se estableció a Marco Vega como administrador, solo para hacer pruebas en la vista del administrador
execute usp_insertar_funcionario @PidFuncionario = '401490698', @PnumDepartamento = 100, @Pcorreo = 'mvega@munisantodomingo.go.cr',
@Pnombre = 'Marco',  @Papellido1 = 'Vega', @Papellido2 = 'Alpízar', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Dos personas en patentes, comente al segundo
execute usp_insertar_funcionario @PidFuncionario = '401840322', @PnumDepartamento = 100, @Pcorreo = 'eruiz@munisantodomingo.go.cr',
@Pnombre = 'Ernesto',  @Papellido1 = 'Ruíz', @Papellido2 = 'Rodríguez', @Pcontrasenna = '123',
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
@Pnombre = 'Luis',  @Papellido1 = 'Rubi', @Papellido2 = 'Bolaños', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '112100757', @PnumDepartamento = 600, @Pcorreo = 'krojas@munisantodomingo.go.cr',
@Pnombre = 'Kimberly',  @Papellido1 = 'Rojas', @Papellido2 = 'Ávila', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';

--Buscar Cedula de Patricia
execute usp_insertar_funcionario @PidFuncionario = '109880165', @PnumDepartamento = 700, @Pcorreo = 'pguzman@munisantodomingo.go.cr',
@Pnombre = 'Patricia',  @Papellido1 = 'Guzmán', @Papellido2 = 'Núñez', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '112050556', @PnumDepartamento = 800, @Pcorreo = 'dsancho@munisantodomingo.go.cr',
@Pnombre = 'Douglas',  @Papellido1 = 'Sancho', @Papellido2 = 'Oconitrillo', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Area de acueducto
execute usp_insertar_funcionario @PidFuncionario = '204750875', @PnumDepartamento = 1100, @Pcorreo = 'jsancho@munisantodomingo.go.cr',
@Pnombre = 'Jorge',  @Papellido1 = 'Sancho', @Papellido2 = 'Pereira', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Este funcinonario va a ser reemplazado por: Anthony Madrigal Carballo, quedan pendientes su cédula y correo.
execute usp_insertar_funcionario @PidFuncionario = '702010345', @PnumDepartamento = 1100, @Pcorreo = 'jaguilar@munisantodomingo.go.cr',
@Pnombre = 'Jorge',  @Papellido1 = 'Aguilar', @Papellido2 = 'Hernández', @Pcontrasenna = '123',
@Pencargado = 'N', @PSuplente = 'S', @PAdministrador = 'N';

execute usp_insertar_funcionario @PidFuncionario = '110870401', @PnumDepartamento = 300, @Pcorreo = 'jcastillo@munisantodomingo.go.cr',
@Pnombre = 'Jose',  @Papellido1 = 'Castillo', @Papellido2 = 'Cerdas', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Area de Unidad Tecnica
execute usp_insertar_funcionario @PidFuncionario = '303670002', @PnumDepartamento = 400, @Pcorreo = 'jcano@munisantodomingo.go.cr',
@Pnombre = 'Jessica',  @Papellido1 = 'Cano', @Papellido2 = 'Chaves', @Pcontrasenna = '123',
@Pencargado = 'S', @PSuplente = 'N', @PAdministrador = 'N';

--Usuario Aministrador
execute usp_insertar_funcionario @PidFuncionario = '999999999', @PnumDepartamento = 400, @Pcorreo = 'NA',
@Pnombre = 'ADMIN',  @Papellido1 = 'ADMIN', @Papellido2 = 'ADMIN', @Pcontrasenna = 'S@n70D0m1ng02023!Ag3nd4@dm1n',
@Pencargado = 'NA', @PSuplente = 'NA', @PAdministrador = 'S';

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
select * from CitaTemp;
--Listar los triggers de la base de datos
select name, create_date, is_disabled, is_instead_of_trigger from sys.triggers where type = 'TR';