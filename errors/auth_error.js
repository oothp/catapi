class AuthError extends Error {
    constructor (message) {
        super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    
    this.status = 401 // unauthorized.
    }
}

module.exports = AuthError