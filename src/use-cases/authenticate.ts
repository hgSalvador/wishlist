import { InvalidCredentials } from './errors/invalid-credentials';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: {
    id: string;
    email: string;
  };
}

export class AuthenticateUseCase {
  constructor() {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // Dados fixos para comparação
    const fixedUser = {
      id: '1',
      email: 'test@example.com',
      password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fjs1K1E6QJ2l5z5J1U1eW', // bcrypt hash for 'password123'
    };

    if (email !== fixedUser.email) {
      throw new InvalidCredentials();
    }

    const doesPasswordMatches = await compare(password, fixedUser.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentials();
    }

    return {
      user: {
        id: fixedUser.id,
        email: fixedUser.email,
      },
    };
  }
}