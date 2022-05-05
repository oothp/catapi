class ResourceNotFoundError extends Error {
    constructor (message) {
        super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    
    this.status = 404 // not found
    }
}

module.exports = ResourceNotFoundError