import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository"
import { GetAllLogsUseCase } from "../use-cases/get-logs"
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { Log } from "../repositories/logs-repository";

let logs: Log[]
let inMemoryLogsRepository: InMemoryLogsRepository
let sut: GetAllLogsUseCase

describe('List logs', () => {
    beforeEach(async () => {
        inMemoryLogsRepository = new InMemoryLogsRepository();
        sut = new GetAllLogsUseCase(inMemoryLogsRepository);

        logs = Array.from({ length: 22 }, (_, index) => ({
            id: `log-${index + 1}`,
            protocol: `PROTOCOL-${index + 1}`,
            endpoint: `/endpoint-${index + 1}`,
            method: index % 2 === 0 ? "GET" : "POST",
            statusCode: 200 + index,
            sourceUniqueId: `source-${index + 1}`,
            timeStamps: new Date(),
        }));

        await Promise.all(logs.map((log) => inMemoryLogsRepository.create(log)))
    });

    it('should be able to list all logs', async () => {
        const { logs } = await sut.execute({
            page: 1
        })

        expect(logs).toHaveLength(20)
    })

    it('should be able to get paginated logs', async () => {
        
        const { logs } = await sut.execute({
            page: 2
        })

        expect(logs).toHaveLength(2)
    })

    it('should be able to not found movies', async ()=> {
        await expect(sut.execute({             
            page: 3 
        })).rejects.toThrowError(ResourceNotFoundError)
    })
});