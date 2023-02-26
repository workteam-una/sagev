--Creacion de las tablas

--Script SAGEV (Grupo 17)

----Dropear las tablas
--drop table Cita;
--drop table Administrador;
--drop table Horario;
--drop table Funcionario;
--drop table Departamento;
--drop table Area;

----Dropear las secuencias
--drop sequence sec_Id_cita;
--drop sequence sec_Id_Horario;



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

create table Administrador
(
  Id int not null,
  Contrasenna varchar(50) not null
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
  Encargado char(1) not null
);

create table Horario
(
  Id int not null,
  IdFuncionario varchar(30) not null,
  --Jornada
  HoraInicio varchar(10) not null,
  HoraFinal varchar(10) not null,
  duracion varchar(10) not null,
  dia varchar(10) not null
);

create table Cita
(
  Id int not null,
  IdFuncionario varchar(30) not null,
  IdContribuyente varchar(30) not null,
  NombreContribuyente varchar(50) not null,
  Apellido1Contribuyente varchar(50) not null,
  Apellido2Contribuyente varchar(50) not null,
  CorreoContribuyente varchar(100) not null,
  telefonoContribuyente varchar(30) not null,
  Fecha datetime not null,
  Detalle varchar(255) null,
  Estado varchar(50) not null,
  RazonReagenda varchar(255) null
);


--Secuencias 
create sequence sec_Id_cita as int
	start with 1000
	increment by 1;
--Se genera una secuencia para evitar tener
--que asignar los números de forma manual o 
--generados con un método de asignación al azar

create sequence sec_Id_Horario as int
	start with 1
	increment by 1;

--PKs
alter table Administrador add primary key (Id);
alter table Area add primary key (NumArea);
alter table Departamento add primary key (NumDepartamento);
alter table Funcionario add primary key (IdFuncionario);
alter table Cita add primary key (Id);
alter table Horario add primary key (Id);

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

--Horario_fk_funcionario
alter table Horario add constraint Horario_fk_funcionario
foreign key (IdFuncionario) references Funcionario(IdFuncionario);

--CKs

--funcionario_ck_Encargado
alter table Funcionario add constraint funcionario_ck_Encargado check
(Encargado in ('S','N'));

--cita_ck_Estado
alter table Cita add constraint cita_ck_Estado check
(Estado in ('Pendiente', 'Completada', 'Ausente'));
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
@PCorreo varchar(100), @PNombre varchar(50), @PApellido1 varchar(50), 
@PApellido2 varchar(50), @PContrasenna varchar(50), @PEncargado char(1)
as
begin 
	insert into Funcionario (IdFuncionario, NumDepartamento, Correo, Nombre, 
	Apellido1, Apellido2, Contrasenna, Encargado) 
	values (@PIdFuncionario, @PNumDepartamento, @PCorreo, @PNombre, 
	@PApellido1, @PApellido2, @PContrasenna, @PEncargado);
end;
go

--Procedimiento de actualizar en tabla Funcionario
create or alter procedure usp_actualizar_funcionario @PIdFuncionario varchar(30), @PNumDepartamento int, 
@PCorreo varchar(100), @PNombre varchar(50), @PApellido1 varchar(50), 
@PApellido2 varchar(50), @PContrasenna varchar(50), @PEncargado char(1)
as
begin
    update Funcionario 
        set NumDepartamento = @PNumDepartamento,
        Correo = @PCorreo, Nombre = @PNombre, Apellido1 = @PApellido1,
        Apellido2 = @PApellido2, Contrasenna = @PContrasenna, Encargado = @PEncargado
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

--Procedimiento de insertar en tabla Horario
create or alter procedure usp_insertar_Horario @PIdFuncionario varchar(30), 
@PHoraInicio varchar(10), @PHoraFinal varchar(10), @Pduracion varchar(10), @Pdia varchar(10)
as
begin
    insert into Horario (Id, IdFuncionario, HoraInicio, HoraFinal, duracion, dia) 
    values (next value for sec_Id_Horario, @PIdFuncionario, @PHoraInicio, @PHoraFinal, 
    @Pduracion, @Pdia);
end;
go

--Procedimiento de actualizar en tabla Horario
create or alter procedure usp_actualizar_Horario @PId int, @PIdFuncionario varchar(30), 
@PHoraInicio varchar(10), @PHoraFinal varchar(10), @Pduracion varchar(10), @Pdia varchar(10)
as
begin
    update Horario 
        set Id = @PId, IdFuncionario = @PIdFuncionario, HoraInicio = @PHoraInicio,
        HoraFinal = @PHoraFinal, duracion = @Pduracion, dia = @Pdia
    where @PId = Id;
end;
go

--Procedimiento de borrar en tabla Horario
create or alter procedure usp_eliminar_Horario @PId int 
as
begin
    delete from Horario where Id = @PId;
end; 
go

--Tabla Administrador

--Procedimiento de insertar en tabla Administrador
create or alter procedure usp_insertar_administrador @PId int, @PContrasenna varchar(50)
as
begin
    insert into Administrador (Id, Contrasenna)
    values (@PId, @PContrasenna);
end;
go

--Procedimiento de actualizar en tabla Administrador
create or alter procedure usp_actualizar_administrador @PId int, @PContrasenna varchar(50)
as
begin
    update Administrador 
        set Id = @PId, Contrasenna = @PContrasenna
    where @PId = Id;
end;
go

--Procedimiento de borrar en tabla Administrador
create or alter procedure usp_eliminar_administrador @PId int 
as
begin
    delete from Administrador where Id = @PId;
end; 
go

--Tabla Cita
 
--Procedimiento de insertar en tabla Cita
create or alter procedure usp_insertar_cita @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), 
@PApellido1Contribuyente varchar(50), @PApellido2Contribuyente varchar(50), @PCorreoContribuyente varchar(100),
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255),
@PEstado varchar(50), @PRazonReagenda varchar(255)
as
begin
	insert into Cita (Id, IdFuncionario, IdContribuyente, NombreContribuyente, Apellido1Contribuyente, Apellido2Contribuyente, CorreoContribuyente, 
	telefonoContribuyente, Fecha, Detalle, Estado, RazonReagenda) values (next value for sec_Id_cita, @PIdFuncionario, 
	@PIdContribuyente,@PNombreContribuyente, @PApellido1Contribuyente, @PApellido2Contribuyente, 
	@PCorreoContribuyente, @PtelefonoContribuyente, @PFecha, @PDetalle, @PEstado, @PRazonReagenda);
end;
go

--Procedimiento de actualizar en tabla Cita
create or alter procedure usp_actualizar_cita @PId int, @PIdFuncionario varchar(30), @PIdContribuyente varchar(30), @PNombreContribuyente varchar(50), 
@PApellido1Contribuyente varchar(50), @PApellido2Contribuyente varchar(50), @PCorreoContribuyente varchar(100), 
@PtelefonoContribuyente varchar(30), @PFecha datetime, @PDetalle varchar(255),
@PEstado varchar(50), @PRazonReagenda varchar(255)
as
begin
	update Cita
		set IdFuncionario = @PIdFuncionario, IdContribuyente = @PIdContribuyente, NombreContribuyente = @PNombreContribuyente, 
		Apellido1Contribuyente = @PApellido1Contribuyente, Apellido2Contribuyente = @PApellido2Contribuyente, 
		CorreoContribuyente= @PCorreoContribuyente, telefonoContribuyente = @PtelefonoContribuyente,
		Fecha = @PFecha, Detalle = @PDetalle, Estado = @PEstado, RazonReagenda = @PRazonReagenda
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