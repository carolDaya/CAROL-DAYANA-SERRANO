import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Facturacion } from '../facturacion/facturacion.entity';
import { VentaProducto } from '../venta_producto/venta_producto.entity'; // ✅ relación con la tabla intermedia

@Entity('ventas')
export class Ventas {
  // Identificador único
  @PrimaryGeneratedColumn()
  id_venta: number;

  //  Fecha automática de creación
  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  // Total de la venta
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  //  Relación: muchas ventas pertenecen a un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.ventas, {
    onDelete: 'CASCADE',
    eager: true, // carga automática del usuario
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  //  Relación 1:1 con facturación
  @OneToOne(() => Facturacion, (factura) => factura.venta, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  facturacion: Facturacion | null;

  // Relación con venta_producto (una venta puede tener muchos productos)
  @OneToMany(() => VentaProducto, (vp) => vp.venta, {
    cascade: true,
  })
  ventaProductos: VentaProducto[];
}
