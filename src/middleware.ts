import { Response, Request, NextFunction } from "express";

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404)
    const error = new Error("Not Found - " + req.originalUrl)
    next(error)
}

export function errorHandler(err: Error, _: Request, res: Response,) {
    res.status(res.statusCode || 500)
    res.json({
        errors: {
            message: err.message,
            error: err,
        },
    })
}
