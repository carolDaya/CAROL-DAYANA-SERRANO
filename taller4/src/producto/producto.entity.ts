import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Proveedor } from '../proveedor/proveedor.entity';
import { Categoria } from '../categoria/categoria.entity';
import { VentaProducto } from '../venta_producto/venta_producto.entity'; // Importa la entidad

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column('int')
  stock: number;

  // Relaciones existentes
  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  proveedor: Proveedor;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  //RELACIÓN CON VENTA_PRODUCTO
  @OneToMany(() => VentaProducto, (ventaProducto) => ventaProducto.producto)
  ventaProductos: VentaProducto[];
}
