import { SavingGoal } from 'src/saving_goal/entities/saving_goal.entity';
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
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => SavingGoal, (savingGoal) => savingGoal.account)
  savingGoals: SavingGoal[];
}
