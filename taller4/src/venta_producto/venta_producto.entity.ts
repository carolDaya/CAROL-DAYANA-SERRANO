import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Ventas } from '../ventas/ventas.entity';
import { Producto } from '../producto/producto.entity';

@Index(['venta', 'producto'], { unique: true })
@Entity('venta_producto')
export class VentaProducto {
  @PrimaryGeneratedColumn()
  id_venta_producto!: number;

  @Column({ type: 'int' })
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  // Relación con Ventas
  @ManyToOne(() => Ventas, (venta) => venta.ventaProductos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_venta' })
  venta!: Ventas;

  // Relación con Producto
  @ManyToOne(() => Producto, (producto) => producto.ventaProductos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}
