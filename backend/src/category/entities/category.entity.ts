import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../../common/enums/transaction-type.enum';
import { RecTransaction } from 'src/rec-transaction/entities/rec-transaction.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  type: TransactionType;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @OneToMany(() => RecTransaction, (recTransaction) => recTransaction.category)
  recTransactions: RecTransaction[];
}
