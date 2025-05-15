import * as fs from 'node:fs';
import { promises as pfs } from 'fs';
import { HttpException } from '@nestjs/common';

export class FileManager {
  async WriteFile(path: string, data: Express.Multer.File): Promise<string> {
    const rootPath = './files';
    const fullPath = `${rootPath}/${path}`;
    const fileName = `${UniqueId.unique()}.${data.originalname.split('.').pop()}`;
    if (!fs.existsSync(fullPath)) {
      console.log('Creating directory: ' + fullPath);
      await pfs.mkdir(fullPath, { recursive: true });
    }
    await pfs.writeFile(`${fullPath}/${fileName}`, data.buffer);
    return `${path}/${fileName}`;
  }

  async DeleteFile(path: string): Promise<void> {
    if (fs.existsSync('./files/' + path)) {
      await pfs.rm('./files/' + path, { recursive: true });
    }
  }

  async FileToBase64(path: string): Promise<string> {
    const fullPath = `./files/${path}`;
    if (!fs.existsSync(fullPath)) {
      throw new HttpException('O arquivo não existe mais na base de dados', 400);
    }
    const file = fs.readFileSync(fullPath);
    return file.toString('base64');
  }
}

class UniqueId {
  static unique() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
