import { Exclude } from 'class-transformer';
import { RecTransaction } from 'src/rec-transaction/entities/rec-transaction.entity';
import { SavingGoal } from 'src/saving-goal/entities/saving-goal.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  balance: number;

  @Column({
    nullable: false,
    name: 'user_id',
  })
  @Exclude()
  userId: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => SavingGoal, (savingGoal) => savingGoal.account)
  savingGoals: SavingGoal[];

  @OneToMany(() => RecTransaction, (recTransaction) => recTransaction.account)
  recTransaction: RecTransaction[];
}
