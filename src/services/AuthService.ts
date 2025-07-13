import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userRepository: UserRepository, private jwtSecret: string) {}

  async register(email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    return this.userRepository.create({ email, password: hashed });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ userId: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' });
  }
} 