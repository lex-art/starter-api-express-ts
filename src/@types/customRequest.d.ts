import { UserToken } from './../interfaces/user'

declare global {
    namespace Express {
        interface Request {
            user?: UserToken
        }
    }
    export interface Response {
        user?: UserToken
    }
}



