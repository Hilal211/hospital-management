import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientDoctor } from 'entities/PatientDoctor';
import { PatientDoctorService } from './patient-doctor.service';
import { PatientDoctorController } from './patient-doctor.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PatientDoctor])],
  controllers: [PatientDoctorController],
  providers: [PatientDoctorService],
  exports: [PatientDoctorService],

})
export class PatientDoctorModule { }

