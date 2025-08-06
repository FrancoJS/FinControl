import { IsInt, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsInt()
  @IsNotEmpty()
  balance: number;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
