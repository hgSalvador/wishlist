export class InvalidStateTransitionError extends Error {
    constructor() {
        super('Invalid credentials')
    }
}