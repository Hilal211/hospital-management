import { InjectRepository } from '@nestjs/typeorm';
import {PatientDoctor } from 'entities/PatientDoctor';
import { IsNull, Repository } from 'typeorm';
import { AddDto } from './patient-doctor.dto';

export class PatientDoctorService {
  constructor(
    @InjectRepository(PatientDoctor)
    private patientDoctorRepo: Repository<PatientDoctor>,
  ) {}

  //assign Function
  async assign(body: AddDto) {
    this.patientDoctorRepo.create(body);
    let data = await this.patientDoctorRepo.save(body);
    return data;
  }

  async patientByDoctor(id: number, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return await this.patientDoctorRepo.find({
      where: { patientId: id },
      relations: { patient: { files: true } },
      skip,
      take: pageSize,
    });
  }

  
}