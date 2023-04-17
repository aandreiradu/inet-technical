import { Request, Response, NextFunction } from 'express';
import { LogInUserArgs, RegisterUserArgs, loginUserSchema, registerUserSchema } from '../../services/auth/types';
import { IResponse } from '../../types';
import { AuthService } from '../../services/auth/auth.service';

export const registerController = async (
  req: Request<{}, {}, RegisterUserArgs>,
  res: Response<IResponse>,
  next: NextFunction,
) => {
  try {
    const schemaResult = registerUserSchema.safeParse(req.body);

    if (!schemaResult.success) {
      const errors = schemaResult.error.flatten();
      // console.log('errors', errors);

      const errorObj = {
        message: 'Error validation',
        error: {
          fieldErrors: errors.fieldErrors,
        },
        status: 422,
      };

      return next(errorObj);
    }

    /* Call service to create user */
    const { userId } = await AuthService.registerUser(req.body);

    if (userId) {
      console.log('Account created successfully', userId);
      return res.status(201).send({
        message: 'Account created successfully',
      });
    }
  } catch (error) {
    console.log('ERRROR registerController controller', error);
    if (error instanceof Error) {
      const { message } = error;

      return res.status(500).send({
        message: message,
      });
    }

    return res.status(500).send({
      message: 'Something went wrong. Please try again later',
    });
  }
};

export const authController = async (req: Request<{}, {}, LogInUserArgs>, res: Response<IResponse>, next: NextFunction) => {
  try {
    const schemaCheck = loginUserSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      const errors = schemaCheck.error.flatten();
      const errorObj = {
        message: 'Error validation',
        error: {
          fieldErrors: errors.fieldErrors,
        },
      };

      return next(errorObj);
    }

    const { accessToken, fullName, refreshToken, username, email } = await AuthService.authUser({
      username: req.body.username,
      password: req.body.password,
    });

    /* Attach refresh token as HTTP only cookie */
    res.cookie('AUCHAN_REFRESH_TOKEN', refreshToken, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      data: {
        accessToken,
        fullName,
        username,
        email,
      },
    });
  } catch (error) {
    console.log('ERRROR authController controller', error);
    if (error instanceof Error) {
      const { message } = error;

      return res.status(500).send({
        message: message,
      });
    }

    return res.status(500).send({
      message: 'Something went wrong. Please try again later',
    });
  }
};

export const logoutController = async (req: Request, res: Response<IResponse>, next: NextFunction) => {
  const { AUCHAN_REFRESH_TOKEN } = req.cookies;

  if (!AUCHAN_REFRESH_TOKEN) {
    return res.status(204);
  }

  try {
    await AuthService.logoutUser(AUCHAN_REFRESH_TOKEN);

    // clear cookie
    res.clearCookie('AUCHAN_REFRESH_TOKEN');

    return res.status(200).send({
      data: {
        message: 'Logout completed',
      },
    });
  } catch (error) {
    console.log('ERRROR logoutController controller', error);
    if (error instanceof Error) {
      const { message } = error;

      return res.status(500).send({
        message: message,
      });
    }

    return res.status(500).send({
      message: 'Something went wrong. Please try again later',
    });
  }
};
