import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AppointmentsService } from './appointments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddAppointmentDto, UpdateStatusDto } from './appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('add')
  @UseInterceptors(FileInterceptor(''))
  async addAppointment(@Body() AddAppointmentDto: AddAppointmentDto) {
    let response: any;
    try {
      response = await this.appointmentsService.scheduleAppointment(AddAppointmentDto);
      if(!response){
        return {
          statusCode: HttpStatus.OK,
          message: 'Appointment slot is not available',
          data: response,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
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
    @Post('change-status')
    @UseInterceptors(FileInterceptor(''))
    async UpdateStatus(@Body() UpdateStatusDto: UpdateStatusDto) {
      let response: any;
      try {
        response = await this.appointmentsService.updateStatus(UpdateStatusDto);
        return {
          statusCode: HttpStatus.OK,
          message: 'Success',
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
