import { IsNumberString, IsOptional, IsString, isNumberString, isString } from "class-validator";

export class LoginDto{
    @IsString()
    email: string; 

    @IsString()
    password: string;
}