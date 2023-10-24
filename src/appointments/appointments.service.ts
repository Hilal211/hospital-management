/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'entities/Appointments';
import { AddAppointmentDto, UpdateStatusDto } from './appointment.dto';
import { Between } from 'typeorm';
import { PatientDoctor } from 'entities/PatientDoctor';

export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private appointmentRepo: Repository<Appointments>,
    @InjectRepository(PatientDoctor)
    private patientDoctorRepo: Repository<PatientDoctor>,

  ) { }

  async scheduleAppointment(body: AddAppointmentDto) {
    const isSlotAvailable = await this.isAppointmentSlotAvailable(body.doctorId, body.appointmentDate);
    const assigned = await this.patientDoctorRepo.findOne({where:{patientId:body.patientId,doctorId:body.doctorId}})

    if (isSlotAvailable && assigned) {
      const newAppointment = this.appointmentRepo.create({
        doctorId: body.doctorId,
        patientId: body.patientId,
        appointmentDate: body.appointmentDate,
        status:1
      });

      return this.appointmentRepo.save(newAppointment);
    } else {
      return false
    }
  }

  async isAppointmentSlotAvailable(doctorId: number, appointmentDate: Date): Promise<boolean> {
    appointmentDate=new Date(appointmentDate)
    let thirtyMinutesBefore = new Date(appointmentDate.getTime() - 30 * 60 * 1000);
    let thirtyMinutesAfter = new Date(appointmentDate.getTime() + 30 * 60 * 1000);
    const existingAppointment = await this.appointmentRepo.findOne({
      where: {
        doctorId,
        appointmentDate: Between(thirtyMinutesBefore, thirtyMinutesAfter),
      },
    });
  
    return !existingAppointment;
  }

  async updateStatus(body: UpdateStatusDto) {
    let data = await this.appointmentRepo
      .createQueryBuilder()
      .update(Appointments)
      .set({ status: body.status })
      .where({ appointmentId: body.appointmentId })
      .execute();

    return data;
  }
}





