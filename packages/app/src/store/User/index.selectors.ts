import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../store';

const rootUserState = (state: IState) => state.user;

export const selectAccessToken = createSelector(rootUserState, (state) => state.accessToken);

export const selectUserData = createSelector(rootUserState, (state) => ({
  username: state.username,
  fullName: state.fullName,
  email: state.email,
}));

export const selectUserTasks = createSelector(rootUserState, (state) => state.tasks);
