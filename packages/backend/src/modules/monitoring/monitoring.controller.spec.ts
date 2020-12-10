import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

describe('MonitoringController', () => {
  let controller: MonitoringController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringController],
      providers: [MonitoringService],
    }).compile();

    controller = app.get<MonitoringController>(MonitoringController);
  });

  describe('root', () => {
    it('should return "OK"', () => {
      expect(controller.monitoring()).toBe('OK');
    });
  });
});
