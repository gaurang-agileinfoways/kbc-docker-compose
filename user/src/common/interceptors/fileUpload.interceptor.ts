import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotAcceptableException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class FileUploadingInterceptor implements NestInterceptor {
  private static readonly MAX_FILE_SIZE = 2 * 1024 * 1024;
  private static readonly multerOptions: MulterOptions = {
    limits: {
      fileSize: FileUploadingInterceptor.MAX_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = [
        'image/jpeg',
        'image/webp',
        'image/png',
        'image/jpg',
      ];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
          new NotAcceptableException(
            'File type not match, only jpg, webp, png, jpeg acceptable.',
          ),
          false,
        );
      }

      cb(null, true);
    },
  };
  private readonly fileInterceptor: NestInterceptor;

  constructor() {
    this.fileInterceptor = new (FileInterceptor(
      'file',
      FileUploadingInterceptor.multerOptions,
    ))();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return this.fileInterceptor.intercept(context, next);
  }
}
