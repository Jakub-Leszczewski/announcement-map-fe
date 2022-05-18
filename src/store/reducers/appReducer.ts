import { ActionType } from '../action-types/app'

type PayloadForUserAnnouncementView = string;

type PayloadForOpenWindow = PayloadForUserAnnouncementView | undefined;

interface AppState {
  openWindow: ActionType;
  payload: PayloadForOpenWindow;
}

const initialState: AppState = {
  openWindow: ActionType.OPEN_NONE,
  payload: undefined,
}

interface OpenNone {
  type: ActionType.OPEN_NONE;
  payload: undefined;
}

interface OpenSignInChoice {
  type: ActionType.OPEN_SIGN_IN_CHOICE;
  payload: undefined;
}

interface OpenSignIn {
  type: ActionType.OPEN_SIGN_IN;
  payload: undefined;
}

interface OpenSignup {
  type: ActionType.OPEN_SIGNUP;
  payload: undefined;
}

interface OpenUser {
  type: ActionType.OPEN_USER;
  payload: undefined;
}

interface OpenUserAnnouncements {
  type: ActionType.OPEN_ANNOUNCEMENTS;
  payload: undefined;
}

interface OpenUserAnnouncementView {
  type: ActionType.OPEN_ANNOUNCEMENT_VIEW;
  payload: string;
}

interface OpenAddAnnouncement {
  type: ActionType.OPEN_ADD_ANNOUNCEMENT;
  payload: undefined;
}

interface OpenAccountSettings {
  type: ActionType.OPEN_ACCOUNT_SETTINGS;
  payload: undefined;
}

type Action = OpenNone | OpenSignInChoice | OpenSignIn | OpenSignup | OpenUser | OpenUserAnnouncements
  | OpenUserAnnouncementView | OpenAddAnnouncement | OpenAccountSettings;

export const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.OPEN_NONE: {
      return {
        ...state,
        openWindow: ActionType.OPEN_NONE,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_SIGN_IN_CHOICE: {
      return {
        ...state,
        openWindow: ActionType.OPEN_SIGN_IN_CHOICE,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_SIGN_IN: {
      return {
        ...state,
        openWindow: ActionType.OPEN_SIGN_IN,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_SIGNUP: {
      return {
        ...state,
        openWindow: ActionType.OPEN_SIGNUP,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_USER: {
      return {
        ...state,
        openWindow: ActionType.OPEN_USER,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_ANNOUNCEMENTS: {
      return {
        ...state,
        openWindow: ActionType.OPEN_ANNOUNCEMENTS,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_ANNOUNCEMENT_VIEW: {
      return {
        ...state,
        openWindow: ActionType.OPEN_ANNOUNCEMENT_VIEW,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_ADD_ANNOUNCEMENT: {
      return {
        ...state,
        openWindow: ActionType.OPEN_ADD_ANNOUNCEMENT,
        payload: action.payload,
      }
    }

    case ActionType.OPEN_ACCOUNT_SETTINGS: {
      return {
        ...state,
        openWindow: ActionType.OPEN_ACCOUNT_SETTINGS,
        payload: action.payload,
      }
    }
  }
}
