import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs-extra'; 
const uploads = "./uploads/"

export function uploadFile(picture: Express.Multer.File, folder: string){
    let extension = picture.originalname.split('.');
      let name =
        Date.now().toString().slice(-6) + '.' + extension[extension.length - 1];
      const fileContents = Buffer.from(picture.buffer).toString('base64');
      fs.writeFile(
        uploads + folder +'/' + name,
        fileContents,
        'base64',
        function (err: any) {
          if(err)
            throw new HttpException(
              {
                statusCode: HttpStatus.OK,
                message: err,
              },
              HttpStatus.BAD_REQUEST,
            );
        },
      );

    return name;
}