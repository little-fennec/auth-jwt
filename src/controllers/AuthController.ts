import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const user = await this.authService.register(email, password);
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const token = await this.authService.login(email, password);
      return res.status(200).json({ token });
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  };
} 