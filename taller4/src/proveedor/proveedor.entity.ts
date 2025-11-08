import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Producto } from '../producto/producto.entity';
import * as crypto from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Proveedor {
  @ApiProperty({ example: 1, description: 'Identificador único del proveedor' })
  @PrimaryGeneratedColumn()
  id_proveedor!: number;

  @ApiProperty({
    example: 'Distribuciones La Española',
    description: 'Nombre del proveedor',
  })
  @Column()
  nombre: string;

  @ApiProperty({
    example: '3004567890',
    description: 'Teléfono de contacto del proveedor',
  })
  @Column()
  telefono: string;

  @ApiProperty({
    example: 'proveedor@gmail.com',
    description: 'Correo electrónico encriptado del proveedor',
  })
  @Column()
  correo: string;

  @ApiProperty({
    type: () => [Producto],
    description: 'Lista de productos asociados al proveedor',
  })
  @OneToMany(() => Producto, (producto) => producto.proveedor)
  productos: Producto[];

  // Claves para encriptación (32 y 16 bytes)
  private readonly ENCRYPTION_KEY = Buffer.from(
    '12345678901234567890123456789012',
  ); // 32 bytes
  private readonly IV = Buffer.from('1234567890123456'); // 16 bytes

  @BeforeInsert()
  @BeforeUpdate()
  encryptEmail() {
    // Solo encriptar si aún no está en formato hexadecimal
    if (!/^[0-9a-f]+$/.test(this.correo)) {
      const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        this.ENCRYPTION_KEY,
        this.IV,
      );
      let encrypted = cipher.update(this.correo, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      this.correo = encrypted;
    }
  }

  getDecryptedEmail(): string {
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        this.ENCRYPTION_KEY,
        this.IV,
      );
      let decrypted = decipher.update(this.correo, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch {
      // Si ya está desencriptado o falla, se devuelve el valor original
      return this.correo;
    }
  }
}
