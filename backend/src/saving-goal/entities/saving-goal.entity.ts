import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SavingGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'target_amount',
  })
  targetAmount: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'saved_amount',
  })
  savedAmount: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deadline: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.toSavingGoal)
  incomingtransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromSavingGoal)
  outgoingtransactions: Transaction[];
}
