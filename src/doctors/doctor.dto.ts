/* eslint-disable prettier/prettier */
import { IsNumberString, IsOptional, IsString, isNumberString, isString } from "class-validator";

export class AddDoctorDto{
    @IsString()
    name: string; 

    @IsString()
    email: string; 

    @IsString()
    password: string;

    @IsString()
    specialization: string
}



