class BadRequestError extends Error {
    constructor (message) {
        super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    
    this.status = 400 // not found
    }

    statusCode() {
        return this.status
    }
}

module.exports = BadRequestError