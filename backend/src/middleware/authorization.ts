import { NextFunction, Request, Response } from "express";

export default class Auth {
    private errorHandler(res: Response, message: string, statusCode: number) {
        return res.status(statusCode).json({ message });
    }
    handler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.headers;
            if (!token) return this.errorHandler(res, "Not Authenticated", 401);

            return next();
        } catch (err) {
            throw err;
        }
    };
}
