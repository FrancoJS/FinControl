import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SavingGoal {
  @PrimaryGeneratedColumn()
  id: number;

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
    nullable: false,
    name: 'saved_amount',
  })
  savedAmount: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deadline: Date;

  @ManyToOne(() => Transaction, (transaction) => transaction.toSavingGoal)
  incomingtransactions: Transaction[];

  @ManyToOne(() => Transaction, (transaction) => transaction.fromSavingGoal)
  outgoingtransactions: Transaction[];
}
