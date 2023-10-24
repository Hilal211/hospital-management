import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientDoctorModule } from './patient-doctor/patient-doctor.module';
import { FileModule } from './files/files.module';
import { PatientModule } from './patients/patients.module';
import { DoctorModule } from './doctors/doctors.module';
import { AppointmentModule } from './appointments/appointments.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hospital_management',
      entities: [__dirname + '/../**/entities/*.js'],
    }),
    UsersModule,
    AuthModule,
    PatientDoctorModule,
    FileModule,
    PatientModule,
    DoctorModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
