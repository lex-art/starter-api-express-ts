import { Router } from 'express'
import AuthRoutes from './routes/auth.routes'
import ListRoutes from './routes/example.routes'
import { validateUser } from './middlewares/validateUser'

const api = Router()

api.get('/', (_, res) => {
  const environment = process.env.NODE_ENV || 'development'
  let hostName = 'http://localhost:5000'
  if (environment === 'production')
  // TODO: add your hostname
    hostName = 'https://limitless-ravine-85932.herokuapp.com'
  // TODO: add yours endpoints list
  res.json({
    message: 'Welcome API-TEST',
    auth: `${hostName}/api/v1/auth/login`,
  })
})


api.use('/auth', AuthRoutes)
api.use('/lists', validateUser, ListRoutes)

export default api