import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
