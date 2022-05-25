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
  password: string;
  repeatPassword: string;
}

export const signupFormReducer = (state: UserFormState, action: Action) => {
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

    case ActionType.CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      }
    }

    case ActionType.CHANGE_REPEAT_PASSWORD: {
      return {
        ...state,
        repeatPassword: action.payload,
      }
    }
  }
}
