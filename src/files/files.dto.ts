import { IsNumberString} from "class-validator";

export class AddDto{
    @IsNumberString()
    patientId: number

    @IsNumberString()
    doctorId: number
}

