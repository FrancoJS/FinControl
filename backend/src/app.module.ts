import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import { AccountModule } from './account/account.module';
import { SavingGoalModule } from './saving-goal/saving-goal.module';
import { RecTransactionModule } from './rec-transaction/rec-transaction.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TransactionModule,
    CategoryModule,
    AccountModule,
    SavingGoalModule,
    RecTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
