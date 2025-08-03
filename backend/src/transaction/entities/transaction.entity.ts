import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: false,
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
