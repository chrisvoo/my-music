import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MonitoringService {
  constructor(@InjectConnection() private connection: Connection) {}

  monitoring(): any {
    return { status: this.connection.readyState === 1 ? 'OK' : 'KO' };
  }
}
