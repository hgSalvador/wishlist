import { Optional } from "../types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./unique.entity-id";


export interface MovieProps {
    userId: UniqueEntityID
    tmdbId: UniqueEntityID
    title: string
    synopsis: string
    releaseDate: string
    genre: string
    state: string
    rating: number
    recommended: boolean
    createdAt: Date
    updatedAt?: Date
}

export class Movie extends Entity<MovieProps> {
    get userId() {
        return this.userId
    }

    get tmdbId() {
        return this.props.tmdbId
    }

    get title() {
        return this.props.title
    }

    get synopsis() {
        return this.props.synopsis
    }

    get releaseDate() {
        return this.props.releaseDate
    }

    get genre() {
        return this.props.genre
    }

    get state() {
        return this.props.state
    }

    get rating() {
        return this.props.rating
    }

    get recommended() {
        return this.props.recommended
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set title(title: string) {
        this.props.title = title
        this.touch()
    }

    set synopsis(synopsis: string) {
        this.props.synopsis = synopsis
        this.touch()
    }

    set releaseDate(releaseDate: string) {
        this.props.releaseDate = releaseDate
        this.touch()
    }

    set genre(genre: string) {
        this.props.genre = genre
        this.touch()
    }

    set state(state: string) {
        this.props.state = state
        this.touch()
    }

    set rating(rating: number) {
        this.props.rating = rating
        this.touch()
    }

    set recommended(recommended: boolean) {
        this.props.recommended = recommended
        this.touch()
    }

    static create(
        props: Optional<MovieProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const movie = new Movie(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        )

        return movie
    }

}