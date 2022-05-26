import { ActionType } from './action-type'

export interface Action {
  type: ActionType;
  payload: string;
}

export interface UserFormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  newPassword: string;
  repeatNewPassword: string;
}

export const accountSettingsFormReducer = (state: UserFormState, action: Action) => {
  switch (action.type) {
    case ActionType.CHANGE_FIRST_NAME: {
      return {
        ...state,
        firstName: action.payload,
      }
    }

    case ActionType.CHANGE_LAST_NAME: {
      return {
        ...state,
        lastName: action.payload,
      }
    }

    case ActionType.CHANGE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      }
    }

    case ActionType.CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload,
      }
    }

    case ActionType.CHANGE_NEW_PASSWORD: {
      return {
        ...state,
        newPassword: action.payload,
      }
    }

    case ActionType.CHANGE_REPEAT_NEW_PASSWORD: {
      return {
        ...state,
        repeatNewPassword: action.payload,
      }
    }
  }
}
