import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    statusCode?: number;
}

export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? "Internal Server Error";

    console.error(`[${new Date().toISOString()}] ${statusCode}-${message}`);

    if (err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        error: message,
        statusCode
    })
}

// Wraps async route handlers so you don't need try/catch in every route
export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}