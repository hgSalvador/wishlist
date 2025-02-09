import { LogsRepository } from "../logs-repository";
import { Log } from "../logs-repository";
import { PaginationParams } from "../pagination-params";

export class InMemoryLogsRepository implements LogsRepository { 
    public items: Log[] = []
    
    async findManyLogsByMovieId(logId: string, { page }: PaginationParams) {
        const logs = this.items.filter((item) => item.id === logId).slice((page -1) * 20, page * 20)
        
        if (logs.length === 0) {
            return null
        }    
            return logs
        }   
    
    async create(log: Log) {
        this.items.push(log)

        return log
    }
    
    async save(log: Log) {
        const itemIndex = this.items.findIndex((item) => item.id === log.id)
    
        this.items[itemIndex] = log
     }
}