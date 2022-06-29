import { InfoType } from '../../types/info-types'
import { UserFormUpdate } from '../../types/user-form'

export enum Window {
  OPEN_NONE = 'OPEN_NONE',
  OPEN_SIGN_IN_CHOICE = 'OPEN_LOGIN_CHOICE',
  OPEN_SIGN_IN = 'OPEN_SIGN_IN',
  OPEN_SIGNUP = 'OPEN_SIGNUP',
  OPEN_USER = 'OPEN_USER',
  OPEN_ANNOUNCEMENTS = 'OPEN_ANNOUNCEMENTS',
  OPEN_ANNOUNCEMENT = 'OPEN_ANNOUNCEMENT',
  OPEN_ADD_ANNOUNCEMENT = 'OPEN_ADD_ANNOUNCEMENT',
  OPEN_ACCOUNT_SETTINGS = 'OPEN_ACCOUNT_SETTINGS',
  OPEN_ACCOUNT_SETTINGS_CONFIRM = 'OPEN_ACCOUNT_SETTINGS_CONFIRM',
}

export interface AppStateType {
  openWindow: Window;
  signInPayload: InfoType;
  accountSettingsPayload: InfoType;
  accountSettingsConfirmPayload: UserFormUpdate;
  search: string;
  categoryId: string;
}

export interface OpenNone {
  payload: undefined;
}

export interface OpenSignInChoice {
  payload: undefined;
}

export interface OpenSignup {
  payload: undefined;
}

export interface OpenSignIn {
  payload: InfoType | null;
}

export interface OpenUser {
  payload: undefined;
}

export interface OpenAnnouncements {
  payload: undefined;
}

export interface OpenAnnouncement {
  payload: undefined;
}

export interface OpenAddAnnouncement {
  payload: undefined;
}

export interface OpenAccountSettings {
  payload: InfoType | null;
}

export interface OpenAccountSettingsConfirm {
  payload: UserFormUpdate | null;
}

export interface ChangeCategoryId {
  payload: string;
}

export interface ChangeSearch {
  payload: string;
}
