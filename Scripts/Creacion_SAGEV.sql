--Script SAGEV (Sistema de Agenda Virtual de Citas)

----Dropear las tablas
--drop table Cita;
--drop table CitaTemp;
----drop table Horario;
--drop table Funcionario;
--drop table Departamento;
--drop table Area;

----Dropear las secuencias
--drop sequence sec_Id_cita;
--drop sequence sec_Id_cita_temp;
----drop sequence sec_Id_Horario;

------Dropear el trigger
--drop trigger if exists tr_eliminar_citas_antiguas;

--Creación de las tablas

go
create table Area
(
  NumArea int not null,
  Nombre varchar(100) not null,
  Descripcion varchar(255) not null
);

create table Departamento
(
  NumDepartamento int not null,
  NumArea int not null,
  Descripcion varchar(255) not null,
  Nombre varchar(100) not null
);

create table Funcionario
(
  IdFuncionario varchar(30) not null,
  NumDepartamento int not null,
  Correo varchar(100) not null,
  Nombre varchar(50) not null,
  Apellido1 varchar(50) not null,
  Apellido2 varchar(50) not null,
  Contrasenna varchar(50) not null,
  Encargado varchar(2) not null,
  Suplente varchar(2) not null,
  Administrador char(1) null
);

-- create table Horario
-- (
--   Id int not null,
--   IdFuncionario varchar(30) not null,
--   --Jornada
--   HoraInicio varchar(10) not null,
--   HoraFinal varchar(10) not null,
--   duracion varchar(10) not null,
--   dia varchar(10) not null
-- );

create table Cita
(
  Id int not null,
  IdFuncionario varchar(30) not null,
  IdContribuyente varchar(30) not null,
  NombreContribuyente varchar(50) not null,
  Apellido1Contribuyente varchar(50) not null,
  Apellido2Contribuyente varchar(50) not null,
  NombreFuncionario varchar(50) not null,
  Apellido1Funcionario varchar(50) not null,
  Apellido2Funcionario varchar(50) not null,
  CorreoContribuyente varchar(100) not null,
  telefonoContribuyente varchar(30) not null,
  Fecha datetime not null,
  Detalle varchar(255) null,
  Estado varchar(50) not null,
  RazonReagenda varchar(255) null,
  Token varchar(20) not null
);

create table CitaTemp
(
  Id int not null,
  IdFuncionario varchar(30) not null,
  IdContribuyente varchar(30) not null,
  NombreContribuyente varchar(50) not null,
  Apellido1Contribuyente varchar(50) not null,
  Apellido2Contribuyente varchar(50) not null,
  NombreFuncionario varchar(50) not null,
  Apellido1Funcionario varchar(50) not null,
  Apellido2Funcionario varchar(50) not null,
  CorreoContribuyente varchar(100) not null,
  telefonoContribuyente varchar(30) not null,
  Fecha datetime not null,
  Detalle varchar(255) null,
  Estado varchar(50) not null,
  RazonReagenda varchar(255) null,
  Token varchar(20) not null
);

--Secuencias 
create sequence sec_Id_cita as int
	start with 1000
	increment by 1;
--Se genera una secuencia para evitar tener
--que asignar los números de forma manual o 
--generados con un método de asignación al azar

create sequence sec_Id_cita_temp as int
	start with 1000
	increment by 1;

-- create sequence sec_Id_Horario as int
-- 	start with 1
-- 	increment by 1;

--PKs
alter table Area add primary key (NumArea);
alter table Departamento add primary key (NumDepartamento);
alter table Funcionario add primary key (IdFuncionario);
alter table Cita add primary key (Id);
alter table CitaTemp add primary key (Id);
-- alter table Horario add primary key (Id);

--FKs

--departamento_fk_area
alter table Departamento add constraint departamento_fk_area 
foreign key (NumArea) references Area(NumArea);

--funcionario_fk_departamento
alter table Funcionario add constraint funcionario_fk_departamento
foreign key (NumDepartamento) references Departamento(NumDepartamento);

--cita_fk_funcionario
alter table Cita add constraint cita_fk_funcionario
foreign key (IdFuncionario) references Funcionario(IdFuncionario);

