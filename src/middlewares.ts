import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _: NextFunction,
) {
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map(
      (issue: ZodIssue) => `${issue.message} at ${issue.path.join('.')}`,
    );
    res
      .status(400)
      .json({ success: false, error: 'Invalid data', details: errorMessages });
  } else {
    console.error(err.stack);
    res
      .status(500)
      .setHeader('Content-Type', 'application/json')
      .send(err.message);
  }
}
