import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";
import { CreateLogUseCase } from "./create-log";

let inMemoryLogsRepository: InMemoryLogsRepository
let sut: CreateLogUseCase

describe('Create a log', () => {
    beforeEach(() => {
        inMemoryLogsRepository = new InMemoryLogsRepository(),
        sut = new CreateLogUseCase(inMemoryLogsRepository)
    })

    it('should be able to register', async () => {
        const { log } = await sut.execute({
            protocol: 'HTTP',
            endpoint: 'example.url/api/movie',
            method: 'GET',
            statusCode: 200,
            sourceUniqueId: 'movie-01',
        })

        if (!log) {
            return null
        }
    
        expect(inMemoryLogsRepository.items[0].id).toEqual(log.id)
      })
})