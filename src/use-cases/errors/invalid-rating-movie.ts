export class InvalidRatingMovie extends Error {
    constructor() {
        super('This rating should be between 1 and 5')
    }
}