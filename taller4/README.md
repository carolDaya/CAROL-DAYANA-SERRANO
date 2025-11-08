
#  Taller 4 - Mujeres Digitales  
### Proyecto Backend con NestJS, TypeORM, Swagger y Compodoc

## 👩‍💻 Integrantes del equipo

- **Erika Fernanda Pesca**  
- **Carol Dayana Serrano**  
- **Yesica Patricia Sierra**

## 🫡 Descripción general del proyecto

El **Sistema de Inventario de una Ferretería** es una aplicación web desarrollada con **NestJS** que permite gestionar de forma eficiente el control de productos, entradas, salidas, ventas y proveedores.  

Su propósito principal es **facilitar la administración del inventario y optimizar la organización interna** de la ferretería mediante una interfaz clara y un backend sólido y seguro.

Este proyecto forma parte del **curso Mujeres Digitales**, dentro del **Taller 4**, y aplica buenas prácticas de desarrollo backend, documentación con **Swagger y Compodoc**, autenticación con **JWT**, y pruebas unitarias con **Jest**.

---

### 👌 Objetivo general

Desarrollar un **sistema de inventario** que permita el control de existencias y movimientos de productos en una ferretería, garantizando integridad y eficiencia en la gestión de datos.

---

### 🎯 Objetivos específicos

- Registrar productos, categorías y proveedores.  
- Actualizar el **stock en tiempo real**.  
- Generar **reportes de ventas y existencias**.  
- Controlar el ingreso de usuarios con **roles definidos** para cada nivel de acceso.  


## ⚙️ Stack Tecnológico

| Tecnología | Descripción |
|-------------|-------------|
| **NestJS** | Framework principal para el backend. |
| **TypeORM** | ORM para manejar la base de datos PostgreSQL. |
| **PostgreSQL** | Base de datos relacional usada en el proyecto. |
| **Swagger** | Documentación interactiva de la API. |
| **Compodoc** | Documentación técnica del código fuente. |
| **JWT & Passport** | Autenticación basada en tokens. |
| **Jest** | Framework de testing para controladores y servicios. |

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Acceder al directorio:
   ```bash
   cd taller4
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Crear archivo `.env` con las variables:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=admin
   DATABASE_NAME=taller4
   JWT_SECRET=secreto123
   ```
5. Ejecutar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## 📜 Documentación de la API (Swagger)

Una vez levantado el servidor, ingresar a:

👉 **http://localhost:3000/api**

Allí encontrarás todas las rutas documentadas con sus tipos, ejemplos y respuestas.

## 🧭 Documentación del código (Compodoc)

Para generar la documentación técnica del código:

```bash
npm run doc
```

Se abrirá automáticamente en:

👉 **http://localhost:3001**

📄 Incluye más de 10 archivos documentados al 100%.

## 🧪 Testing

El proyecto incluye pruebas unitarias para **controladores**, **servicios** y **guards**.

Ejecuta los tests con:
```bash
npm run test
```
## 🖥️ Metodología de trabajo

Durante el desarrollo del proyecto se aplicó la **metodología ágil Scrum y github**, dividiendo el trabajo en **sprints** y gestionando las tareas mediante tableros colaborativos.

Esta metodología permitió organizar roles, distribuir tareas y cumplir con los objetivos de manera eficiente.

🔗 **Enlace a la evidencia de trabajo Scrum:**  
[https://trello.com/invite/b/690172322297b42e9235ee47/ATTI03506923c8b4720da337f7ca2dbe689fBE3F244D/mi-tablero-de-trello](https://trello.com/invite/b/690172322297b42e9235ee47/ATTI03506923c8b4720da337f7ca2dbe689fBE3F244D/mi-tablero-de-trello) 

## 🧰 Cómo aportar al proyecto

1. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Realiza tus cambios y ejecuta los tests.
3. Envía un Pull Request con la descripción de los cambios.

### Roles del equipo
**Erika Fernanda Pesca** → implementacion de documentación del proyecto y desarrollo de pruebas unitarias.  
- **Carol Dayana Serrano** → Implementación de controladores y servicios, apoyo en pruebas y documentación técnica.  
- **Yesica Patricia Sierra** → Elaboración del archivo **README.md** 

## 👩‍🏫 Autoría

Proyecto desarrollado en el marco del programa **Mujeres Digitales**  
 Año: **2025**




