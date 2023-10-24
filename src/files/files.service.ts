import { InjectRepository } from '@nestjs/typeorm';
import {Files } from 'entities/Files';
import { IsNull, Repository } from 'typeorm';
import { AddDto } from './files.dto';
import { uploadFile } from 'src/utils/global';
import { Patients } from 'entities/Patients';

export class FileService {
  constructor(
    @InjectRepository(Files)
    private fileRepo: Repository<Files>,
  ) {}

  async addFile(body: AddDto, file: Express.Multer.File = undefined) {
    if (file != undefined) {
      let fileName = uploadFile(file, 'files');
      body['file'] = fileName;
    }
    this.fileRepo.create(body);
    let data = await this.fileRepo.save(body);
    return data;
  }



}