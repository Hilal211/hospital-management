import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddDto } from './files.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('files')
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) { }

    @UseGuards(AuthGuard)
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    async addFile(
        @Body() AddDto: AddDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        let response: any;
        try {
            response = await this.fileService.addFile(AddDto, file);
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