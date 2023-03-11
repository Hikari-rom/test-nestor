import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentModule } from './apartment/apartment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedroomModule } from './bedroom/bedroom.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BedroomModule, ApartmentModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'nestor',
    password: 'root',
    database: 'nestor',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }