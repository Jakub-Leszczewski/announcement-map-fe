import { createSlice } from '@reduxjs/toolkit';

interface UserStateType {
  jwt: string | null;
}

const initialState: UserStateType = {
  jwt: null,
}

interface SetJwt {
  payload: string | null;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setJwt: (state, action: SetJwt) => {
      state.jwt = action.payload;
    },
  }
});

export const {
  setJwt,
} = userSlice.actions;
