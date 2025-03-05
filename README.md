# Proyecto de Alquiler de Vehículos en ASP.NET Core

## Descripción
Este proyecto es una aplicación desarrollada en **ASP.NET Core** dedicada al alquiler de vehículos. La arquitectura del proyecto se encuentra dividida en distintas capas para una mejor organización y mantenimiento.

## Estructura del Proyecto
El proyecto está organizado en las siguientes capas:

- **Controladores (Controllers):** Manejan las solicitudes HTTP y gestionan la lógica de presentación.
- **Vistas (Views):** Contienen la interfaz de usuario utilizando **Razor Pages**.
- **JavaScript (JS):** Scripts utilizados para mejorar la interactividad de la aplicación.
- **Capa de Datos (Data Layer):** Contiene las entidades del modelo y la comunicación con la base de datos.
- **Capa de Negocios (Business Layer):** Contiene la lógica de negocio y validaciones.

## Entidades del Sistema
El proyecto gestiona las siguientes entidades, cada una con su respectivo CRUD:

- **Empleados**
- **Clientes**
- **Vehículos**
- **Seguros**
- **Pagos**
- **Reservas**

## Base de Datos
La aplicación utiliza **SQL Server** como sistema de gestión de base de datos, donde se han creado las tablas necesarias para cada entidad y se han implementado procedimientos almacenados para mejorar el rendimiento en las operaciones CRUD.

## Tecnologías Utilizadas
- ASP.NET Core
- SQL Server
- Entity Framework Core
- JavaScript
- HTML y CSS

## Instalación y Configuración
1. Clonar el repositorio.
2. Configurar la cadena de conexión en `appsettings.json`.
3. Ejecutar las migraciones y asegurarse de que la base de datos esté creada.
4. Ejecutar la aplicación desde Visual Studio o la línea de comandos con `dotnet run`.
5. Adicional comparto el link de la visualización final: http://AlquilerVehiculosProyecto.somee.com

## Contacto
Para cualquier consulta o mejora en el sistema, contáctame a través de correo electrónico o crea un issue en el repositorio.
