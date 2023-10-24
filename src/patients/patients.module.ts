import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patients } from 'entities/Patients';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Patients])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],

})
export class PatientModule { }

