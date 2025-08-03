import { Account } from 'src/account/entities/account.entity';
import { Frecuency } from 'src/common/enums/frequency.enum';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecTransaction {
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
  amount: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'last_execution_date',
  })
  lastExecutionDate: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'next_execution_date',
  })
  nextExecutionDate: Date;

  @Column({
    type: 'enum',
    enum: Frecuency,
    nullable: false,
  })
  frequency: Frecuency;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  type: TransactionType;

  @Column({
    nullable: false,
    name: 'account_id',
  })
  accountId: number;

  @ManyToOne(() => Account, (account) => account.recTransaction)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
