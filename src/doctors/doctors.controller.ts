import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DoctorsService } from './doctors.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { emailExist } from 'src/utils/messages';
import { AddDoctorDto } from './doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorService: DoctorsService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('add')
  @UseInterceptors(FileInterceptor(''))
  async addAdmin(@Body() AddDoctorDto: AddDoctorDto) {
    let response: any;
    try {
      response = await this.doctorService.addDoctor(AddDoctorDto);
      return {
        statusCode: HttpStatus.OK,
        message: response === false ? emailExist : 'Success',
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

  @UseGuards(AuthGuard)
  @Get('with-schedules')
  async updateImage(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    let response: any;
    try {
      response = await this.doctorService.DoctorsWithSchedules(page, pageSize);
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
