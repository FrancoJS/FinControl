import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
