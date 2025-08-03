import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  balance: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
