// server/src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validateBody(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = (result.error as ZodError).flatten();
            return res.status(400).json({
                error: 'Validation failed',
                details: errors,
            });
        }
        req.body = result.data; // replace with coerced/defaulted values
        next();
    };
}