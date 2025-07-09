USE [INCORP_domus]
GO
/****** Object:  Table [dbo].[accesosporhorario]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[accesosporhorario](
	[id_acceso] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[hora_inicio] [time](7) NULL,
	[hora_fin] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_acceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[acciones]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[acciones](
	[id_accion] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_accion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actuadores]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actuadores](
	[id_actuador] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[tipo] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_actuador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alertassistema]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alertassistema](
	[id_alerta] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
	[nivel_alerta] [int] NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_alerta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bitacoradispositivos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bitacoradispositivos](
	[id_bitacora] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[evento] [nvarchar](200) NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_bitacora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comandogesto]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comandogesto](
	[id_gesto] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
	[usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_gesto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comandos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comandos](
	[id_comando] [int] IDENTITY(1,1) NOT NULL,
	[texto] [nvarchar](200) NULL,
	[dispositivo_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_comando] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comandovoz]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comandovoz](
	[id_comando] [int] IDENTITY(1,1) NOT NULL,
	[texto] [nvarchar](200) NULL,
	[usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_comando] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[condiciones]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[condiciones](
	[id_condicion] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_condicion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[configred]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[configred](
	[id_config] [int] IDENTITY(1,1) NOT NULL,
	[ip] [nvarchar](50) NULL,
	[puerto] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_config] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contextoshibridos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contextoshibridos](
	[id_db] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_db] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[coordenadasdispositivo]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coordenadasdispositivo](
	[id_coordenada] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[x] [int] NULL,
	[y] [int] NULL,
	[plano_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_coordenada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dispositivos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dispositivos](
	[id_dispositivo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[tipo_id] [int] NULL,
	[marca_id] [int] NULL,
	[zona_id] [int] NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_dispositivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estadisticasuso]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estadisticasuso](
	[id_estadistica] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[uso_horas] [float] NULL,
	[fecha] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_estadistica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estadosdispositivo]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estadosdispositivo](
	[id_estado] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[valor] [nvarchar](100) NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[eventos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[eventos](
	[id_evento] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[condicion] [nvarchar](255) NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[filtroscontenido]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[filtroscontenido](
	[id_filtro] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_filtro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[habitaciones]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[habitaciones](
	[id_habitacion] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[zona_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_habitacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ia_historicoaccion]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ia_historicoaccion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[accion_id] [int] NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[imagenplano]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[imagenplano](
	[id_imagen] [int] IDENTITY(1,1) NOT NULL,
	[plano_id] [int] NULL,
	[url] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_imagen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[logsacceso]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[logsacceso](
	[id_log] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[evento] [nvarchar](200) NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[marcasdispositivo]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[marcasdispositivo](
	[id_marca] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_marca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mqttmensajes]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mqttmensajes](
	[id_mensaje] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[payload] [nvarchar](max) NULL,
	[timestamp] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_mensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notificaciones]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notificaciones](
	[id_notificacion] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[mensaje] [nvarchar](200) NULL,
	[leido] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_notificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[organizacion]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[organizacion](
	[id_organizacion] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [nvarchar](100) NULL,
	[nombre] [nvarchar](100) NULL,
	[descripcion] [nvarchar](255) NULL,
	[direccion] [nvarchar](200) NULL,
	[estado] [int] NULL,
 CONSTRAINT [PK__organiza__B2D27FD128F9192E] PRIMARY KEY CLUSTERED 
(
	[id_organizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perfiles]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perfiles](
	[id_perfil] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_perfil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[planos]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[planos](
	[id_plano] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[imagen_url] [nvarchar](200) NULL,
	[zona_id] [int] NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_plano] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[preferenciasinput]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[preferenciasinput](
	[id_preferencia] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[tipo_input] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_preferencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[preferenciasusuario]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[preferenciasusuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[idioma] [nvarchar](20) NULL,
	[volumen] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rutinas]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rutinas](
	[id_rutina] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[evento_id] [int] NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rutina] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sensores]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sensores](
	[id_sensor] [int] IDENTITY(1,1) NOT NULL,
	[dispositivo_id] [int] NULL,
	[tipo] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_sensor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serviciosintegrados]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serviciosintegrados](
	[id_servicio] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[tipo] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_servicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tiposdispositivo]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tiposdispositivo](
	[id_tipo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tokensintegracion]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tokensintegracion](
	[id_token] [int] IDENTITY(1,1) NOT NULL,
	[servicio_id] [int] NULL,
	[token] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[email] [nvarchar](100) NULL,
	[perfil_id] [int] NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[zonas]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zonas](
	[id_zona] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[ubicacion] [nvarchar](100) NULL,
	[id_organizacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_zona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[zonasaccesibles]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zonasaccesibles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[zona_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[zonasseguras]    Script Date: 01/06/2025 2:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zonasseguras](
	[id_zonasegura] [int] IDENTITY(1,1) NOT NULL,
	[zona_id] [int] NULL,
	[nivel_seguridad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_zonasegura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[accesosporhorario]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[actuadores]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[bitacoradispositivos]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[comandogesto]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[comandos]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[comandovoz]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[coordenadasdispositivo]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[coordenadasdispositivo]  WITH CHECK ADD FOREIGN KEY([plano_id])
REFERENCES [dbo].[planos] ([id_plano])
GO
ALTER TABLE [dbo].[dispositivos]  WITH CHECK ADD  CONSTRAINT [FK__dispositi__id_or__1CBC4616] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[dispositivos] CHECK CONSTRAINT [FK__dispositi__id_or__1CBC4616]
GO
ALTER TABLE [dbo].[dispositivos]  WITH CHECK ADD FOREIGN KEY([marca_id])
REFERENCES [dbo].[marcasdispositivo] ([id_marca])
GO
ALTER TABLE [dbo].[dispositivos]  WITH CHECK ADD FOREIGN KEY([tipo_id])
REFERENCES [dbo].[tiposdispositivo] ([id_tipo])
GO
ALTER TABLE [dbo].[dispositivos]  WITH CHECK ADD FOREIGN KEY([zona_id])
REFERENCES [dbo].[zonas] ([id_zona])
GO
ALTER TABLE [dbo].[estadisticasuso]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[estadosdispositivo]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[eventos]  WITH CHECK ADD  CONSTRAINT [FK__eventos__id_orga__1EA48E88] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[eventos] CHECK CONSTRAINT [FK__eventos__id_orga__1EA48E88]
GO
ALTER TABLE [dbo].[habitaciones]  WITH CHECK ADD FOREIGN KEY([zona_id])
REFERENCES [dbo].[zonas] ([id_zona])
GO
ALTER TABLE [dbo].[ia_historicoaccion]  WITH CHECK ADD FOREIGN KEY([accion_id])
REFERENCES [dbo].[acciones] ([id_accion])
GO
ALTER TABLE [dbo].[imagenplano]  WITH CHECK ADD FOREIGN KEY([plano_id])
REFERENCES [dbo].[planos] ([id_plano])
GO
ALTER TABLE [dbo].[logsacceso]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[mqttmensajes]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[notificaciones]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[planos]  WITH CHECK ADD  CONSTRAINT [FK__planos__id_organ__1DB06A4F] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[planos] CHECK CONSTRAINT [FK__planos__id_organ__1DB06A4F]
GO
ALTER TABLE [dbo].[planos]  WITH CHECK ADD FOREIGN KEY([zona_id])
REFERENCES [dbo].[zonas] ([id_zona])
GO
ALTER TABLE [dbo].[preferenciasinput]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[preferenciasusuario]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[rutinas]  WITH CHECK ADD FOREIGN KEY([evento_id])
REFERENCES [dbo].[eventos] ([id_evento])
GO
ALTER TABLE [dbo].[rutinas]  WITH CHECK ADD  CONSTRAINT [FK__rutinas__id_orga__1F98B2C1] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[rutinas] CHECK CONSTRAINT [FK__rutinas__id_orga__1F98B2C1]
GO
ALTER TABLE [dbo].[rutinas]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[sensores]  WITH CHECK ADD FOREIGN KEY([dispositivo_id])
REFERENCES [dbo].[dispositivos] ([id_dispositivo])
GO
ALTER TABLE [dbo].[tokensintegracion]  WITH CHECK ADD FOREIGN KEY([servicio_id])
REFERENCES [dbo].[serviciosintegrados] ([id_servicio])
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK__usuarios__id_org__1AD3FDA4] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK__usuarios__id_org__1AD3FDA4]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD FOREIGN KEY([perfil_id])
REFERENCES [dbo].[perfiles] ([id_perfil])
GO
ALTER TABLE [dbo].[zonas]  WITH CHECK ADD  CONSTRAINT [FK__zonas__id_organi__1BC821DD] FOREIGN KEY([id_organizacion])
REFERENCES [dbo].[organizacion] ([id_organizacion])
GO
ALTER TABLE [dbo].[zonas] CHECK CONSTRAINT [FK__zonas__id_organi__1BC821DD]
GO
ALTER TABLE [dbo].[zonasaccesibles]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id_usuario])
GO
ALTER TABLE [dbo].[zonasaccesibles]  WITH CHECK ADD FOREIGN KEY([zona_id])
REFERENCES [dbo].[zonas] ([id_zona])
GO
ALTER TABLE [dbo].[zonasseguras]  WITH CHECK ADD FOREIGN KEY([zona_id])
REFERENCES [dbo].[zonas] ([id_zona])
GO
