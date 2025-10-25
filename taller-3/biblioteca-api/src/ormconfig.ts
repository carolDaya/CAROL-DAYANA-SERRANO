// Importación del módulo DataSource desde TypeORM
import { DataSource } from 'typeorm';

// Importación y carga de las variables de entorno con dotenv
import * as dotenv from 'dotenv';
dotenv.config(); // Carga las variables del archivo .env en process.env

// Declaración y configuración de la fuente de datos principal de la biblioteca
export const AppDataSource = new DataSource({
  type: 'postgres', // Tipo de base de datos que se usará
  host: process.env.DB_HOST, // Dirección del servidor de base de datos
  port: +(process.env.DB_PORT || 5432), // Puerto de conexión (convertido a número)
  username: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASS, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos

  // 📁 Definición de las rutas donde se encuentran las entidades del proyecto
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // ⚙️ Configuración de sincronización de entidades (solo recomendable en desarrollo)
  synchronize: true, // dev only

  // 🧾 Activación del registro de consultas SQL en consola
  logging: true,
});
