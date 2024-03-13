export class BadRequest extends Error {
    status = 400
    name = 'BadRequest'
    expose = false
}

export class Unauthorized extends Error {
    status = 401
    name = 'Unauthorized'
    expose = false
    stack = undefined
}

export class Forbidden extends Error {
    status = 403
    name = 'Forbidden'
    expose = false
}

export class NotFound extends Error {
    status = 404
    name = 'NotFound'
    expose = false
}

export class Conflict extends Error {
    status = 409
    name = 'Conflict'
    expose = false
}

export class InternalServerError extends Error {
    status = 500
    name = 'InternalServerError'
    expose = false
}

export class UsersNotFound extends NotFound {
    name = 'UsersNotFound'
    constructor() {
        super('Users not found')
    }
}

export class PersonNotFound extends NotFound {
    name = 'PersonNotFound'
    constructor() {
        super('Person not found')
    }
}

export class ProfileNotFound extends NotFound {
    name = 'ProfileNotFound'
    constructor() {
        super('Profile not found')
    }
}

export class UserProfilesNotFound extends NotFound {
    name = 'UserProfilesNotFound'
    constructor() {
        super('Profiles from user not found')
    }
}

export class UserAlreadyExists extends Conflict {
    name = 'UserAlreadyExists'
    constructor() {
        super('User already exists')
    }
}

export class InvalidUserPassword extends BadRequest {
    name = 'InvalidUserPassword'
    constructor(errorMessage: string) {
        super(`Invalid User Password: ${errorMessage}`)
    }
}

export class InvalidToken extends Forbidden {
    name = 'InvalidToken'
    constructor() {
        super('Invalid Token')
    }
}

export class UserPermissionDenied extends Forbidden {
    name = 'UserPermissionDenied'
    constructor() {
        super('User permission denied')
    }
}

export class UserNotLoggedIn extends Unauthorized {
    name = 'UserNotLoggedIn'
    constructor() {
        super('User Not Logged In')
    }
}