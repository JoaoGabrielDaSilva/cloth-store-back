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
import { ProductImage } from "./ProductImage";

@Entity("product")
class Product {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Cart)
  carts: Cart[];

  @ManyToMany(() => Product, () => Product)
  @JoinTable({
    name: "product_products",
    joinColumn: {
     name: "product_id",
     referencedColumnName: "id"
    },
    inverseJoinColumn: {
     name: "related_product_id",
     referencedColumnName: "id"
     }
  })
  colors: Product[];

  @OneToOne(() => ProductColor)
  @JoinColumn({name: 'id'})
  color: ProductColor;

  @OneToMany(() => ProductImage, image => image.product)
  images: ProductImage[]

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
