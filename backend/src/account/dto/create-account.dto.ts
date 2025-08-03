import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsInt()
  @IsNotEmpty()
  balance: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
