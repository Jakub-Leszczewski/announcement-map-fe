import { createStore, combineReducers } from 'redux';
import { appReducer } from './reducers/appReducer'

const rootReducer = combineReducers({
  app: appReducer
})

export const store = createStore(rootReducer);

export type StoreType = ReturnType<typeof store.getState>
