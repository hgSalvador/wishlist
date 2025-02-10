import { PrismaLogsRepository } from '../../repositories/prisma/prisma-logs-repository';
import { CreateLogUseCase } from '../create-log';

export function makeCreateLogUseCase() {
  const logsRepository = new PrismaLogsRepository();
  const createLogUseCase = new CreateLogUseCase(logsRepository);

  return createLogUseCase;
}