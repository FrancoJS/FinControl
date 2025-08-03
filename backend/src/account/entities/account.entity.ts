import { RecTransaction } from 'src/rec-transaction/entities/rec-transaction.entity';
import { SavingGoal } from 'src/saving-goal/entities/saving-goal.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
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
  userId: number;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => SavingGoal, (savingGoal) => savingGoal.account)
  savingGoals: SavingGoal[];

  @OneToMany(() => RecTransaction, (recTransaction) => recTransaction.account)
  recTransaction: RecTransaction[];
}
