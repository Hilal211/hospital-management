/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from 'entities/Patients';

export class PatientsService {
  constructor(
    @InjectRepository(Patients)
    private PatientRepo: Repository<Patients>,
  ) {}


  async patientWithDoctor(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return await this.PatientRepo.find({
      relations: { patientDoctors:{doctor:true} },
      skip,
      take: pageSize,
    });
  }


}