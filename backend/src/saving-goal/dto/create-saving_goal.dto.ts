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
  @IsOptional()
  savedAmount?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deadline?: Date;
}
