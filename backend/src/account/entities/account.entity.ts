import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
