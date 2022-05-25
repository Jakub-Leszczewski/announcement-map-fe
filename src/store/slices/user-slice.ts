import { createSlice } from '@reduxjs/toolkit';

interface UserStateType {
  jwt: string | null;
}

interface SetJwt {
  payload: string | null;
}

type Action = SetJwt;

const initialState: UserStateType = {
  jwt: null,
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
