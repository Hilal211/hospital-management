import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('with-doctors')
  async updateImage(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    let response: any;
    try {
      response = await this.patientsService.patientWithDoctor(page, pageSize);
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
