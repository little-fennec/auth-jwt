import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll();
    return res.status(200).json(users);
  };
} 