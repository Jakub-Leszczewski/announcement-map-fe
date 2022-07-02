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
}

export interface AppStateType {
  openWindow: Window;
  signInPayload: InfoType;
  accountSettingsPayload: InfoType;
  announcementsPayload: InfoType,
  announcementPayload: string;
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
  payload: InfoType | null;
}

export interface OpenAnnouncement {
  payload: string;
}

export interface OpenAddAnnouncement {
  payload: undefined;
}

export interface OpenAccountSettings {
  payload: InfoType | null;
}

export interface ChangeCategoryId {
  payload: string;
}

export interface ChangeSearch {
  payload: string;
}
