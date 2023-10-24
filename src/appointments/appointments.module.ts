import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointments } from 'entities/Appointments';
import { PatientDoctor } from 'entities/PatientDoctor';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Appointments]),TypeOrmModule.forFeature([PatientDoctor])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],

})
export class AppointmentModule { }

