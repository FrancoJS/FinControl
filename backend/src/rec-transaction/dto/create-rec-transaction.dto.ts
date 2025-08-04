import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Frecuency } from 'src/common/enums/frequency.enum';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

export class CreateRecExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Frecuency)
  @IsNotEmpty()
  frecuency: Frecuency;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  lastExecutionDate?: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  nextExecutionDate: Date;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}
