import { PartialType } from '@nestjs/mapped-types';
import { CreateRecExpenseDto } from './create-rec-transaction.dto';

export class UpdateRecExpenseDto extends PartialType(CreateRecExpenseDto) {}