--cita_temp_fk_funcionario
alter table CitaTemp add constraint cita_temp_fk_funcionario
foreign key (IdFuncionario) references Funcionario(IdFuncionario);

--Horario_fk_funcionario
-- alter table Horario add constraint Horario_fk_funcionario
-- foreign key (IdFuncionario) references Funcionario(IdFuncionario);

--CKs

--funcionario_ck_Encargado
alter table Funcionario add constraint funcionario_ck_Encargado check
(Encargado in ('S','N','NA'));


--funcionario_ck_Suplente
alter table Funcionario add constraint funcionario_ck_Suplente check
(Suplente in ('S','N','NA'));


--funcionario_ck_Administrador
alter table Funcionario add constraint funcionario_ck_Administrador check
(Administrador in ('S','N'));


--cita_ck_Estado
alter table Cita add constraint cita_ck_Estado check
(Estado in ('Pendiente', 'Completada', 'Ausente', 'Cancelada', 'Reagendada'));


--cita_temp_ck_Estado
alter table CitaTemp add constraint cita_temp_ck_Estado check
(Estado in ('Pendiente', 'Completada', 'Ausente', 'Cancelada', 'Reagendada'));
go

--Triggers

-- Elimina las citas temporales almacenadas con 28 días de antigüedad
create trigger tr_eliminar_citas_antiguas
on CitaTemp
for delete, insert, update
as
begin
  delete from CitaTemp
  where Fecha < dateadd(day, -28, getdate())
end
go

--Procedimientos básicos

--Tabla Area

--Procedimiento de insertar en tabla Area

create or alter procedure usp_insertar_area @PNumArea int, @PNombre varchar(100), @PDescripcion varchar (255)
as
begin
    insert into Area (NumArea, Nombre, Descripcion) values 
    (@PNumArea, @PNombre, @PDescripcion);
end;
go

--Procedimiento de actualizar en tabla de Area
create or alter procedure usp_actualizar_area @PNumArea int, @PNombre varchar(100), @PDescripcion varchar(255)
as
begin
    update Area 
        set Nombre = @PNombre, Descripcion = @PDescripcion
    where @PNumArea = NumArea;
end;
go

--Procedimiento de borrar en tabla de de Area
create or alter procedure usp_eliminar_area @PNumArea int
as
begin
    delete from Area where NumArea = @PNumArea;
end;
go

--Tabla Departamento

--Procedimiento de insertar en tabla Departamento
create or alter procedure usp_insertar_departamento
@PNumDepartamento int, @PNumArea int, @PDescripcion varchar(255), 
@PNombreDepa varchar(100) as
begin
   insert into Departamento (NumDepartamento, NumArea, Descripcion, Nombre) values
   (@PNumDepartamento, @PNumArea, @PDescripcion, @PNombreDepa);
end;
go

--Procedimiento de actualizar en tabla de Departamento
create or alter procedure usp_actualizar_departamento @PNumDepartamento int, @PNumArea int, 
@PDescripcion varchar(255), @PNombreDepa varchar(100)
as
begin
    update Departamento 
        set NumArea = @PNumArea, Descripcion = @PDescripcion, Nombre = @PNombreDepa
    where @PNumDepartamento = NumDepartamento;
end;
go

--Procedimiento de borrar en tabla de Departamento
create or alter procedure usp_eliminar_departamento @PnumDepa int
as
begin
    delete from Departamento where NumDepartamento = @PnumDepa;
end;
go

--Tabla Funcionario

--Procedimiento de insertar en tabla Funcionario
create or alter procedure usp_insertar_funcionario @PIdFuncionario varchar(30), @PNumDepartamento int, 
@PCorreo varchar(100), @PNombre varchar(50), @PApellido1 varchar(50), @PApellido2 varchar(50), 
@PContrasenna varchar(50), @PEncargado varchar(2), @PSuplente varchar(2), @PAdministrador char(1)
as
begin 
	insert into Funcionario (IdFuncionario, NumDepartamento, Correo, Nombre, 
	Apellido1, Apellido2, Contrasenna, Encargado, Suplente, Administrador)
	values (@PIdFuncionario, @PNumDepartamento, @PCorreo, @PNombre, 
	@PApellido1, @PApellido2, @PContrasenna, @PEncargado, @PSuplente, @PAdministrador);
