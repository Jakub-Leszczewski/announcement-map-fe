import { createSlice } from '@reduxjs/toolkit'

export enum ActionType {
  OPEN_NONE = 'OPEN_NONE',
  OPEN_SIGN_IN_CHOICE = 'OPEN_LOGIN_CHOICE',
  OPEN_SIGN_IN = 'OPEN_SIGN_IN',
  OPEN_SIGNUP = 'OPEN_SIGNUP',
  OPEN_USER = 'OPEN_USER',
  OPEN_ANNOUNCEMENTS = 'OPEN_ANNOUNCEMENTS',
  OPEN_ANNOUNCEMENT_VIEW = 'OPEN_ANNOUNCEMENT_VIEW',
  OPEN_ADD_ANNOUNCEMENT = 'OPEN_ADD_ANNOUNCEMENT',
  OPEN_ACCOUNT_SETTINGS = 'OPEN_ACCOUNT_SETTINGS'
}

interface AppStateType {
  openWindow: ActionType;
  payload: string | undefined;
}

interface OpenNone {
  payload: undefined
}

interface OpenSignInChoice {
  payload: undefined
}

interface OpenSignIn {
  payload: undefined
}

interface OpenSignUp {
  payload: undefined
}

interface OpenUser {
  payload: undefined
}

interface OpenAnnouncements {
  payload: undefined
}

interface OpenAnnouncementView {
  payload: string
}

interface OpenAddAnnouncement {
  payload: string
}

interface OpenAccountSettings {
  payload: undefined
}

type Action = OpenNone | OpenSignInChoice | OpenSignIn | OpenSignUp | OpenUser | OpenAnnouncements
  | OpenAnnouncementView | OpenAddAnnouncement | OpenAccountSettings;

const initialState: AppStateType = {
  openWindow: ActionType.OPEN_NONE,
  payload: undefined,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openNone: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_NONE;
      state.payload = action.payload;
    },

    openSignInChoice: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_SIGN_IN_CHOICE;
      state.payload = action.payload;
    },

    openSignIn: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_SIGN_IN;
      state.payload = action.payload;
    },

    openSignup: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_SIGNUP;
      state.payload = action.payload;
    },

    openUser: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_USER;
      state.payload = action.payload;
    },

    openAnnouncements: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_ANNOUNCEMENTS;
      state.payload = action.payload;
    },

    openAnnouncementView: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_ANNOUNCEMENT_VIEW;
      state.payload = action.payload;
    },

    openAddAnnouncement: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_ADD_ANNOUNCEMENT;
      state.payload = action.payload;
    },

    openAccountSettings: (state, action: Action) => {
      state.openWindow = ActionType.OPEN_ACCOUNT_SETTINGS;
      state.payload = action.payload;
    },
  }
});

export const {
  openNone,
  openSignInChoice,
  openSignIn,
  openSignup,
  openUser,
  openAnnouncements,
  openAnnouncementView,
  openAddAnnouncement,
  openAccountSettings
} = appSlice.actions;
