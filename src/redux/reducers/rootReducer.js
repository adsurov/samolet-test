import { combineReducers } from 'redux'
import {librariesReducer} from "./librariesReducer";

export const rootReducer = combineReducers({
  libraries: librariesReducer,
});
