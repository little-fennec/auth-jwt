import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password, ...rest }) => rest);
  }
} 