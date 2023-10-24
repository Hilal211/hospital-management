import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from 'entities/Files';
import { FileService } from './files.service';
import { FileController } from './files.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],

})
export class FileModule { }

