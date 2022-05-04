class ResourceConflictError extends Error {
    constructor (message) {
        super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    
    this.status = 409 // conflict
    }

    statusCode() {
        return this.status
    }
}

module.exports = ResourceConflictError

// 422 Unprocessable Entity: server understands the content type of the request entity
// 200 Ok: Gmail, Facebook, Amazon, Twitter return 200 for user already exists

// 409 The request could not be completed due to a conflict with the current
// state of the resource.  This code is only allowed in situations where
// it is expected that the user might be able to resolve the conflict
// and resubmit the request.