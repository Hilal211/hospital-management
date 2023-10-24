/* eslint-disable prettier/prettier */
import { IsDateString, IsNumberString, IsOptional, IsString, isNumberString, isString } from "class-validator";

export class AddAppointmentDto{
    @IsNumberString()
    patientId: number;
  
    @IsNumberString()
    doctorId: number;
  
    @IsDateString()
    appointmentDate: Date;
}

export class UpdateStatusDto{
    @IsNumberString()
    appointmentId: number;
  
    @IsNumberString()
    status: number;
  
}





