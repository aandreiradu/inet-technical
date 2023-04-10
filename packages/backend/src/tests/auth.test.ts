import { prismaMock } from '../singleton';
import { AuthService } from '../services/auth/auth.service';

jest.mock('jsonwebtoken');

describe('Auth', () => {
  describe('POST /register ', () => {
    it('should create a new user', async () => {
      const user = {
        id: 'db03bee2-55d5-4511-afe0-be85ca524c91',
        username: 'andrei.radu',
        password: 'testing',
        fullName: 'Andrei Radu',
        email: 'raduandrei697@gmail.com',
      };

      prismaMock.user.create.mockResolvedValue(user);

      const createdUser = await AuthService.registerUser(user);
      expect(createdUser).toEqual({ userId: user.id });
    });

    it('should throw an error if the username or email exists', async () => {
      const user = {
        id: 'db03bee2-55d5-4511-afe0-be85ca524c91',
        username: 'andrei.radu',
        password: 'testing',
        fullName: 'Andrei Radu',
        email: 'raduandrei697@gmail.com',
      };
      prismaMock.user.create.mockImplementation();
      prismaMock.user.findUniqueOrThrow.mockImplementation(() => {
        throw new Error('Email or username already in use');
      });

      expect(await AuthService.registerUser(user)).toThrow('Email or username already in use');
    });
  });

  describe('POST /login', () => {
    it('should throw a new erorr if the credentials are not valid', async () => {
      const user = {
        username: '',
        password: '',
      };
      expect(await AuthService.authUser(user)).toThrow('Invalid email or password');
    });

    it('should return accessToken,fullName,username and email after log in', async () => {
      const user = {
        username: 'andrei.radu',
        password: 'andrei',
      };

      const authUser = await AuthService.authUser(user);
      expect(authUser).toEqual({
        accessToken: '',
        fullName: '',
        username: '',
        email: '',
      });
    });
  });
});
