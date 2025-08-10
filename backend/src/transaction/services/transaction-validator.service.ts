import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

interface ValidateTransactionOptions {
  type: TransactionType;
  fromAccountId?: string;
  toAccountId?: string;
  fromSavingGoalId?: string;
  toSavingGoalId?: string;
}

@Injectable()
export class TransactionValidatorService {
  public validate({ type, fromAccountId, toAccountId, fromSavingGoalId, toSavingGoalId }: ValidateTransactionOptions) {
    const hasFrom = !!fromAccountId || !!fromSavingGoalId;
    const hasTo = !!toAccountId || !!toSavingGoalId;

    switch (type) {
      case TransactionType.INCOME:
        if (hasFrom) {
          throw new BadRequestException('Las transacciones de ingreso no deben tener origen (fromAccount o fromSavingGoal)');
        }
        if (!toAccountId || toSavingGoalId) {
          throw new BadRequestException(
            'El destino debe ser únicamente una cuenta (toAccount) en las transacciones de ingreso',
          );
        }

        break;

      case TransactionType.EXPENSE:
        if (hasTo) {
          throw new BadRequestException('Las transacciones de gasto no deben tener destino (toAccount o toSavingGoal)');
        }
        if (!fromAccountId || fromSavingGoalId) {
          throw new BadRequestException(
            'El origen debe ser únicamente una cuenta (fromAccount) en las transacciones de gasto',
          );
        }
        break;

      case TransactionType.TRANSFER:
        if (!hasFrom || !hasTo) {
          throw new BadRequestException('Las transferencias deben tener un origen y un destino definidos');
        }

        if (fromSavingGoalId && toSavingGoalId) {
          throw new BadRequestException('No se permite transferir entre metas de ahorro');
        }

        if ((fromAccountId && fromSavingGoalId) || (toAccountId && toSavingGoalId)) {
          throw new BadRequestException('Solo se permite un único origen y un único destino en las transferencias');
        }
        break;

      default:
        throw new BadRequestException(`Tipo de transacción no reconocido: ${type}`);
    }
  }
}
