import { ActionType } from './action-type'

export interface Action {
  type: ActionType;
  payload: string;
}

export interface SignInFormState {
  username: string;
  password: string;
}

export const signInFormReducer = (state: SignInFormState, action: Action) => {
  switch(action.type){
    case ActionType.CHANGE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      }
    }

    case ActionType.CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      }
    }
  }
}
