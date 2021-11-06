import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { Cart } from "./Cart"


@Entity('user')
class User {

  @PrimaryColumn()
  id: string

  @OneToMany(() => Cart, cart => cart.user)
  @JoinColumn({name: 'id'})
  cart: Cart

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User }