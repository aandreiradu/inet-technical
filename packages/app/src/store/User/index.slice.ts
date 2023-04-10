import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserTask = {
  id: number;
  completed: boolean;
  todo: string;
}[];

export interface IUserState {
  username: string;
  accessToken: string;
  fullName: string;
  email: string;
  tasks: UserTask;
}

export const initialUserState: IUserState = {
  username: '',
  accessToken: '',
  fullName: '',
  email: '',
  tasks: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setAuthData: (state: IUserState, action: PayloadAction<IUserState>) => {
      const { payload } = action;

      state.accessToken = payload.accessToken;
      (state.email = payload.email), (state.fullName = payload.fullName), (state.username = payload.username);
    },

    setAccessToken: (state: IUserState, action: PayloadAction<{ accessToken: string }>) => {
      const { payload } = action;

      state.accessToken = payload.accessToken;
    },

    logOut: (state: IUserState, action: PayloadAction) => {
      state = initialUserState;
    },

    setUserTasks: (state: IUserState, action: PayloadAction<UserTask>) => {
      const { payload } = action;

      state.tasks = payload;
    },
  },
});

export const { setAccessToken, logOut, setAuthData, setUserTasks } = userSlice.actions;
export default userSlice.reducer;
