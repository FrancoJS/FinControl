import { Exclude } from 'class-transformer';
import { Account } from 'src/account/entities/account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Exclude()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
