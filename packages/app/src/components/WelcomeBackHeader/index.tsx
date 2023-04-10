import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/User/index.selectors';
import { FC } from 'react';

export interface IWelcomeBackHeader {
  classes?: string;
}

const WelcomeBackHeader: FC<IWelcomeBackHeader> = ({ classes }) => {
  const { fullName } = useSelector(selectUserData);
  return (
    <div className={`${classes} mt-2 flex flex-col w-full items-end justify-center`}>
      <span className="text-gray-500 text-sm">Welcome back</span>
      <p className="font-bold text-xl italic">{fullName || 'Guest'}</p>
    </div>
  );
};

export default WelcomeBackHeader;
