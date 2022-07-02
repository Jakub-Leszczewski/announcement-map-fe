import { createSlice } from '@reduxjs/toolkit'
import { UserFormUpdate } from '../../types/user-form'
import { InfoType } from '../../types/info-types'
import { ChangeCategoryId, ChangeSearch, Window } from '../types/app-slice-types'
import {
  AppStateType,
  OpenAccountSettings,
  OpenAddAnnouncement,
  OpenAnnouncement,
  OpenAnnouncements,
  OpenNone,
  OpenSignIn,
  OpenSignInChoice,
  OpenSignup,
  OpenUser,
} from '../types/app-slice-types'

const initialInfoType: InfoType = {
  error: null,
  message: null,
}

const initialUserFormUpdate: UserFormUpdate = {
  firstName: '',
  lastName: '',
  email: '',
  newPassword: '',
  repeatNewPassword: '',
  password: '',
}

const initialState: AppStateType = {
  openWindow: Window.OPEN_NONE,
  accountSettingsPayload: initialInfoType,
  signInPayload: initialInfoType,
  announcementsPayload: initialInfoType,
  announcementPayload: '',
  search: '',
  categoryId: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openNone: (state, action: OpenNone) => {
      state.openWindow = Window.OPEN_NONE;
    },

    openSignInChoice: (state, action: OpenSignInChoice) => {
      state.openWindow = Window.OPEN_SIGN_IN_CHOICE;
    },

    openSignup: (state, action: OpenSignup) => {
      state.openWindow = Window.OPEN_SIGNUP;
    },

    openSignIn: (state, action: OpenSignIn) => {
      state.openWindow = Window.OPEN_SIGN_IN;

      if(action.payload === null) state.signInPayload = initialInfoType;
      else state.signInPayload = action.payload;
    },

    openUser: (state, action: OpenUser) => {
      state.openWindow = Window.OPEN_USER;
    },

    openAnnouncements: (state, action: OpenAnnouncements) => {
      state.openWindow = Window.OPEN_ANNOUNCEMENTS;

      if(action.payload === null) state.announcementsPayload = initialInfoType;
      else state.announcementsPayload = action.payload;
    },

    openAnnouncement: (state, action: OpenAnnouncement) => {
      state.openWindow = Window.OPEN_ANNOUNCEMENT;
      state.announcementPayload = action.payload;
    },

    openAddAnnouncement: (state, action: OpenAddAnnouncement) => {
      state.openWindow = Window.OPEN_ADD_ANNOUNCEMENT;
    },

    openAccountSettings: (state, action: OpenAccountSettings) => {
      state.openWindow = Window.OPEN_ACCOUNT_SETTINGS;

      if(action.payload === null) state.accountSettingsPayload = initialInfoType;
      else state.accountSettingsPayload = action.payload;
    },

    changeCategoryId: (state, action: ChangeCategoryId) => {
      state.categoryId = action.payload;
    },

    changeSearch: (state, action: ChangeSearch) => {
      state.search = action.payload;
    }

  }
});

export const {
  openNone,
  openSignInChoice,
  openSignIn,
  openSignup,
  openAccountSettings,
  openUser,
  openAnnouncements,
  openAddAnnouncement,
  openAnnouncement,
  changeCategoryId,
  changeSearch
} = appSlice.actions;
