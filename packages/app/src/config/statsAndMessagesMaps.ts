type ExistingBackendMessage = 'accountCreatedSuccessfully' | 'userAuthenticatedSuccessfully';

type IStatsAndMessages = {
  [K in ExistingBackendMessage]?: {
    message: string;
    status?: number;
    frontendMessage?: string;
  };
};

const statsAndMaps: IStatsAndMessages = {
  accountCreatedSuccessfully: {
    message: 'Account created successfully',
    frontendMessage: 'Account created successfully',
    status: 201,
  },

  userAuthenticatedSuccessfully: {
    status: 200,
    message: '',
  },
};

export default statsAndMaps;
