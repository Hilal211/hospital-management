import { IsNumberString, IsOptional, IsString } from "class-validator";

export class AddDto{


    @IsNumberString()
    patientId: number

    @IsNumberString()
    doctorId: number



}

