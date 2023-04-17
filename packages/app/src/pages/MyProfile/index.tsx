import { useEffect, useState } from 'react';
import Navigation from '../../components/Nav';
import { useHttpRequest } from '../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectUserTasks, selectUserData } from '../../store/User/index.selectors';
import { setUserTasks } from '../../store/User/index.slice';
import { PulseLoader } from 'react-spinners';
import TaskItem from '../../components/TaskItem';
import { Warning } from 'phosphor-react';
import Notification from '../../components/UI/Notification';
import WelcomeBackHeader from '../../components/WelcomeBackHeader';

const MyProfile = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    icon: <></>,
  });
  const dispatch = useDispatch();
  const { fullName, email, username } = useSelector(selectUserData);
  const isLoggedIn = useSelector(selectAccessToken);
  const userTasks = useSelector(selectUserTasks);
  const { sendRequest, isLoading, error } = useHttpRequest();

  useEffect(() => {
    const getUserTasks = async () => {
      if (userTasks?.length === 0) {
        const response = await sendRequest({
          url: 'https://dummyjson.com/todos?limit=10',
          method: 'GET',
          withCredentials: false,
          isExternal: true,
        });

        // console.log('response', response);
        if (response) {
          const { data, status } = response;

          if (status === 200 && data?.todos) {
            const { todos } = data;
            dispatch(setUserTasks(todos));
          }
        }
      }
    };

    if (isLoggedIn) {
      getUserTasks();
    }
  }, []);

  /* Errors */
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
    <div className="h-screen bg-white text-defaultBlack flex flex-col">
      <Navigation />

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

      {isLoggedIn &&
        (isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <PulseLoader />
          </div>
        ) : (
          <div className="flex flex-col w-full mx-auto max-w-7xl px-2 py-2  sm:px-10 lg:px-8 lg:py-5">
            <WelcomeBackHeader />

            <div className="mt-4 w-full p-4 rounded-md bg-gray-200">
              <div className="my-4 w-full flex flex-col items-end justify-center ">
                <p
                  className="mb-2 relative w-fit px-3 text-base text-defaultBlack md:text-lg uppercase  
                          after:absolute after:bottom-0 after:left-0  after:h-[2px] after:bg-red-500
                          after:w-full after:animate-growingWidth"
                >
                  Account Info
                </p>
                <span className="text-base font-bold">Email: {email}</span>
                <span className="text-base font-bold">Username: {username}</span>
                <span className="text-base font-bold">Full Name: {fullName}</span>
              </div>

              <h2 className="text-xl uppercase font-bold">Your Tasks:</h2>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-4 mt-2 ">
                {userTasks?.length === 0 ? (
                  <p>No tasks registered</p>
                ) : (
                  userTasks?.map((task) => <TaskItem key={task.id} name={task.todo} id={task.id} status={task.completed} />)
                )}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyProfile;
