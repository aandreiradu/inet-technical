import React, { ComponentProps, FC, useCallback, useEffect, useState } from 'react';
import { useHttpRequest } from '../../hooks/useHttp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/User/index.slice';
import { PulseLoader } from 'react-spinners';
import Notification from '../UI/Notification';
import { Warning } from 'phosphor-react';

interface ILogoutLink extends ComponentProps<'button'> {}

const LogoutLink: FC<ILogoutLink> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpRequest();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    icon: <></>,
  });

  const handleLogout = useCallback(async () => {
    const responseLogout = await sendRequest({
      method: 'GET',
      url: '/logout',
      withCredentials: true,
    });

    if (responseLogout?.data) {
      const { status } = responseLogout;
      const { message } = responseLogout.data;

      if ((message === 'Logout completed' && status === 200) || status === 204) {
        dispatch(logOut());
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      setNotification({
        show: true,
        message: error.message || 'Something went wrong. Please try again later',
        icon: <Warning className="w-14 h-8 text-red-700" />,
      });
    }
  }, [error]);

  return (
    <button {...props} onClick={handleLogout}>
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

      {isLoading ? <PulseLoader /> : props.children}
    </button>
  );
};

export default LogoutLink;
