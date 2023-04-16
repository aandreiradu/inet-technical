import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LogInUserArgs, RegisterUserArgs, TAuthUserReturn } from './types';
import { Prisma } from '@prisma/client';

interface IAuthService {
  registerUser(args: RegisterUserArgs): Promise<{ userId: string }>;
  authUser(args: LogInUserArgs): Promise<TAuthUserReturn>;
  getSessionByToken(token: string): Promise<{ sessionId: string }>;
  logoutUser(refreshToken: string): Promise<void>;
}

export const AuthService: IAuthService = {
  registerUser: async (args: RegisterUserArgs) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: args.username,
            },
            {
              email: args.email,
            },
          ],
        },
      });

      if (existingUser) {
        throw new Error('Email or username already in use');
      }

      const hashPw = await bcrypt.hash(args.password, 10);
      const { id } = await prisma.user.create({
        data: {
          email: args.email,
          fullName: args.fullName,
          password: hashPw,
          username: args.username,
        },
        select: {
          id: true,
        },
      });

      return {
        userId: id,
      };
    } catch (error) {
      console.log('ERRROR registerUser service', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
        throw new Error('Something went wrong, please try again later!');
      }

      if (error instanceof Error) {
        const { message } = error;
        throw new Error(message);
      }

      throw new Error('Something went wrong. Please try again later');
    }
  },
  authUser: async (args: LogInUserArgs) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: args.username,
        },
        select: {
          fullName: true,
          username: true,
          password: true,
          email: true,
          id: true,
        },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      /* Compared provided password to the hased one from db */
      const hasedPw = await bcrypt.compare(args.password, user.password);

      if (!hasedPw) {
        throw new Error('Invalid email or password');
      }

      /* Generate access & refresh tokens */
      const accessToken = jwt.sign(
        {
          username: user.username,
          fullName: user.fullName,
        },
        process.env.AUCHAN_LOGIN_ACCESS_SECRET!,
        { expiresIn: '15m' },
      );

      console.log('accessToken generated', accessToken);

      const refreshToken = jwt.sign(
        {
          username: user.username,
          fullName: user.fullName,
        },
        process.env.AUCHAN_LOGIN_REFRESH_SECRET!,
        { expiresIn: '1d' },
      );

      console.log('refreshToken generated', refreshToken);

      const dateNow = new Date();
      const expiresAt = new Date(
        dateNow.setSeconds(dateNow.getSeconds() + Number(process.env.AUCHAN_LOGIN_REFRESH_EXPIRATION_PARAM)),
      ).toISOString();

      /* Create session */
      await prisma.session.create({
        data: {
          expiresAt: expiresAt,
          refreshToken: refreshToken,
          createdAt: new Date().toISOString(),
          userId: user.id,
        },
      });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      };
    } catch (error) {
      console.log('ERRROR authUser service', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
        throw new Error('Something went wrong, please try again later!');
      }

      if (error instanceof Error) {
        console.log('instace of error', error);
        const { message } = error;
        throw new Error(message);
      }

      throw new Error('Something went wrong. Please try again later');
    }
  },

  getSessionByToken: async (token: string) => {
    try {
      const session = await prisma.session.findFirst({
        where: {
          refreshToken: token,
        },
        select: {
          id: true,
        },
      });

      if (!session) {
        console.log('session not found', session);
        throw new Error('Invalid session');
      }

      return {
        sessionId: session.id,
      };
    } catch (error) {
      console.log('ERRROR getSessionByToken service', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
        throw new Error('Something went wrong, please try again later!');
      }

      if (error instanceof Error) {
        console.log('instace of error', error);
        const { message } = error;
        throw new Error(message);
      }

      throw new Error('Something went wrong. Please try again later');
    }
  },

  logoutUser: async (refreshToken: string) => {
    try {
      const { sessionId } = await AuthService.getSessionByToken(refreshToken);

      if (sessionId) {
        await prisma.session.delete({
          where: {
            id: sessionId,
          },
        });
      }
    } catch (error) {
      console.log('ERRROR logoutUser service', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
        throw new Error('Something went wrong, please try again later!');
      }

      if (error instanceof Error) {
        console.log('instace of error', error);
        const { message } = error;
        throw new Error(message);
      }

      throw new Error('Something went wrong. Please try again later');
    }
  },
};
