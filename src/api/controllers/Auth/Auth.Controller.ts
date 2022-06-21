import { Request, Response } from "express";

function register(req: Request, res: Response): Response {
    const body = req.body;
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    return res.status(200).json({
        message: "Success",
    });
}

export default {
    register
}