import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { SavingGoal } from 'src/saving-goal/entities/saving-goal.entity';
import { EntityManager } from 'typeorm';

interface TransactionData {
  type: TransactionType;
  toAccount: Account | null;
  fromAccount: Account | null;
  toSavingGoal: SavingGoal | null;
  fromSavingGoal: SavingGoal | null;
  amount: number;
}

@Injectable()
export class BalanceUpdaterService {
  constructor() {}

  public async updateBalances(
    manager: EntityManager,
    { type, toAccount, fromAccount, toSavingGoal, fromSavingGoal, amount }: TransactionData,
  ) {
    const accountRepo = manager.getRepository(Account);
    const savingGoalRepo = manager.getRepository(SavingGoal);

    switch (type) {
      case TransactionType.INCOME: {
        if (toAccount) {
          const iResult = await accountRepo.increment({ id: toAccount?.id }, 'balance', amount);
          if (iResult.affected === 0) {
            throw new InternalServerErrorException('Ocurrio un error al realizar la entrada de dinero, intentelo de nuevo');
          }
        }
        break;
      }

      case TransactionType.EXPENSE: {
        if (fromAccount && fromAccount.balance >= amount) {
          const dResult = await accountRepo.decrement({ id: fromAccount?.id }, 'balance', amount);
          if (dResult.affected === 0) {
            throw new InternalServerErrorException('Ocurrio un error al realizar la salida de dinero, intentelo de nuevo');
          }
        }

        break;
      }

      case TransactionType.TRANSFER: {
        if (fromAccount && fromAccount?.balance < amount) {
          throw new BadRequestException(
            `La cantidad a transferir desde la cuenta ${fromAccount.name} no puede ser mayor al balance que ya tiene`,
          );
        }

        if (fromSavingGoal && fromSavingGoal?.savedAmount < amount) {
          throw new BadRequestException(
            `La cantidad a transferir desde la meta de ahorro ${fromSavingGoal.name} no puede ser mayor a la cantidad ahorrada que ya tiene`,
          );
        }

        // Transferencia entre cuentas
        if (fromAccount && toAccount) {
          const dResult = await accountRepo.decrement({ id: fromAccount.id }, 'balance', amount);
          const iResult = await accountRepo.increment({ id: toAccount.id }, 'balance', amount);
          if (dResult.affected === 0 || iResult.affected === 0) {
            throw new InternalServerErrorException('Ocurrio un error al realizar la transferencia, intentelo de nuevo');
          }
        }

        // Transferencia desde cuenta a meta de ahorro
        if (fromAccount && toSavingGoal) {
          const dResult = await accountRepo.decrement({ id: fromAccount.id }, 'balance', amount);
          const iResult = await savingGoalRepo.increment({ id: toSavingGoal.id }, 'savedAmount', amount);
          if (dResult.affected === 0 || iResult.affected === 0) {
            throw new InternalServerErrorException('Ocurrio un error al realizar la transferencia, intentelo de nuevo');
          }
        }

        if (fromSavingGoal && toAccount) {
          const dResult = await savingGoalRepo.decrement({ id: fromSavingGoal.id }, 'savedAmount', amount);
          const iResult = await accountRepo.increment({ id: toAccount.id }, 'balance', amount);

          if (dResult.affected === 0 || iResult.affected === 0) {
            throw new InternalServerErrorException('Ocurrio un error al realizar la transferencia, intentelo de nuevo');
          }
        }
        break;
      }
    }
  }
}
