import { createSlice } from '@reduxjs/toolkit';

interface UserStateType {
  jwt: string;
}

interface SetJwt {
  payload: string
}

type Action = SetJwt;

const initialState: UserStateType = {
  jwt: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setJwt: (state, action: Action) => {
      state.jwt = action.payload;
    }
  }
});

export const {
  setJwt,
} = userSlice.actions;
