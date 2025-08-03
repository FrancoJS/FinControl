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
  })
  targetAmount: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  savedAmount: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deadline: Date;

  @Column({ nullable: false })
  accountId: number;

  @OneToMany(() => Account, (account) => account.savingGoals)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
