import { randomUUID } from "crypto";
import { Log, LogsRepository } from "../repositories/logs-repository";

interface CreateLogUseCaseRequest {
    protocol: string
    endpoint: string
    method?: string
    statusCode: number
    sourceUniqueId?: string
}

interface CreateLogUseCaseResponse {
    log: Log
}

export class CreateLogUseCase {
    constructor(private LogsRepository: LogsRepository) {}

    async execute(
        {
        protocol,
        endpoint,
        method,
        statusCode,
        sourceUniqueId
    }: CreateLogUseCaseRequest,
    id?: string): Promise<CreateLogUseCaseResponse> {
        const log = await this.LogsRepository.create({
            id: id ?? randomUUID().toString(),
            protocol,
            endpoint,
            method: method ?? undefined,
            statusCode,
            sourceUniqueId: sourceUniqueId ?? "",
            timeStamps: new Date()
        })
        
        return {
            log: log
        }
    }
}