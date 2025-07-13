import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(jwtSecret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      (req as any).user = payload;
      next();
    } catch {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
} 