end;
go

--Procedimiento de actualizar en tabla Funcionario
create or alter procedure usp_actualizar_funcionario @PIdFuncionario varchar(30), @PNumDepartamento int, 
@PCorreo varchar(100), @PNombre varchar(50), @PApellido1 varchar(50), 
@PApellido2 varchar(50), @PContrasenna varchar(50), @PEncargado varchar(2), @PSuplente varchar(2), @PAdministrador char(1)
as
begin
    update Funcionario 
        set NumDepartamento = @PNumDepartamento,
        Correo = @PCorreo, Nombre = @PNombre, Apellido1 = @PApellido1,
        Apellido2 = @PApellido2, Contrasenna = @PContrasenna, Encargado = @PEncargado,
		Suplente = @PSuplente, Administrador = @PAdministrador 
    where @PIdFuncionario = IdFuncionario;
end; 
go

--Procedimiento de borrar en tabla Funcionario
create or alter procedure usp_eliminar_funcionario @PIdFuncionario varchar(30)
as
begin
	delete from Funcionario where IdFuncionario = @PIdFuncionario;
end;
go

--Tabla Horario

-- --Procedimiento de insertar en tabla Horario
-- create or alter procedure usp_insertar_Horario @PIdFuncionario varchar(30), 
-- @PHoraInicio varchar(10), @PHoraFinal varchar(10), @Pduracion varchar(10), @Pdia varchar(10)
-- as
-- begin
--     insert into Horario (Id, IdFuncionario, HoraInicio, HoraFinal, duracion, dia) 
--     values (next value for sec_Id_Horario, @PIdFuncionario, @PHoraInicio, @PHoraFinal, 
--     @Pduracion, @Pdia);
-- end;
-- go

-- --Procedimiento de actualizar en tabla Horario
-- create or alter procedure usp_actualizar_Horario @PId int, @PIdFuncionario varchar(30), 
-- @PHoraInicio varchar(10), @PHoraFinal varchar(10), @Pduracion varchar(10), @Pdia varchar(10)
-- as
-- begin
--     update Horario 
--         set Id = @PId, IdFuncionario = @PIdFuncionario, HoraInicio = @PHoraInicio,
--         HoraFinal = @PHoraFinal, duracion = @Pduracion, dia = @Pdia
--     where @PId = Id;
-- end;
-- go

-- --Procedimiento de borrar en tabla Horario
-- create or alter procedure usp_eliminar_Horario @PId int 
-- as
-- begin
--     delete from Horario where Id = @PId;
-- end; 
-- go

--Tabla Cita
 
--Procedimiento de insertar en tabla Cita
create or alter procedure usp_insertar_cita @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), @PApellido1Contribuyente varchar(50), 
@PApellido2Contribuyente varchar(50), @PNombreFuncionario varchar(50), @PApellido1Funcionario varchar(50), @PApellido2Funcionario varchar(50), @PCorreoContribuyente varchar(100),
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255), @PEstado varchar(50), @PRazonReagenda varchar(255), @PToken varchar(20)
as
begin
	insert into Cita (Id, IdFuncionario, IdContribuyente, NombreContribuyente, Apellido1Contribuyente, Apellido2Contribuyente, NombreFuncionario, Apellido1Funcionario, 
	Apellido2Funcionario, CorreoContribuyente, telefonoContribuyente, Fecha, Detalle, Estado, RazonReagenda, Token) values (next value for sec_Id_cita, @PIdFuncionario, 
	@PIdContribuyente, @PNombreContribuyente, @PApellido1Contribuyente, @PApellido2Contribuyente, @PNombreFuncionario, @PApellido1Funcionario, @PApellido2Funcionario,
	@PCorreoContribuyente, @PtelefonoContribuyente, @PFecha, @PDetalle, @PEstado, @PRazonReagenda, @PToken);
end;
go

