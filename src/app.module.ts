import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://scerutti:WFQJspZaOCYREJCY@cluster0.ezi1rja.mongodb.net/nest'),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      load:[configuration]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
