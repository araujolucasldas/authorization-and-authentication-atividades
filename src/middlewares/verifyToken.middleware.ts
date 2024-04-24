import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

export class VerifyToken{
    static execute(req: Request, res: Response, next: NextFunction){
        const authorization = req.headers.authorization
        
        if(!authorization){
            throw new AppError("Token is required", 401)
        }

        const token = authorization?.replace("Bearer ", "")

        const secret = process.env.JWT_SECRET as string

        jwt.verify(token, secret)

        res.locals.decode = jwt.decode(token)

        next()
    }
}