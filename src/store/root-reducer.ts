import { combineReducers} from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process';
import { dataProcess } from './data-process/data-process';

export const rootReducer = combineReducers({
  USER: userProcess.reducer,
  DATA: dataProcess.reducer,
});