--Procedimiento de actualizar en tabla Cita
create or alter procedure usp_actualizar_cita @PId int, @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), @PApellido1Contribuyente varchar(50), 
@PApellido2Contribuyente varchar(50), @PNombreFuncionario varchar(50), @PApellido1Funcionario varchar(50), @PApellido2Funcionario varchar(50), @PCorreoContribuyente varchar(100), 
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255), @PEstado varchar(50), @PRazonReagenda varchar(255), @PToken varchar(20)
as
begin
	update Cita
		set IdFuncionario = @PIdFuncionario, IdContribuyente = @PIdContribuyente, NombreContribuyente = @PNombreContribuyente, Apellido1Contribuyente = @PApellido1Contribuyente, 
		Apellido2Contribuyente = @PApellido2Contribuyente, NombreFuncionario = @PNombreFuncionario, Apellido1Funcionario = @PApellido1Funcionario, Apellido2Funcionario = @PApellido2Funcionario,
		CorreoContribuyente= @PCorreoContribuyente, telefonoContribuyente = @PtelefonoContribuyente, Fecha = @PFecha, Detalle = @PDetalle, Estado = @PEstado, RazonReagenda = @PRazonReagenda, Token = @PToken
	where Id = @PId;
end;
go

--Procedimiento de borrar en tabla 
create or alter procedure usp_eliminar_cita @PId int
as
begin
	delete from Cita where @PId = Id;
end;
go

--Tabla CitaTemp
 
--Procedimiento de insertar en tabla CitaTemp
create or alter procedure usp_insertar_cita_temp @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), @PApellido1Contribuyente varchar(50), 
@PApellido2Contribuyente varchar(50), @PNombreFuncionario varchar(50), @PApellido1Funcionario varchar(50), @PApellido2Funcionario varchar(50), @PCorreoContribuyente varchar(100),
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255), @PEstado varchar(50), @PRazonReagenda varchar(255), @PToken varchar(20)
as
begin
	insert into CitaTemp (Id, IdFuncionario, IdContribuyente, NombreContribuyente, Apellido1Contribuyente, Apellido2Contribuyente, NombreFuncionario, Apellido1Funcionario, 
	Apellido2Funcionario, CorreoContribuyente, telefonoContribuyente, Fecha, Detalle, Estado, RazonReagenda, Token) values (next value for sec_Id_cita_temp, @PIdFuncionario, 
	@PIdContribuyente, @PNombreContribuyente, @PApellido1Contribuyente, @PApellido2Contribuyente, @PNombreFuncionario, @PApellido1Funcionario, @PApellido2Funcionario,
	@PCorreoContribuyente, @PtelefonoContribuyente, @PFecha, @PDetalle, @PEstado, @PRazonReagenda, @PToken);
end;
go

--Procedimiento de actualizar en tabla CitaTemp
create or alter procedure usp_actualizar_cita_temp @PId int, @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), @PApellido1Contribuyente varchar(50), 
@PApellido2Contribuyente varchar(50), @PNombreFuncionario varchar(50), @PApellido1Funcionario varchar(50), @PApellido2Funcionario varchar(50), @PCorreoContribuyente varchar(100), 
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255),
@PEstado varchar(50), @PRazonReagenda varchar(255), @PToken varchar(20)
as
begin
	update CitaTemp
		set IdFuncionario = @PIdFuncionario, IdContribuyente = @PIdContribuyente, NombreContribuyente = @PNombreContribuyente, Apellido1Contribuyente = @PApellido1Contribuyente, 
		Apellido2Contribuyente = @PApellido2Contribuyente, NombreFuncionario = @PNombreFuncionario, Apellido1Funcionario = @PApellido1Funcionario, Apellido2Funcionario = @PApellido2Funcionario,
		CorreoContribuyente= @PCorreoContribuyente, telefonoContribuyente = @PtelefonoContribuyente, Fecha = @PFecha, Detalle = @PDetalle, Estado = @PEstado, RazonReagenda = @PRazonReagenda, Token = @PToken
	where Id = @PId;
end;
go

--Procedimiento de borrar en tabla 
create or alter procedure usp_eliminar_cita_temp @PId int
as
begin
	delete from CitaTemp where @PId = Id;
end;

go