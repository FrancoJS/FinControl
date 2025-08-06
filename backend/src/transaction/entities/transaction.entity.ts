import { Account } from 'src/account/entities/account.entity';
import { Category } from 'src/category/entities/category.entity';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { SavingGoal } from 'src/saving-goal/entities/saving-goal.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  type: TransactionType;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({
    nullable: false,
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Account, (account) => account.incomingTransactions)
  @JoinColumn({ name: 'to_account_id' })
  toAccount?: Account;

  @ManyToOne(() => Account, (account) => account.outgoingTransactions)
  @JoinColumn({ name: 'from_account_id' })
  fromAccount?: Account;

  @ManyToOne(() => SavingGoal, (savingGoal) => savingGoal.incomingtransactions)
  @JoinColumn({ name: 'to_saving_goal_id' })
  toSavingGoal?: SavingGoal;

  @ManyToOne(() => SavingGoal, (savingGoal) => savingGoal.outgoingtransactions)
  @JoinColumn({ name: 'from_saving_goal_id' })
  fromSavingGoal?: SavingGoal;

  @Column({
    nullable: false,
    name: 'category_id',
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
