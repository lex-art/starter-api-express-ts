import { Router } from 'express'
import AuthController from '../controllers/Auth/Auth.Controller'

const auth: Router = Router()

auth.post('/register', AuthController.register)
auth.post('/login', AuthController.login)
auth.get('/refresh-token', AuthController.refreshToken)
auth.put("/forgot-password", AuthController.forgotPassword)
auth.put("/reset-password", AuthController.createNewPassword)

export default auth