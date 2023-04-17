import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './utils/prisma';
import { Prisma } from '@prisma/client';
import { CustomError, ErrorResponse, IResponse } from './types';
import authRoutes from './routes/auth/auth.route';

const app = express();

// Cookie parser middleware
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true }));

/* Auth Routes */
app.use(authRoutes);

app.use((err: CustomError, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  // console.log('error custom middleware', err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(500).send({
      message: 'Something went wrong. Please try again later',
    });
  }

  const { message, status, data, error } = err;
  const statusCode = status ?? 500;

  return res.status(statusCode).send({
    message,
    data: data,
    error: error,
  });
});

app.use('*', (req: Request, res: Response<IResponse>, next: NextFunction) => {
  console.log('NOT FOUND?');

  return res.status(400).send({
    message: 'Route not found',
    error: {
      message: 'Route not found',
    },
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log('server listening on port', process.env.PORT || 4000);
});

export default app;
