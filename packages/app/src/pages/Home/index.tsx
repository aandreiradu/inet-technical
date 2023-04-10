import React from 'react';
import Navigation from '../../components/Nav';
import UserData from '../UserData';

const Home = () => {
  return (
    <div className="h-screen bg-white text-defaultBlack flex flex-col">
      <Navigation />
      <UserData />
    </div>
  );
};

export default Home;
