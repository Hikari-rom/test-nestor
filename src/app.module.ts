import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentModule } from './apartment/apartment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedroomModule } from './bedroom/bedroom.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), BedroomModule, ApartmentModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }