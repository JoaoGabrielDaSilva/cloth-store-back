import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity("product_image")
class ProductImage {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string

  @Column()
  image_uri: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product

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

export { ProductImage };
