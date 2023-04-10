import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserData } from '../../store/User/index.selectors';
import WelcomeBackHeader from '../../components/WelcomeBackHeader';

const UserData = () => {
  const isLoggedIn = useSelector(selectAccessToken);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col w-full mx-auto max-w-7xl px-2 py-2  sm:px-10 lg:px-8 lg:py-5">
          <WelcomeBackHeader classes="!items-start" />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserData;
