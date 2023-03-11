import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedroomModule } from './bedroom/bedroom.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BedroomModule, ApartmentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
