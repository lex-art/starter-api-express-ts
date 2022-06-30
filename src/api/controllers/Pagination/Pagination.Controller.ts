import { Request, Response } from 'express'


function exampleList(_: Request, res: Response): Response {
  return res.status(200).json({
    message: 'Success',
  })
}

export default {
  exampleList
}
