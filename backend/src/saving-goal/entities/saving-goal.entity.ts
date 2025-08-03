import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: false, name: 'account_id' })
  accountId: number;

  @OneToMany(() => Account, (account) => account.savingGoals)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
