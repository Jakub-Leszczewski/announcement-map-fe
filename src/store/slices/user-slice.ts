import { createSlice } from '@reduxjs/toolkit';
import { UserEntityRes } from 'types';

interface UserStateType {
  jwt: string | null;
  user: null | UserEntityRes;
}

const initialState: UserStateType = {
  jwt: null,
  user: null,
}

interface SetJwt {
  payload: string | null;
}

interface SetUser {
  payload: null | UserEntityRes;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setJwt: (state, action: SetJwt) => {
      state.jwt = action.payload;
    },

    setUser: (state, action: SetUser) => {
      state.user = action.payload;
    }
  }
});

export const {
  setJwt,
  setUser,
} = userSlice.actions;
