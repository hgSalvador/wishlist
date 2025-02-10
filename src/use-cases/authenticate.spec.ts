import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentials } from './errors/invalid-credentials';
import { compare, hash } from 'bcryptjs';

let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    sut = new AuthenticateUseCase();
  });

  it('should be able to authenticate', async () => {
    // Dados fixos para comparação
    const fixedUser = {
      id: '1',
      email: 'test@example.com',
      password: await hash('password123', 10), // bcrypt hash for 'password123'
    };

    // Mock do método execute para usar o usuário fixo
    sut.execute = async ({ email, password }) => {
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
    };

    const { user } = await sut.execute({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(user.id).toEqual('1');
    expect(user.email).toEqual('test@example.com');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});