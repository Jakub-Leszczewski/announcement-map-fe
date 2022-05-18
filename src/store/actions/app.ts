import { ActionType } from '../action-types/app'

const openNone = () => ({
  type: ActionType.OPEN_NONE,
  payload: undefined,
});

const openSignInChoice = () => ({
  type: ActionType.OPEN_SIGN_IN_CHOICE,
  payload: undefined,
});

const openSignIn = () => ({
  type: ActionType.OPEN_SIGN_IN,
  payload: undefined,
});

const openSignup = () => ({
  type: ActionType.OPEN_SIGNUP,
  payload: undefined,
});

const openUser = () => ({
  type: ActionType.OPEN_USER,
  payload: undefined,
});

const openAnnouncements= () => ({
  type: ActionType.OPEN_ANNOUNCEMENTS,
  payload: undefined,
});

const openAnnouncementView= (payload: string) => ({
  type: ActionType.OPEN_ANNOUNCEMENT_VIEW,
  payload: payload,
});

const openAccountSettings= () => ({
  type: ActionType.OPEN_ACCOUNT_SETTINGS,
  payload: undefined,
});

export {openNone, openSignInChoice, openSignIn, openSignup, openUser, openAnnouncements, openAnnouncementView, openAccountSettings}
