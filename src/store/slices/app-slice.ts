import { createSlice } from '@reduxjs/toolkit'
import { UserFormUpdate } from '../../types/user-form'
import { InfoType } from '../../types/info-types'
import { ChangeCategoryId, ChangeSearch, Window } from '../types/app-slice-types'
import {
  AppStateType,
  OpenAccountSettings, OpenAccountSettingsConfirm,
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
  repeatNewPassword: ''
}

const initialState: AppStateType = {
  openWindow: Window.OPEN_NONE,
  accountSettingsPayload: initialInfoType,
  signInPayload: initialInfoType,
  accountSettingsConfirmPayload: initialUserFormUpdate,
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

    openAccountSettingsConfirm: (state, action: OpenAccountSettingsConfirm) => {
      state.openWindow = Window.OPEN_ACCOUNT_SETTINGS_CONFIRM;

      if(action.payload === null) state.accountSettingsConfirmPayload = initialUserFormUpdate;
      else state.accountSettingsConfirmPayload = action.payload;
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
  openAccountSettingsConfirm,
  openUser,
  openAnnouncements,
  openAddAnnouncement,
  openAnnouncement,
  changeCategoryId,
  changeSearch
} = appSlice.actions;
