import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Doctors } from 'entities/Doctors';
import { Users } from 'entities/Users';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Doctors]),TypeOrmModule.forFeature([Users])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],

})
export class DoctorModule { }

