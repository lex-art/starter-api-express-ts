import { Request, Response , NextFunction } from 'express'
import { CheckUser } from '../../interfaces/user'
import { validateJwt } from '../helper/jwt'

function validateUser(req: Request, res: Response, next: NextFunction):  Response | void {
  const token = req.headers.authorization
  const { error, message, user } =  validateJwt(token) as CheckUser  
  if (error) return res.status(401).json({
    error,
    message
  })
  else {
    req.user = user
    next()
  }
}

export {
  validateUser
}