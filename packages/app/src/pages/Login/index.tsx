import AuthLayout from '../../components/Layouts/Auth';
import { Input } from '../../components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginSchema, loginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHttpRequest } from '../../hooks/useHttp';
import { PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { Warning } from 'phosphor-react';
import Notification from '../../components/UI/Notification';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthData } from '../../store/User/index.slice';
import { useDispatch } from 'react-redux';

const title = 'Login into your account';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    icon: <></>,
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });
  const { error, isLoading, sendRequest } = useHttpRequest();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const response = await sendRequest({
      method: 'POST',
      url: '/login',
      withCredentials: true,
      body: {
        username: data.username,
        password: data.password,
      },
    });

    if (response) {
      const { accessToken, fullName, username, email } = response.data;

      if (accessToken) {
        dispatch(setAuthData({ accessToken, email, fullName, username, tasks: [] }));
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (error) {
      const { message, fieldErrors } = error;

      if (message === 'Error validation') {
        if (fieldErrors && Object.keys(fieldErrors).length > 0) {
          for (let idx in fieldErrors) {
            setError(String(idx) as any, { message: String(fieldErrors[idx]) });
          }
        }
      } else {
        setNotification({
          show: true,
          message: error.message || 'Something went wrong. Please try again later',
          icon: <Warning className="w-14 h-8 text-red-700" />,
        });
      }
    }
  }, [error]);

  return (
    <AuthLayout title={title} classes="max-w-md border border-red-500">
      {/* Notification */}
      {notification.show && (
        <Notification
          hasCloseButton={false}
          dismissAfterXMs={error ? 10000 : 5500}
          message={notification.message}
          show={notification.show}
          onClose={() =>
            setNotification({
              show: false,
              message: '',
              icon: <></>,
            })
          }
          icon={notification.icon}
        />
      )}

      <form id="login" className="flex flex-col  space-y-10 w-full mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full">
          <Input
            {...register('username')}
            error={errors?.username?.message}
            className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-500 peer"
            type="text"
            name="username"
            // required
            label="Username"
          />
        </div>
        <div className="relative z-0 w-full">
          <Input
            {...register('password')}
            error={errors?.password?.message}
            className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-500 peer"
            type="password"
            name="password"
            required
            label="Password"
          />
        </div>

        <p className="mt-10 text-basic">
          Don't have an account?{' '}
          <Link className="text-red-500" to={'/register'}>
            Sign Up
          </Link>
        </p>

        <button
          disabled={isLoading}
          form="login"
          className="disabled:cursor-not-allowed disabled:pointer-events-none w-full bg-white text-defaultBlack mt-7 p-3 rounded-md text-lg uppercase hover:bg-red-500 hover:text-white focus:bg-bg-red-500 focus:text-white focus:outline-none transition-all duration-100 ease-in"
        >
          {!isLoading ? 'Login' : <PulseLoader color="#1f1f1f" />}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
