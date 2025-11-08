import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Directorio donde se almacenará la cobertura
  coverageDirectory: '../coverage',

  // Patrón para incluir los archivos que se deben cubrir
  collectCoverageFrom: ['**/*.(t|j)s'],

  // Archivos de prueba
  testRegex: '.*\\.spec\\.ts$',

  // Extensiones que Jest reconocerá
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Carpeta raíz del código fuente
  rootDir: './src',

  // Transforma los archivos TS usando ts-jest y el tsconfig
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  // Mapea rutas para asegurar que los imports desde src funcionen
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};

export default config;
