import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsOptional()
  toAccountId?: string;

  @IsUUID()
  @IsOptional()
  fromAccountId?: string;

  @IsUUID()
  @IsOptional()
  toSavingGoalId?: string;

  @IsUUID()
  @IsOptional()
  fromSavingGoalId?: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
