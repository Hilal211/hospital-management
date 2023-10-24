/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors } from 'entities/Doctors';
import { Users } from 'entities/Users';
import { AddDoctorDto } from './doctor.dto';
import { encodePassword } from 'src/utils/bcrypt';

export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private doctorRepo: Repository<Doctors>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,

  ) { }


  async addDoctor(body: AddDoctorDto) {
    let doctorData
    let checkEmail = await this.userRepo.findOne({
      where: { email: body.email },
    });
    if (checkEmail) {
      return false;
    } else {
      let user = {
        email: body.email,
        password: encodePassword(body.password),
        type:2
      };  
      this.userRepo.create(user);
      let userData = await this.userRepo.save(user);
      if(userData){
        let doctor = {
          name: body.name,
          specialization: body.specialization,
          userId:userData.userId
        };
        this.doctorRepo.create(doctor);
        doctorData = await this.doctorRepo.save(doctor);
      }
      return doctorData;
    }
  }

  async DoctorsWithSchedules(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return await this.doctorRepo.find({
      relations: { appointments:{patient:true} },
      skip,
      take: pageSize,
    });
  }


}