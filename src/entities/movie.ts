import { Entity } from "./entity";
import { UniqueEntityID } from "./unique.entity-id";


export interface MovieProps {
    recipientId: UniqueEntityID
    title: string
    synopsis: string
    genre: string
    releaseDate: string

}

export class Movie extends Entity<MovieProps> {
    get recipientId() {
        return this.recipientId
    }

    get title() {
        return this.title
    }

    get synopsis() {
        return this.synopsis
    }

    get genre() {
        return this.genre
    }

    get releaseDate() {
        return this.releaseDate
    }
}