import { Injectable } from '@nestjs/common';

@Injectable()
export class MonitoringService {
  monitoring(): any {
    return { status: 'OK' };
  }
}
