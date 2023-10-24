import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PatientDoctorService } from './patient-doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddDto } from './patient-doctor.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('patient-doctor')
export class PatientDoctorController {
    constructor(
        private readonly patientDoctorService: PatientDoctorService,
    ) { }

    //Assign Handler
    @UseGuards(AuthGuard)
    @Post('assign')
    @UseInterceptors(FileInterceptor(''))
    async addImage(
        @Body() AddDto: AddDto,
    ) {
        let response: any;
        try {
            response = await this.patientDoctorService.assign(AddDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'success',
                data: response,
            };
        } catch (err) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.OK,
                    message: err,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    //access file
    @UseGuards(AuthGuard)
    @Get('/:id')
    async updateImage(
        @Param('id') id: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10, 
    ) {
        let response: any;
        try {
            response = await this.patientDoctorService.patientByDoctor(+id, page, pageSize); 
            return {
                statusCode: HttpStatus.OK,
                message: '',
                data: response,
            };
        } catch (err) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.OK,
                    message: err,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}