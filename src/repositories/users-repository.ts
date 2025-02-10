export interface User {
    id: string
    name: string
    email: string
    password: string
}

export interface UsersRepository {
    findUserById(id: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    save(user: User): Promise<void>
    create(user: User): Promise<void>
}