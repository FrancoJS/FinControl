import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSavingGoalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  targetAmount: number;

  @IsInt()
  @IsNotEmpty()
  savedAmount: number;

  @IsInt()
  @IsNotEmpty()
  accountId: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deadline?: Date;
}
