import React, { FC, ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
  classes?: string;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, title, description, classes }) => {
  return (
    <section className={`p-4 md:p-0 w-full h-screen flex flex-col justify-center items-center bg-defaultBlack`}>
      <div
        className={`bg-defaultBlack text-white w-full md:max-w-md flex flex-col justify-center p-6 rounded-lg ${classes}
        `}
      >
        <h1
          className="relative w-fit px-3 mx-auto text-base text-center text-white md:text-lg uppercase  
                      after:absolute after:-bottom-1 after:left-0  after:h-[2px] after:bg-red-500
                      after:w-full after:animate-growingWidth"
        >
          {title}
        </h1>
        <p
          className="relative w-fit text-sm text-white md:text-lg my-5
                      after:absolute after:-bottom-1 after:left-0  after:h-[2px] after:bg-red-500
                      after:mx-auto after:hover:w-full after:ease-in
                      after:hover:animate-growingWidth
        "
        >
          {description}
        </p>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
