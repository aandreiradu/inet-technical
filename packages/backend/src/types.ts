export interface CustomError extends Error {
  status: number;
  data?: string[];
  error?: string[];
}

export interface IResponse<T = any> {
  message?: string;
  data?: T;
  error?: {
    message?: string;
    fieldErrors?: {
      [key: string]: string[];
    };
  };
}

export interface ErrorResponse {
  message: string;
  data?: string | string[];
  error?: string[];
}

export type CustomThrownError = {
  message: string;
  status: number;
  data?: string[];
};
