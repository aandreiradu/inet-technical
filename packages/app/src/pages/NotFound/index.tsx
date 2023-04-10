import { Link } from 'react-router-dom';
import Navigation from '../../components/Nav';

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-defaultBlack">
      <h1 className="text-white text-xl md:text-3xl "> PAGE NOT FOUND </h1>
      <p className="my-2 capitalize text-lg text-white">Useful links</p>
      <div className="flex space-x-4 text-white mt-3">
        <Link className="bg-white text-defaultBlack p-2 text-lg rounded-md" to={'/'}>
          Home
        </Link>
        <Link className="bg-white text-defaultBlack p-2 text-lg rounded-md" to={'/login'}>
          Login
        </Link>
        <Link className="bg-white text-defaultBlack p-2 text-lg rounded-md" to={'/register'}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
