import { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useReducer, Reducer } from 'react';
import axios from '../api/axios';

interface IRequestConfig {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH';
  withCredentials?: boolean;
  body?: Record<string, string>;
  headers?: Record<string, string>;
  isExternal?: boolean;
}

interface IState {
  isLoading: boolean;
  data: string[] | [];
  error: null | {
    message?: string;
    fieldErrors?: {
      [key: string]: string[];
    };
    data?: string[];
    status?: number;
  };
}

interface CustomAxiosResponse extends AxiosResponse {
  message?: string;
  status: number;
}

enum ACTION_TYPES {
  SEND,
  RESPONSE,
  ERROR,
}

interface IAction {
  type: ACTION_TYPES;
  payload?:
    | string[]
    | {
        message: string;
        status?: number;
        error?: string[] | string;
      };
}

const defaultState: IState = {
  data: [],
  error: null,
  isLoading: false,
};

const mainAPIReducer = (state: IState, action: IAction): any => {
  const { payload, type } = action;

  switch (type) {
    case ACTION_TYPES.SEND:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_TYPES.RESPONSE:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case ACTION_TYPES.ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
  }
};

export const useHttpRequest = () => {
  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(mainAPIReducer, defaultState);

  const sendRequest = useCallback(async (config: IRequestConfig): Promise<CustomAxiosResponse | void> => {
    try {
      dispatch({ type: ACTION_TYPES.SEND });

      const response = await axios({
        method: config.method || 'GET',
        url: config.url,
        data: config.body,
        headers: config.headers,
        withCredentials: config.withCredentials,
      });

      response.data.status = response.status;

      /* Just for loading states, remove after testing  */
      // setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.RESPONSE,
        payload: response.data,
      });
      // }, 5000);

      if (config?.isExternal) {
        return response;
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERROR REDUCER INSTANCE OF ERROR', error);
        return dispatch({
          type: ACTION_TYPES.ERROR,
          payload: {
            message: error?.response?.data?.message || error?.response?.data,
            ...error?.response?.data?.error,
          },
        });
      }

      const customError: any = error;
      console.log('error useHttp', error);
      console.log('ERROR REDUCER CUSTOM ERROR', error);
      dispatch({
        type: ACTION_TYPES.ERROR,
        payload: {
          status: customError?.response.status || 500,
          message: customError?.response.data.message,
          ...customError?.response.data.error,
        },
      });
    }
  }, []);

  return {
    sendRequest,
    isLoading: state.isLoading,
    error: state.error,
  };
};
