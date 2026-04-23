import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { AuthRequest } from "../types";



export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['auth-cookie']

    console.log("Auth Middleware - Received token:", token);

    if(!token){
        return res.status(401).json({
            message :"Unauthorized token"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string};
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}
