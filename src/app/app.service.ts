import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTeste(): string {
    return 'Teste!';
  }
  getTestePost(): string {
    return 'Teste Post!';
  }
}
