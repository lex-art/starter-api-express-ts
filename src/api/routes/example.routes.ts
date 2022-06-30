import { Router } from 'express'
import ExampleController from '../controllers/Pagination/Pagination.Controller'

const lists: Router = Router()

lists.get('/example', ExampleController.exampleList)


export default lists