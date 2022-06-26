import { createSlice } from '@reduxjs/toolkit'
import { Forms } from '../../types/user-form'
import { InfoType } from '../../types/info-types'

export enum Window {
  OPEN_NONE = 'OPEN_NONE',
  OPEN_SIGN_IN_CHOICE = 'OPEN_LOGIN_CHOICE',
  OPEN_SIGN_IN = 'OPEN_SIGN_IN',
  OPEN_SIGNUP = 'OPEN_SIGNUP',
  OPEN_USER = 'OPEN_USER',
  OPEN_ANNOUNCEMENTS = 'OPEN_ANNOUNCEMENTS',
  OPEN_ANNOUNCEMENT_VIEW = 'OPEN_ANNOUNCEMENT_VIEW',
  OPEN_ADD_ANNOUNCEMENT = 'OPEN_ADD_ANNOUNCEMENT',
  OPEN_ACCOUNT_SETTINGS = 'OPEN_ACCOUNT_SETTINGS',
  OPEN_ACCOUNT_SETTINGS_CONFIRM = 'OPEN_ACCOUNT_SETTINGS_CONFIRM',
}

interface OpenWindowDataInfoType {
  openWindow: Window.OPEN_SIGN_IN | Window.OPEN_ACCOUNT_SETTINGS
  data: InfoType | undefined;
}

interface OpenWindowDataForms {
  openWindow: Window.OPEN_ACCOUNT_SETTINGS_CONFIRM
  data: Forms;
}

interface OpenWindowDataUndefined {
  openWindow: Window.OPEN_NONE | Window.OPEN_SIGN_IN_CHOICE | Window.OPEN_SIGNUP | Window.OPEN_USER | Window.OPEN_ANNOUNCEMENTS | Window.OPEN_ANNOUNCEMENT_VIEW | Window.OPEN_ADD_ANNOUNCEMENT;
  data: undefined;
}

interface OpenWindow {
  payload: OpenWindowDataInfoType | OpenWindowDataForms | OpenWindowDataUndefined;
}

interface AppStateType {
  openWindow: Window;
  data: InfoType | Forms | undefined;
}

const initialState: AppStateType = {
  openWindow: Window.OPEN_NONE,
  data: undefined,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openWindow: (state, action: OpenWindow) => {
      state.openWindow = action.payload.openWindow;
      state.data = action.payload.data;
    },
  }
});

export const {
  openWindow,
} = appSlice.actions;
