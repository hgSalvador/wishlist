import { Log } from "../repositories/logs-repository";
import { LogsRepository } from "../repositories/logs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";


interface GetAllLogsUseCaseRequest {
    page: number
}

interface GetAllLogsUseCaseResponse {
    logs:Log[]
}

export class GetAllLogsUseCase {
    constructor(private logsRepository: LogsRepository) {}

    async execute({
        page,
    }: GetAllLogsUseCaseRequest): Promise<GetAllLogsUseCaseResponse> {
        const logs = await this.logsRepository.findManyLogs({ page })

        if (logs.length === 0) {
            throw new ResourceNotFoundError()
        }

        return {
            logs
        }
    }
}