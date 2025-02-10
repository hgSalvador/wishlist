import { User } from "../users-repository";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async findUserByEmail(email: string) {
        const movie = this.items.find((item) => item.email === email)

        if (!movie) {
            return null
        }

        return movie
    }

    async findUserById(id: string) {
        const movie = this.items.find((item) => item.id.toString() === id)

        if (!movie) {
            return null
        }

        return movie
    }

    async save(user: User){
        const itemIndex = this.items.findIndex((item) => item.id === user.id)

        this.items[itemIndex] = user
    }


    async create(user: User){
        this.items.push(user)
    }
}