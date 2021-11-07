import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./Cart";
import { ProductColor } from "./ProductColor";

@Entity("product")
class Product {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Cart)
  carts: Cart[];

  @ManyToMany(() => Product)
  colors: Product[];

  @OneToMany(() => Product, () => ProductColor)
  color: ProductColor;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
