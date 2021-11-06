import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { User } from "./User"


@Entity('shopping_cart')
class Cart {

  @PrimaryColumn()
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User
  
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

export { Cart }