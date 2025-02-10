import { PrismaClient } from '@prisma/client/extension';
import { LogsRepository, Log } from '../logs-repository';
import { PaginationParams } from '../pagination-params';

const prisma = new PrismaClient();

export class PrismaLogsRepository implements LogsRepository {
  async findManyLogs({ page }: PaginationParams): Promise<Log[]> {
    const logs = await prisma.log.findMany({
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        timeStamps: 'desc',
      },
    });

    return logs.map(log => ({
      id: log.id,
      protocol: log.protocol,
      endpoint: log.endpoint,
      method: log.method,
      statusCode: log.statusCode,
      sourceUniqueId: log.sourceUniqueId,
      timeStamps: log.timeStamps,
    }));
  }

  async create(log: Log): Promise<Log> {
    const createdLog = await prisma.log.create({
      data: {
        id: log.id,
        protocol: log.protocol,
        endpoint: log.endpoint,
        method: log.method,
        statusCode: log.statusCode,
        sourceUniqueId: log.sourceUniqueId,
        timeStamps: log.timeStamps,
      },
    });

    return {
      id: createdLog.id,
      protocol: createdLog.protocol,
      endpoint: createdLog.endpoint,
      method: createdLog.method,
      statusCode: createdLog.statusCode,
      sourceUniqueId: createdLog.sourceUniqueId,
      timeStamps: createdLog.timeStamps,
    };
  }

  async save(log: Log): Promise<void> {
    await prisma.log.update({
      where: {
        id: log.id,
      },
      data: {
        protocol: log.protocol,
        endpoint: log.endpoint,
        method: log.method,
        statusCode: log.statusCode,
        sourceUniqueId: log.sourceUniqueId,
        timeStamps: log.timeStamps,
      },
    });
  }
}